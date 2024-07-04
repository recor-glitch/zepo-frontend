import Image from "next/image";
import MapBackground from "@/public/bg-map.svg";
import RouteImg from "@/public/route.svg";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { RentCard } from "@/components/cards";
import { dummyRoomRent } from "@/constants";
import { TabBarHome } from "@/components/tabbars";

export default function LaningSection() {
  return (
    <div className="h-body flex justify-between items-center gap-h relative">
      {/* LEFT SIDE SECTION */}
      <section className="p-h h-full md:w-1/2 w-full flex flex-row md:ml-40">
        <div className="flex md:w-3/4 w-full gap-text-spacing flex-col">
          <p className="lgHeaderText">
            Buy, rent, or sell your property easily
          </p>
          <p className="lgSubHeaderText">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
          <div className="gap-text-spacing-stats md:flex hidden">
            <div className="gap-stat-v-divider flex justify-start items-center">
              <div className="divider-v" />
              <div className="flex flex-col gap-0 justify-start">
                <p className="font-bold text-primary text-md-primary-header">
                  50k+
                </p>
                <p className="font-medium text-text-secondary-dark text-md-subtitle-primary">
                  renters
                </p>
              </div>
            </div>
            <div className="gap-stat-v-divider flex justify-start items-center">
              <div className="divider-v" />
              <div className="flex flex-col gap-0 justify-start">
                <p className="font-bold text-primary text-md-primary-header">
                  10k+
                </p>
                <p className="font-medium text-text-secondary-dark text-md-subtitle-primary">
                  properties
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <TabBarHome />
            {/* SEARCH FIELD */}
            <div className="searchContainer">
              <input
                placeholder="Search Location"
                className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex flex-1 py-v"
              />
              <button className="squareBtn justify-self-end">
                <IconSearch className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* RIGHT SIDE SECTION */}
      <section className="h-full w-1/2 md:block hidden">
        <RentCard
          className="absolute top-[3rem] right-[30rem]"
          rent={dummyRoomRent[0]}
        />
        <RentCard
          className="absolute top-[30rem] right-[10rem]"
          rent={dummyRoomRent[1]}
          isSmall
        />
        <Image
          src={MapBackground}
          alt="background map"
          className="flex flex-1 object-cover overflow-hidden w-full h-full"
        />
        <Image
          src={RouteImg}
          alt="route image"
          className="absolute md:visible top-0 right-[10rem] h-route-h w-route-w mt-body"
        />
      </section>
      {/* BROWSER PROPERTIES (FLOATING OVER LEFT SIDE)*/}
      <div className="browseContainer">
        <div className="flex flex-col min-w-fit h-fit">
          <p className="text-text-normal font-medium text-md-subtitle-primary">
            Location
          </p>
          <p className="text-text-primary font-bold text-md-subtitle-main">
            Geetanagar, Panipath
          </p>
        </div>
        <div className="thin-divider-v" />
        <div className="flex flex-col min-w-fit h-fit">
          <p className="text-text-normal font-medium text-md-subtitle-primary">
            When
          </p>
          <span className="flex flex-row gap-2">
            <p className="text-text-primary font-bold text-md-subtitle-main">
              Select Move-in Date
            </p>
            <IconCalendar className="text-text-secondary" />
          </span>
        </div>
        <div className="thin-divider-v" />
        <button className="filledBtn">Browse Properties</button>
      </div>
    </div>
  );
}
