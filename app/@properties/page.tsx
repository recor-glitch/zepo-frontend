import Image from "next/image";
import MapBackground from "@/public/bg-map.svg";
import RouteImg from "@/public/route.svg";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { RentCard } from "@/components/cards";
import { dummyRoomRent } from "@/constants";
import { TabBarHome } from "@/components/tabbars";

export default function LaningSection() {
  return (
    <div className="py-property-h gap-h md:px-40 px-sm-h">
      <div className="flex flex-col md:flex-row justify-between items-center gap-text-spacing mb-h">
        <div className="flex flex-col gap-text-spacing">
          <p className="text-md-header font-bold text-text-primary">
            Based on your location
          </p>
          <p className="text-md-subtitle-primary font-normal text-text-primary">
            Some of our picked properties near you location.
          </p>
        </div>
        <button className="filledBtn w-full md:w-auto">
          Browse more properties
        </button>
      </div>
      {/* PROPERTIES GRID */}
      <div className="grid md:grid-cols-4 items-center justify-center gap-h">
        {dummyRoomRent.map((rent) => (
          <RentCard rent={rent} showLike />
        ))}
      </div>
    </div>
  );
}
