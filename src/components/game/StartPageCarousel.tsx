"use client";

import { GameStartPage } from "@/types/game";

export const StartPageCarousel = ({
  images,
}: {
  images: GameStartPage["images"];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full h-64 bg-gray-200 overflow-hidden"
        >
          <img src={image.imageUrl} className="object-cover w-full h-full" />
          {image.text && <p>{image.text}</p>}
        </div>
      ))}
    </div>
  );
};
