import { HeaderBar } from "@/components/layout/Header";
import StopwatchIcon from "@/assets/icons/stopwatch.svg?react";
import DistanceIcon from "@/assets/icons/distance.svg?react";
import WheelchairIcon from "@/assets/icons/wheelchair.svg?react";
import PeopleIcon from "@/assets/icons/people.svg?react";

const ImageCarousel = ({ images }: { images: any }) => {
  return (
    <div className="flex flex-col gap-2">
      {images.map((image: any, index: number) => (
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

export default function StartPage({ page }: { page: any }) {
  return (
    <div className="pt-4">
      <HeaderBar />
      <ImageCarousel images={page.images} />
      <div className="px-4 py-6 bg-gray-50 text-center">
        <h1 className="font-bold text-3xl">{page.title}</h1>
        <h2 className="text-sm text-gray-200 mt-1">{page.subtitle}</h2>
        <p className="rich-text mt-4">{page.description}</p>
      </div>
      <div className="text-center px-4 py-6">
        <p className="font-bold">Voor dat je start</p>
        <ul className="flex flex-col items-center mt-3 font-light text-left">
          <li className="flex mb-2 max-w-sm">
            <StopwatchIcon className="fill-current w-6 mr-2 shrink" />
            <span>{page.duration}</span>
          </li>
          <li className="flex mb-2 max-w-sm">
            <DistanceIcon className="fill-current w-6 mr-2 shrink" />
            <span>{page.distance}</span>
          </li>
          <li className="flex mb-2 max-w-sm">
            <WheelchairIcon className="fill-current w-6 mr-2 shrink" />
            <span>{page.accessibility}</span>
          </li>
          <li className="flex mb-2 max-w-sm">
            <PeopleIcon className="fill-current w-6 h-6 mr-2 shrink-0" />
            <span>{page.demographic}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
