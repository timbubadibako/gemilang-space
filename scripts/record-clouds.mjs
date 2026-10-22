import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const PORT = 4789;
const outDir = path.resolve("frontend/public/videos");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const TOTAL_DURATION = 16.0; // 16s long loop
const BLEND_DURATION = 3.5;  // 3.5s smooth crossfade window
const T0 = 10.0;             // 10s warmup offset

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;overflow:hidden;background:#000;">
  <canvas id="c" width="1280" height="720"></canvas>
  <script>
    const canvas = document.getElementById("c");
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: true }) ||
               canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true, antialias: true });

    const vsSource = \`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    \`;

    const fsSource = \`
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_time_prev;
      uniform float u_blend;
      uniform vec3 u_colorBottom;
      uniform vec3 u_colorMid;
      uniform vec3 u_colorTop;
      uniform float u_speed;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p, float t) {
        float v = 0.0;
        float a = 0.5;
        float fi = 0.0;
        mat2 rot = mat2(0.86, 0.51, -0.51, 0.86);
        for (int i = 0; i < 6; i++) {
          vec2 morph = vec2(sin(t * 0.5 + fi), cos(t * 0.3 - fi)) * 0.05;
          v += a * noise(p + morph);
          p = rot * p * 2.0;
          a *= 0.5;
          fi += 1.0;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
        vec2 p = (uv - 0.5) * aspect;

        float t1 = u_time * u_speed;
        vec2 wind1 = vec2(t1 * 0.1, t1 * 0.02);
        float pattern1 = fbm(p * 2.2 - wind1, t1);

        float pattern;
        if (u_blend > 0.0005) {
          float t2 = u_time_prev * u_speed;
          vec2 wind2 = vec2(t2 * 0.1, t2 * 0.02);
          float pattern2 = fbm(p * 2.2 - wind2, t2);
          pattern = mix(pattern1, pattern2, u_blend);
        } else {
          pattern = pattern1;
        }

        float bandLow = smoothstep(0.3, 0.65, pattern);
        float bandHigh = smoothstep(0.7, 0.95, pattern);
        vec3 color = mix(u_colorBottom, u_colorMid, bandLow);
        color = mix(color, u_colorTop, bandHigh);
        gl_FragColor = vec4(color, 1.0);
      }
    \`;

    function createShader(gl, type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uTimePrev = gl.getUniformLocation(program, "u_time_prev");
    const uBlend = gl.getUniformLocation(program, "u_blend");
    const uBottom = gl.getUniformLocation(program, "u_colorBottom");
    const uMid = gl.getUniformLocation(program, "u_colorMid");
    const uTop = gl.getUniformLocation(program, "u_colorTop");
    const uSpeed = gl.getUniformLocation(program, "u_speed");

    gl.viewport(0, 0, 1280, 720);
    gl.uniform2f(uRes, 1280, 720);

    function hexToRgb(hex) {
      hex = hex.replace("#", "");
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255
      ];
    }

    const themes = [
      { id: "morning", bottom: "#3B82F6", mid: "#FDE68A", top: "#FFFFFF", speed: 0.65 },
      { id: "noon", bottom: "#0284C7", mid: "#7DD3FC", top: "#FFFFFF", speed: 0.7 },
      { id: "afternoon", bottom: "#0F1E3D", mid: "#EA580C", top: "#FB923C", speed: 0.6 },
      { id: "night", bottom: "#030712", mid: "#1E1B4B", top: "#6366F1", speed: 0.45 }
    ];

    let currentTheme = themes[0];
    let isRecording = false;
    let recordStartTime = 0;

    function render(now) {
      const b = hexToRgb(currentTheme.bottom);
      const m = hexToRgb(currentTheme.mid);
      const tp = hexToRgb(currentTheme.top);

      let tau = isRecording ? (now - recordStartTime) / 1000 : 0;
      let time1 = ${T0} + tau;
      let time2 = ${T0};
      let blend = 0.0;

      if (isRecording && tau >= ${TOTAL_DURATION} - ${BLEND_DURATION}) {
        const p = Math.min(1.0, Math.max(0.0, (tau - (${TOTAL_DURATION} - ${BLEND_DURATION})) / ${BLEND_DURATION}));
        blend = p * p * (3.0 - 2.0 * p);
        time2 = ${T0} + (tau - ${TOTAL_DURATION});
      }

      gl.uniform1f(uTime, time1);
      gl.uniform1f(uTimePrev, time2);
      gl.uniform1f(uBlend, blend);
      gl.uniform3f(uBottom, b[0], b[1], b[2]);
      gl.uniform3f(uMid, m[0], m[1], m[2]);
      gl.uniform3f(uTop, tp[0], tp[1], tp[2]);
      gl.uniform1f(uSpeed, currentTheme.speed);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    async function recordOne(t) {
      currentTheme = t;
      await new Promise(r => setTimeout(r, 200));

      return new Promise(resolve => {
        const stream = canvas.captureStream(30);
        const recorder = new MediaRecorder(stream, {
          mimeType: "video/webm",
          videoBitsPerSecond: 1800000
        });
        const chunks = [];
        recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = async () => {
          isRecording = false;
          const blob = new Blob(chunks, { type: "video/webm" });
          await fetch("/save?name=hero-" + t.id + ".webm", { method: "POST", body: blob });
          resolve();
        };

        isRecording = true;
        recordStartTime = performance.now();
        recorder.start();

        setTimeout(() => {
          recorder.stop();
        }, ${TOTAL_DURATION * 1000});
      });
    }

    async function runAll() {
      for (const t of themes) {
        await recordOne(t);
      }
      await fetch("/all-done");
    }

    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(runAll, 500);
    });
  </script>
</body>
</html>`;

let count = 0;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (req.url.startsWith("/save") && req.method === "POST") {
    const url = new URL(req.url, "http://localhost");
    const name = url.searchParams.get("name") || "video.webm";
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => {
      const buf = Buffer.concat(chunks);
      const outPath = path.join(outDir, name);
      fs.writeFileSync(outPath, buf);
      count++;
      console.log(`[SAVED ${count}/4] ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
      res.end("ok");
    });
  } else if (req.url === "/all-done") {
    console.log("All cloud recordings completed successfully!");
    res.end("ok");
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1000);
  }
});

server.listen(PORT, () => {
  console.log(`Cloud Recorder listening on http://localhost:${PORT}`);
  const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
  exec(`${edge} --headless=new --use-gl=angle --use-angle=swiftshader http://localhost:${PORT}`);
});
