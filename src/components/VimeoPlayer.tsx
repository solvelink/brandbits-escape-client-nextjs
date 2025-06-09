import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./layout/LoadingSpinner";

export const VimeoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchVimeoVideo = async () => {
      try {
        const res = await axios.get(`https://vimeo.com/api/oembed.json`, {
          params: {
            url: videoUrl,
            width: 640,
            responsive: true,
            autoplay: true,
            muted: true,
            background: true,
            loop: true,
          },
        });
        setEmbedHtml(res.data.html);
      } catch (error) {
        console.error("Error fetching Vimeo video:", error);
      }
    };

    fetchVimeoVideo();
  }, [videoUrl]);

  if (embedHtml) {
    return (
      <div
        className="w-full h-full"
        style={{ position: "relative", height: 0 }}
        dangerouslySetInnerHTML={{ __html: embedHtml }}
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
