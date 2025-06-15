"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "./ui/LoadingSpinner";

export const VimeoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchVimeoVideo = async () => {
      try {
        const params = new URLSearchParams({
          url: videoUrl,
          width: "640",
          responsive: "true",
          autoplay: "true",
          muted: "true",
          background: "true",
          loop: "true",
        });
        const res = await fetch(
          `https://vimeo.com/api/oembed.json?${params.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch Vimeo oEmbed");
        const data = await res.json();
        setEmbedHtml(data.html);
      } catch (error) {
        console.error("Error fetching Vimeo video:", error);
      }
    };

    fetchVimeoVideo();
  }, [videoUrl]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <LoadingSpinner />
      </div>
      {embedHtml && (
        <div
          className="w-full h-full z-10"
          style={{ position: "relative", height: 0 }}
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
      )}
    </div>
  );
};
