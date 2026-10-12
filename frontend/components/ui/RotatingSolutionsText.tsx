"use client";

import React, { useEffect, useState } from "react";

interface RotatingSolutionsTextProps {
  words: string[];
  interval?: number; // duration in ms per word
  effect?: "slide" | "typewriter";
  className?: string;
  cursorColor?: string;
}

export function RotatingSolutionsText({
  words,
  interval = 3000,
  effect = "slide",
  className = "",
  cursorColor = "#335CFF",
}: RotatingSolutionsTextProps) {
  const [index, setIndex] = useState(0);

  // Typewriter state
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Slide state: handles simultaneous exit/enter
  const [prevWord, setPrevWord] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string>(words[0] || "");
  const [isSliding, setIsSliding] = useState(false);

  // -------------------------------------------------------------
  // Effect 1: Typewriter ("Ketik - Hapus")
  // -------------------------------------------------------------
  useEffect(() => {
    if (effect !== "typewriter") return;

    const fullWord = words[index] || "";
    const typingSpeed = isDeleting ? 38 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < fullWord.length) {
          setDisplayText(fullWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          // Finished typing, pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          setDisplayText(fullWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, words, effect]);

  // -------------------------------------------------------------
  // Effect 2: Vertical Slide-Up ("Naik - Atas Bawah")
  // -------------------------------------------------------------
  useEffect(() => {
    if (effect !== "slide") return;

    const timer = setInterval(() => {
      setPrevWord(words[index]);
      const nextIndex = (index + 1) % words.length;
      setCurrentWord(words[nextIndex]);
      setIsSliding(true);

      // Animation duration is 420ms
      const slideTimeout = setTimeout(() => {
        setIndex(nextIndex);
        setPrevWord(null);
        setIsSliding(false);
      }, 420);

      return () => clearTimeout(slideTimeout);
    }, interval);

    return () => clearInterval(timer);
  }, [index, words, interval, effect]);

  // Reset if words array changes
  useEffect(() => {
    if (words.length > 0) {
      setCurrentWord(words[0]);
      setIndex(0);
      setCharIndex(0);
      setDisplayText("");
      setIsDeleting(false);
    }
  }, [words]);

  // Render Typewriter
  if (effect === "typewriter") {
    return (
      <span className={`inline-flex items-baseline font-bold text-[#04060A] ${className}`}>
        <span>{displayText}</span>
        <span
          className="inline-block w-[2.5px] h-[0.85em] ml-1 align-middle animate-pulse"
          style={{ backgroundColor: cursorColor }}
        />
      </span>
    );
  }

  // Render Vertical Slide ("Naik Atas Bawah")
  return (
    <span
      className={`relative inline-block overflow-hidden h-[1.18em] align-top text-[#04060A] font-bold ${className}`}
    >
      {/* Exiting word: slides UP from 0 to -100% */}
      {isSliding && prevWord && (
        <span
          key={`prev-${prevWord}`}
          className="absolute left-0 top-0 whitespace-nowrap animate-solution-slide-out"
        >
          {prevWord}
        </span>
      )}

      {/* Entering / Active word: slides UP from 100% to 0 */}
      <span
        key={`curr-${currentWord}`}
        className={`inline-block whitespace-nowrap ${
          isSliding ? "animate-solution-slide-in" : ""
        }`}
      >
        {currentWord}
      </span>
    </span>
  );
}
