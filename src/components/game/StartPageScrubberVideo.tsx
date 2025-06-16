"use client";

import * as Slider from "@radix-ui/react-slider";

import { useRef, useEffect, useState, useCallback } from "react";
export const StartPageScrubberVideo = ({ url }: { url: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sliderValue, setSliderValue] = useState([0]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleDuration = () => {
      setDuration(video.duration || 0);
    };
    handleDuration();
    video.addEventListener("loadedmetadata", handleDuration);
    return () => {
      video.removeEventListener("loadedmetadata", handleDuration);
    };
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const newTime = (sliderValue[0] / 100) * duration;
    if (Math.abs(video.currentTime - newTime) > 0.01) {
      video.currentTime = newTime;
    }
  }, [sliderValue, duration]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const percent = (video.currentTime / duration) * 100 || 0;
    if (Math.abs(percent - sliderValue[0]) > 0.5) {
      setSliderValue([percent]);
    }
  }, [duration, sliderValue]);

  const handleSliderChange = useCallback((value: number[]) => {
    setSliderValue(value);
  }, []);

  return (
    <div className="bg-gray-100 relative overflow-hidden">
      <video
        className="w-full"
        src={url}
        ref={videoRef}
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />
      <div className="bg-white border border-gray-75 py-5 px-6 absolute bottom-4 left-4 right-4 rounded-lg">
        <Slider.Root
          className="relative w-full flex items-center touch-none select-none"
          value={sliderValue}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="bg-gray-100 relative w-full grow rounded-full h-2" />
          <Slider.Thumb className="block w-5 h-5 bg-black rounded-full" />
        </Slider.Root>
      </div>
    </div>
  );
};
