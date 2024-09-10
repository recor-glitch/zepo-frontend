"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";

export function ImageCarousel({ images }: { images: string[] }) {
  return (
    <div className="h-full w-full">
      <Carousel slide={false}>
        {images?.map((img, idx) => (
          <Image
            key={img + idx}
            src={img}
            alt="Carousel Property Images"
            width={200}
            height={200}
          />
        ))}
      </Carousel>
    </div>
  );
}
