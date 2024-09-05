import { RentCard } from "@/components/cards";
import { TabBarHome } from "@/components/tabbars";
import { dummyRoomRent } from "@/constants";
import MapBackground from "@/public/bg-map.svg";
import RouteImg from "@/public/route.svg";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import Image from "next/image";

export async function LaningSection() {
  return (
    <div className="lg:h-body flex justify-between items-center gap-h relative">
      {/* LEFT SIDE SECTION */}
      <section className="p-h h-full lg:w-1/2 w-full flex flex-row lg:ml-40">
        <div className="flex lg:w-3/4 w-full gap-text-spacing flex-col">
          <p className="lgHeaderText">
            Buy, rent, or sell your property easily
          </p>
          <p className="lgSubHeaderText">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
          <div className="flex gap-default lg:relative bottom-0">
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
              <button className="filledBtn">Browse&nbsp;Properties</button>
            </div>
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
      <section className="h-full w-1/2 lg:block hidden">
        <RentCard
          className="absolute top-[3rem] right-[30rem] z-10"
          rent={dummyRoomRent[0]}
          isSmall
          showPopular={false}
        />
        <RentCard
          className="absolute top-[30rem] right-[10rem] z-10"
          rent={dummyRoomRent[dummyRoomRent.length - 1]}
          isSmall
          showPopular={false}
        />
        <Image
          src={MapBackground}
          alt="background map"
          className="flex flex-1 object-cover overflow-hidden w-full h-full"
        />
        <Image
          src={RouteImg}
          alt="route image"
          className="absolute lg:visible top-0 right-[10rem] h-route-h w-route-w mt-body"
        />
      </section>
    </div>
  );
}
