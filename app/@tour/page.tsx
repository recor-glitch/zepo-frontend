import DummyRoomImage from "@/public/dummy-rent-3.png";
import Image from "next/image";
import PlayIcon from "@/public/play.svg";
import HomeIcon from "@/public/home.svg";
import { OutlinedTab } from "@/components/tabbars";
import { IconChevronRight } from "@tabler/icons-react";

export default function TourSection() {
  return (
    <div className="md:h-body-tour h-fit flex flex-col md:flex-row justify-between items-center gap-h relative mb-20">
      {/* FLOATING VIRTUAL HOME TOUR BANNER */}
      <div className="virtualTourContainer">
        <div className="rounded-full border-2 border-primary-light bg-primary-lighter p-default">
          <Image src={PlayIcon} alt="Play video icon" />
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-primary-dark font-bold text-lg-subtitle">
            Virtual home tour
          </p>
          <p className="text-text-secondary font-normal text-md-subtitle-primary">
            We provide you with virtual tour
          </p>
        </div>
      </div>
      {/* FLOATING BEST DEAL BANNER */}
      <div className="bestDealContainer">
        <div className="flex flex-col justify-start">
          <p className="text-primary-dark font-bold text-lg-subtitle">
            Find the best deal
          </p>
          <p className="text-text-secondary font-normal text-md-subtitle-primary">
            Browse thousands of properties
          </p>
        </div>
        <div className="absolute rounded-full p-[2px] bg-white bottom-16 right-10">
          <div className="bg-primary p-default rounded-full">
            <Image src={HomeIcon} alt="Play video icon" />
          </div>
        </div>
      </div>
      {/* LEFT SIDE SECTION */}
      <section className="p-h h-full md:w-1/2 w-full flex flex-row md:ml-40 md:my-[6.25rem]">
        <div className="flex md:w-3/4 w-full gap-text-spacing flex-col rounded-ss overflow-hidden">
          <Image
            src={DummyRoomImage}
            alt="Dummy room image 3"
            className="flex h-full w-full"
          />
        </div>
      </section>
      {/* RIGHT SIDE SECTION */}
      <section className="h-full md:w-1/2 w-full flex flex-col justify-center md:items-start items-center gap-sm px-sm-h md:p-0 text-center md:text-left">
        <OutlinedTab
          tabs={[{ title: "For tenants" }, { title: "For landlords" }]}
        />
        <p className="text-md-header text-text-primary font-bold md:w-3/5 w-full">
          We make it easy for tenants and landlords.
        </p>
        <p className="text-subtitle-primary text-text-secondary-dark font-medium md:w-3/5 w-full">
          Whether it’s selling your current home, getting financing, or buying a
          new home, we make it easy and efficient. The best part? you’ll save a
          bunch of money and time with our services.
        </p>
        <button className="filledBtn md:w-fit w-full flex justify-center">
          <span className="flex gap-xs text-white text-subtitle-primary">
            See more <IconChevronRight />
          </span>
        </button>
      </section>
    </div>
  );
}
