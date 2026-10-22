import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const PORT = 4822;
const outDir = path.resolve("frontend/public/videos");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const TOTAL_DURATION = 16.0; // 16s
const BLEND_DURATION = 3.5;  // 3.5s smooth crossfade
const T0 = 10000;            // 10s warmup in ms

const waveThemes = {
  morning: ["#021B24", "#053B47", "#008B9E", "#00E5FF", "#70F3FF", "#036473"],
  noon: ["#030B24", "#0C1D54", "#1B3BBB", "#2E51FF", "#7892FF", "#11267D"],
  afternoon: ["#140520", "#300D4C", "#6B21A8", "#A855F7", "#D8B4FE", "#4C1478"],
  night: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"]
};

function getHtml(themeId) {
  const colorsJson = JSON.stringify(waveThemes[themeId] || waveThemes.night);
  const nextTheme = themeId === "morning" ? "noon" : themeId === "noon" ? "afternoon" : themeId === "afternoon" ? "night" : "done";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;overflow:hidden;background:#000;">
  <canvas id="c" width="1280" height="720" style="width:1280px;height:720px;display:block;"></canvas>
  <script>
    window.onerror = function(msg, url, line) {
      fetch('/log?err=' + encodeURIComponent(msg + ' at line ' + line));
    };
    const themeId = "${themeId}";
    const nextTheme = "${nextTheme}";
    const colors = ${colorsJson};

    function normalizeColor(hexCode) {
      return [
        ((hexCode >> 16) & 255) / 255,
        ((hexCode >> 8) & 255) / 255,
        (255 & hexCode) / 255,
      ];
    }

    class MiniGl {
      constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: true }) ||
                  canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true, antialias: true });
        this.meshes = [];
        const context = this.gl;
        const _miniGl = this;

        this.Uniform = class {
          constructor(e) {
            this.type = "float";
            Object.assign(this, e);
            const typeMap = {
              float: "1f", int: "1i", vec2: "2fv", vec3: "3fv", vec4: "4fv", mat4: "Matrix4fv"
            };
            this.typeFn = typeMap[this.type] || "1f";
          }
          update(location) {
            if (this.value === undefined || location === null) return;
            const isMatrix = this.typeFn.indexOf("Matrix") === 0;
            const fn = "uniform" + this.typeFn;
            if (isMatrix) {
              context[fn](location, this.transpose || false, this.value);
            } else {
              context[fn](location, this.value);
            }
          }
          getDeclaration(name, type, length) {
            if (this.excludeFrom === type) return "";
            if (this.type === "array") {
              return this.value[0].getDeclaration(name, type, this.value.length) + "\\nconst int " + name + "_length = " + this.value.length + ";";
            }
            if (this.type === "struct") {
              let nameNoPrefix = name.replace("u_", "");
              nameNoPrefix = nameNoPrefix.charAt(0).toUpperCase() + nameNoPrefix.slice(1);
              const fields = Object.entries(this.value)
                .map(([n, u]) => u.getDeclaration(n, type).replace(/^uniform\\s*/, ""))
                .join("\\n");
              return "struct " + nameNoPrefix + " {\\n" + fields + "\\n};\\nuniform " + nameNoPrefix + " " + name + (length ? "[" + length + "]" : "") + ";";
            }
            return "uniform " + this.type + " " + name + (length ? "[" + length + "]" : "") + ";";
          }
        };

        this.Material = class {
          constructor(vertexShaders, fragments, uniforms) {
            this.uniforms = uniforms;
            this.uniformInstances = [];
            const prefix = "precision highp float;";
            this.vertexShader = this.getShaderByType(context.VERTEX_SHADER, prefix + "\\n" + vertexShaders);
            this.fragmentShader = this.getShaderByType(context.FRAGMENT_SHADER, prefix + "\\n" + fragments);
            this.program = context.createProgram();
            context.attachShader(this.program, this.vertexShader);
            context.attachShader(this.program, this.fragmentShader);
            context.linkProgram(this.program);
            if (!context.getProgramParameter(this.program, context.LINK_STATUS)) {
              throw new Error("Link error: " + context.getProgramInfoLog(this.program));
            }
            context.useProgram(this.program);
            this.attachUniforms(undefined, this.uniforms);
          }
          getShaderByType(type, source) {
            const shader = context.createShader(type);
            context.shaderSource(shader, source);
            context.compileShader(shader);
            if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
              throw new Error("Compile error: " + context.getShaderInfoLog(shader));
            }
            return shader;
          }
          attachUniforms(name, uniforms) {
            if (name === undefined) {
              for (let key in uniforms) {
                this.attachUniforms(key, uniforms[key]);
              }
              return;
            }
            if (uniforms.type === "array") {
              uniforms.value.forEach((val, idx) => this.attachUniforms(name + "[" + idx + "]", val));
              return;
            }
            if (uniforms.type === "struct") {
              for (let prop in uniforms.value) {
                this.attachUniforms(name + "." + prop, uniforms.value[prop]);
              }
              return;
            }
            this.uniformInstances.push({
              uniform: uniforms,
              location: context.getUniformLocation(this.program, name)
            });
          }
        };

        this.PlaneGeometry = class {
          constructor() {
            this.attributes = {
              position: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 3 }),
              uv: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 2 }),
              uvNorm: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 2 }),
              index: new _miniGl.Attribute({ target: context.ELEMENT_ARRAY_BUFFER, size: 3, type: context.UNSIGNED_SHORT })
            };
            this.xSegCount = 0;
            this.ySegCount = 0;
            this.vertexCount = 0;
          }
          setTopology(xSegs = 1, ySegs = 1) {
            this.xSegCount = xSegs;
            this.ySegCount = ySegs;
            this.vertexCount = (this.xSegCount + 1) * (this.ySegCount + 1);
            const quadCount = this.xSegCount * this.ySegCount * 2;
            this.attributes.uv.values = new Float32Array(this.vertexCount * 2);
            this.attributes.uvNorm.values = new Float32Array(this.vertexCount * 2);
            this.attributes.index.values = new Uint16Array(quadCount * 3);

            for (let y = 0; y <= this.ySegCount; y++) {
              for (let x = 0; x <= this.xSegCount; x++) {
                const idx = y * (this.xSegCount + 1) + x;
                this.attributes.uv.values[idx * 2] = x / this.xSegCount;
                this.attributes.uv.values[idx * 2 + 1] = 1 - y / this.ySegCount;
                this.attributes.uvNorm.values[idx * 2] = (x / this.xSegCount) * 2 - 1;
                this.attributes.uvNorm.values[idx * 2 + 1] = 1 - (y / this.ySegCount) * 2;

                if (x < this.xSegCount && y < this.ySegCount) {
                  const qIdx = (y * this.xSegCount + x) * 2;
                  this.attributes.index.values[qIdx * 3] = idx;
                  this.attributes.index.values[qIdx * 3 + 1] = idx + this.xSegCount + 1;
                  this.attributes.index.values[qIdx * 3 + 2] = idx + 1;
                  this.attributes.index.values[(qIdx + 1) * 3] = idx + 1;
                  this.attributes.index.values[(qIdx + 1) * 3 + 1] = idx + this.xSegCount + 1;
                  this.attributes.index.values[(qIdx + 1) * 3 + 2] = idx + this.xSegCount + 2;
                }
              }
            }
            this.attributes.uv.update();
            this.attributes.uvNorm.update();
            this.attributes.index.update();
          }
          setSize(w = 1, h = 1) {
            this.width = w;
            this.height = h;
            this.attributes.position.values = new Float32Array(this.vertexCount * 3);
            for (let y = 0; y <= this.ySegCount; y++) {
              for (let x = 0; x <= this.xSegCount; x++) {
                const idx = y * (this.xSegCount + 1) + x;
                this.attributes.position.values[idx * 3] = (x / this.xSegCount - 0.5) * this.width;
                this.attributes.position.values[idx * 3 + 1] = (0.5 - y / this.ySegCount) * this.height;
                this.attributes.position.values[idx * 3 + 2] = 0;
              }
            }
            this.attributes.position.update();
          }
        };

        this.Mesh = class {
          constructor(geometry, material) {
            this.geometry = geometry;
            this.material = material;
            this.wireframe = false;
            _miniGl.meshes.push(this);
          }
          draw() {
            context.useProgram(this.material.program);
            this.material.uniformInstances.forEach(u => u.uniform.update(u.location));
            this.material.uniformInstances.forEach(u => {
              if (u.uniform.value && typeof u.uniform.value === "object" && u.uniform.value.update) {
                u.uniform.value.update(u.location);
              }
            });
            for (let attr in this.geometry.attributes) {
              this.geometry.attributes[attr].attach(attr, this.material.program);
            }
            context.drawElements(
              this.wireframe ? context.LINES : context.TRIANGLES,
              this.geometry.attributes.index.values.length,
              context.UNSIGNED_SHORT,
              0
            );
          }
        };

        this.Attribute = class {
          constructor(e) {
            this.type = context.FLOAT;
            Object.assign(this, e);
            this.buffer = context.createBuffer();
          }
          update() {
            context.bindBuffer(this.target, this.buffer);
            context.bufferData(this.target, this.values, context.STATIC_DRAW);
          }
          attach(name, program) {
            const loc = context.getAttribLocation(program, name);
            if (this.target === context.ARRAY_BUFFER) {
              context.enableVertexAttribArray(loc);
              context.bindBuffer(this.target, this.buffer);
              context.vertexAttribPointer(loc, this.size, this.type, false, 0, 0);
            } else {
              context.bindBuffer(this.target, this.buffer);
            }
          }
        };

        const uRes = new this.Uniform({ value: [1280, 720], type: "vec2" });
        const uProj = new this.Uniform({ value: [2/1280,0,0,0, 0,2/720,0,0, 0,0,-0.001,0, 0,0,0,1], type: "mat4" });
        const uModel = new this.Uniform({ value: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], type: "mat4" });
        this.commonUniforms = {
          projectionMatrix: uProj,
          modelViewMatrix: uModel,
          resolution: uRes
        };
      }
      render() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clearDepth(1);
        this.meshes.forEach(m => m.draw());
      }
    }

    class Gradient {
      constructor(canvas, colors) {
        fetch('/log?msg=grad_ctor_start');
        this.canvas = canvas;
        this.colors = colors;
        this.minigl = new MiniGl(canvas);
        fetch('/log?msg=grad_minigl_ready');
        this.init();
        fetch('/log?msg=grad_init_done');
      }
      init() {
        fetch('/log?msg=init_start');
        const sectionColors = this.colors.map(hex => normalizeColor(parseInt(hex.replace("#", "0x"), 16)));
        fetch('/log?msg=section_colors_ready');
        const uniforms = {
          ...this.minigl.commonUniforms,
          u_time: new this.minigl.Uniform({ value: 0 }),
          u_time_prev: new this.minigl.Uniform({ value: 0 }),
          u_blend: new this.minigl.Uniform({ value: 0 }),
          u_shadow_power: new this.minigl.Uniform({ value: 4 }),
          u_darken_top: new this.minigl.Uniform({ value: 0 }),
          u_active_colors: new this.minigl.Uniform({ value: [1,1,1,1], type: "vec4" }),
          u_global: new this.minigl.Uniform({
            value: {
              noiseFreq: new this.minigl.Uniform({ value: [0.00014, 0.00029], type: "vec2" }),
              noiseSpeed: new this.minigl.Uniform({ value: 0.00004 })
            },
            type: "struct"
          }),
          u_vertDeform: new this.minigl.Uniform({
            value: {
              incline: new this.minigl.Uniform({ value: 0.5 }),
              offsetTop: new this.minigl.Uniform({ value: -0.5 }),
              offsetBottom: new this.minigl.Uniform({ value: -0.5 }),
              noiseFreq: new this.minigl.Uniform({ value: [3, 4], type: "vec2" }),
              noiseAmp: new this.minigl.Uniform({ value: 300 }),
              noiseSpeed: new this.minigl.Uniform({ value: 12 }),
              noiseFlow: new this.minigl.Uniform({ value: 5 }),
              noiseSeed: new this.minigl.Uniform({ value: 5 })
            },
            type: "struct",
            excludeFrom: "fragment"
          }),
          u_baseColor: new this.minigl.Uniform({
            value: sectionColors[0] || [0.05, 0.05, 0.15],
            type: "vec3",
            excludeFrom: "fragment"
          }),
          u_waveLayers: new this.minigl.Uniform({
            value: [],
            excludeFrom: "fragment",
            type: "array"
          })
        };

        for (let i = 1; i < sectionColors.length; i++) {
          uniforms.u_waveLayers.value.push(
            new this.minigl.Uniform({
              value: {
                color: new this.minigl.Uniform({ value: sectionColors[i], type: "vec3" }),
                noiseFreq: new this.minigl.Uniform({ value: [2 + i/sectionColors.length, 3 + i/sectionColors.length], type: "vec2" }),
                noiseSpeed: new this.minigl.Uniform({ value: 11 + 0.3 * i }),
                noiseFlow: new this.minigl.Uniform({ value: 6.5 + 0.3 * i }),
                noiseSeed: new this.minigl.Uniform({ value: 5 + 10 * i }),
                noiseFloor: new this.minigl.Uniform({ value: 0.1 }),
                noiseCeil: new this.minigl.Uniform({ value: 0.63 + 0.07 * i })
              },
              type: "struct"
            })
          );
        }

        const vs = \`
          uniform mat4 projectionMatrix;
          uniform mat4 modelViewMatrix;
          uniform vec2 resolution;
          uniform float u_time;
          uniform float u_time_prev;
          uniform float u_blend;
          \${uniforms.u_global.getDeclaration("u_global", "vertex")}
          \${uniforms.u_vertDeform.getDeclaration("u_vertDeform", "vertex")}
          \${uniforms.u_baseColor.getDeclaration("u_baseColor", "vertex")}
          \${uniforms.u_waveLayers.getDeclaration("u_waveLayers", "vertex")}
          uniform vec4 u_active_colors;
          attribute vec3 position;
          attribute vec2 uv;
          attribute vec2 uvNorm;
          varying vec3 v_color;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          vec3 blendNormal(vec3 base, vec3 blend, float opacity) { return (blend * opacity + base * (1.0 - opacity)); }

          void main() {
            vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;
            float tilt = resolution.y / 2.0 * uvNorm.y;
            float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;
            float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

            float time1 = u_time * u_global.noiseSpeed;
            float noise1 = snoise(vec3(noiseCoord.x * u_vertDeform.noiseFreq.x + time1 * u_vertDeform.noiseFlow, noiseCoord.y * u_vertDeform.noiseFreq.y, time1 * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed)) * u_vertDeform.noiseAmp;
            noise1 *= 1.0 - pow(abs(uvNorm.y), 2.0);
            noise1 = max(0.0, noise1);

            vec3 color1 = u_baseColor;
            for (int i = 0; i < u_waveLayers_length; i++) {
              if (u_active_colors[i + 1] == 1.) {
                WaveLayers layer = u_waveLayers[i];
                float layerNoise = smoothstep(layer.noiseFloor, layer.noiseCeil, snoise(vec3(noiseCoord.x * layer.noiseFreq.x + time1 * layer.noiseFlow, noiseCoord.y * layer.noiseFreq.y, time1 * layer.noiseSpeed + layer.noiseSeed)) / 2.0 + 0.5);
                color1 = blendNormal(color1, layer.color, pow(layerNoise, 4.));
              }
            }

            float finalNoise = noise1;
            vec3 finalColor = color1;

            if (u_blend > 0.0005) {
              float time2 = u_time_prev * u_global.noiseSpeed;
              float noise2 = snoise(vec3(noiseCoord.x * u_vertDeform.noiseFreq.x + time2 * u_vertDeform.noiseFlow, noiseCoord.y * u_vertDeform.noiseFreq.y, time2 * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed)) * u_vertDeform.noiseAmp;
              noise2 *= 1.0 - pow(abs(uvNorm.y), 2.0);
              noise2 = max(0.0, noise2);

              vec3 color2 = u_baseColor;
              for (int i = 0; i < u_waveLayers_length; i++) {
                if (u_active_colors[i + 1] == 1.) {
                  WaveLayers layer = u_waveLayers[i];
                  float layerNoise2 = smoothstep(layer.noiseFloor, layer.noiseCeil, snoise(vec3(noiseCoord.x * layer.noiseFreq.x + time2 * layer.noiseFlow, noiseCoord.y * layer.noiseFreq.y, time2 * layer.noiseSpeed + layer.noiseSeed)) / 2.0 + 0.5);
                  color2 = blendNormal(color2, layer.color, pow(layerNoise2, 4.));
                }
              }

              finalNoise = mix(noise1, noise2, u_blend);
              finalColor = mix(color1, color2, u_blend);
            }

            vec3 pos = vec3(position.x, position.y + tilt + incline + finalNoise - offset, position.z);
            v_color = finalColor;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        \`;

        const fs = \`
          varying vec3 v_color;
          uniform vec2 resolution;
          uniform float u_darken_top;
          uniform float u_shadow_power;
          void main() {
            vec3 color = v_color;
            if (u_darken_top == 1.0) {
              vec2 st = gl_FragCoord.xy / resolution.xy;
              color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
            }
            gl_FragColor = vec4(color, 1.0);
          }
        \`;

        fetch('/log?msg=before_material_creation');
        const material = new this.minigl.Material(vs, fs, uniforms);
        fetch('/log?msg=material_created');
        const geometry = new this.minigl.PlaneGeometry();
        fetch('/log?msg=geometry_created');
        this.mesh = new this.minigl.Mesh(geometry, material);
        fetch('/log?msg=mesh_created');
        geometry.setTopology(40, 25);
        fetch('/log?msg=topology_set');
        geometry.setSize(1280, 720);
        fetch('/log?msg=size_set');
      }

      render(time1, time2, blend) {
        this.mesh.material.uniforms.u_time.value = time1;
        this.mesh.material.uniforms.u_time_prev.value = time2;
        this.mesh.material.uniforms.u_blend.value = blend;
        this.minigl.render();
      }
    }

    async function record() {
      fetch('/log?msg=record_start_' + themeId);
      const canvas = document.getElementById("c");
      let grad;
      try {
        grad = new Gradient(canvas, colors);
      } catch (err) {
        fetch('/log?err=' + encodeURIComponent('GRAD_ERR: ' + err.message + ' ' + err.stack));
        return;
      }
      fetch('/log?msg=grad_created_' + themeId);

      let recordStartTime = 0;
      let isRecording = false;
      let active = true;

      function loop() {
        if (!active) return;
        const now = performance.now();
        const tau = isRecording ? (now - recordStartTime) / 1000 : 0;
        let time1 = ${T0} + (tau * 1000);
        let time2 = ${T0};
        let blend = 0.0;

        if (isRecording && tau >= ${TOTAL_DURATION} - ${BLEND_DURATION}) {
          const p = Math.min(1.0, Math.max(0.0, (tau - (${TOTAL_DURATION} - ${BLEND_DURATION})) / ${BLEND_DURATION}));
          blend = p * p * (3.0 - 2.0 * p);
          time2 = ${T0} + (tau - ${TOTAL_DURATION}) * 1000;
        }

        grad.render(time1, time2, blend);
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);

      await new Promise(r => setTimeout(r, 200));

      const stream = canvas.captureStream(30);
      fetch('/log?msg=stream_captured_' + themeId);
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
        videoBitsPerSecond: 1800000
      });
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = async () => {
        fetch('/log?msg=onstop_fired_' + themeId + '_chunks_' + chunks.length);
        active = false;
        const blob = new Blob(chunks, { type: "video/webm" });
        fetch('/log?msg=saving_blob_' + blob.size);
        await fetch("/save?name=wave-" + themeId + ".webm", { method: "POST", body: blob });
        if (nextTheme === "done") {
          await fetch("/all-done");
        } else {
          window.location.href = "/?theme=" + nextTheme;
        }
      };

      isRecording = true;
      recordStartTime = performance.now();
      recorder.start();
      fetch('/log?msg=recorder_started_' + themeId);

      setTimeout(() => {
        fetch('/log?msg=calling_stop_' + themeId);
        recorder.stop();
      }, ${TOTAL_DURATION * 1000});
    }

    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(record, 300);
    });
  </script>
</body>
</html>`;
}

let count = 0;
const server = http.createServer((req, res) => {
  console.log("SERVER REQ:", req.url);
  const url = new URL(req.url, "http://localhost");
  const theme = url.searchParams.get("theme") || "morning";

  if (url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(getHtml(theme));
  } else if (url.pathname === "/log") {
    console.log("CLIENT LOG:", url.searchParams.get("msg") || url.searchParams.get("err") || url.search);
    res.end("ok");
  } else if (url.pathname === "/save" && req.method === "POST") {
    const name = url.searchParams.get("name") || "wave.webm";
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => {
      const buf = Buffer.concat(chunks);
      const outPath = path.join(outDir, name);
      fs.writeFileSync(outPath, buf);
      count++;
      console.log(`[SAVED WAVE ${count}/4] ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
      res.end("ok");
    });
  } else if (url.pathname === "/all-done") {
    console.log("All wave recordings completed successfully!");
    res.end("ok");
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1000);
  }
});

server.listen(PORT, () => {
  console.log(`Wave Recorder running on http://localhost:${PORT}`);
  const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
  const tmp = "C:\\Users\\seeva\\AppData\\Local\\Temp\\antigravity\\edge-wave-tmp";
  exec(`${edge} --headless=new --user-data-dir="${tmp}" --use-gl=angle --use-angle=swiftshader "http://localhost:${PORT}/?theme=morning"`);
});
