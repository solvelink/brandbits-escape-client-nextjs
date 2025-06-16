"use client";

import { useRef, useState } from "react";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";

export const AudioPlayer = ({ url, label }: { url: string; label: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      const percent = Math.min((current / duration) * 100, 100);
      setProgress(percent);
    }
  };

  const handlePlayEvent = () => setIsPlaying(true);
  const handlePauseEvent = () => setIsPlaying(false);
  const handleEndedEvent = () => setIsPlaying(false);

  return (
    <button
      className="bg-green rounded-md text-white flex p-4 items-center"
      onClick={handleTogglePlay}
      type="button"
    >
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlayEvent}
        onPause={handlePauseEvent}
        onEnded={handleEndedEvent}
        preload="auto"
      />
      {isPlaying ? (
        <div className="relative w-8 h-8 rounded-full mr-2">
          <CircleProgress
            className="absolute top-0 left-0"
            progress={progress}
          />
          <PauseIcon className="fill-white w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      ) : (
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
          <PlayIcon className="fill-green w-4" />
        </div>
      )}
      <p className="font-bold">{label}</p>
    </button>
  );
};

export const CircleProgress = ({
  className,
  progress,
}: {
  className?: string;
  progress: number;
}) => {
  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      style={{ display: "block" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        className="stroke-white/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-white"
        style={{
          transition: "stroke-dashoffset 0.3s",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  );
};
