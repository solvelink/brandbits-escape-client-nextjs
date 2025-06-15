"use client";

import clsx from "clsx";
import { useState, useRef } from "react";
import Star from "@/assets/icons/star.svg";

const totalStars = 5;

export const StarRating = ({}) => {
  const [rating, setRating] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX;
    const relativeX = Math.max(0, Math.min(pointerX - left, width));
    const newRating = Math.ceil((relativeX / width) * totalStars);
    setRating(newRating);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex justify-center w-full">
      <div
        ref={containerRef}
        className="touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex gap-2">
          {Array.from({ length: totalStars }, (_, i) => (
            <button onClick={() => setRating(i + 1)} key={i}>
              <Star
                key={i}
                className={clsx(
                  "transition-colors w-10 h-10",
                  i < rating ? "fill-[#FCB628]" : "fill-gray-100"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
