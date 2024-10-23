"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";

export function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel slide={true}>
      {images?.map((img, idx) => (
        <div key={img + idx} className="relative w-full h-64 lg:h-full sm:h-96">
          <Image
            unoptimized
            src={img}
            alt="Carousel Property Images"
            layout="fill" // Makes the image responsive
            objectFit="cover" // Ensures the image fits within the container
          />
        </div>
      ))}
    </Carousel>
  );
}
