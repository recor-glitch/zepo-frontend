import { RentRoomType } from "@/type/app";
import React from "react";
import Image from "next/image";
import DummyImg from "@/public/dummy-rent.svg";
import { dollar, rupee } from "@/constants";
import BedIcon from "@/public/bed-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";

export interface rentProps {
  className?: string;
  rent: RentRoomType;
  isSmall?: boolean;
}

function RentCard({ className, rent, isSmall }: rentProps) {
  return (
    <div
      className={`rentContainer ${className} ${
        isSmall && "h-mi-rent-card w-mi-rent-card"
      }`}
    >
      <Image
        src={rent.images.length != 0 ? rent.images[0].url : DummyImg}
        alt={rent.images[0].alt}
        className="flex object-cover rounded-t-default w-full"
        width={200}
        height={250}
      />
      <div
        className={` flex flex-col ${
          isSmall ? "gap-xxs p-2" : "gap-default py-btn-v px-btn-h"
        }`}
      >
        <span className="w-full inline-flex items-center">
          <p className="text-primary text-md-title font-extrabold">
            {rent.price.currency === "INR" ? rupee : dollar}
          </p>
          <p className="text-primary text-md-title font-extrabold">
            {" "}
            {rent.price.amount}/{" "}
          </p>
          <p className="text-md-subtitle-secondary font-medium">
            {rent.price.period.toLowerCase().slice(0, -2)}
          </p>
        </span>
        <p className="text-text-primary text-md-title font-bold">
          {rent.title}
        </p>
        <p className="text-text-primary text-md-subtitle-primary font-medium line-clamp-1 text-ellipsis overflow-hidden">
          {rent.address}
        </p>
        <div className="divider-h h-[2px]" />
        <div className="flex flex-row gap-sm">
          {/* BED */}
          <div className="flex flex-row justify-center items-center gap-xs">
            <Image className="text-primary" src={BedIcon} alt="Bed icon" />
            <p className="text-text-secondary-dark text-md-subtitle-secondary">
              {rent.type === "SINGLE"
                ? 1
                : rent.type === "DOUBLE"
                ? 2
                : rent.beds}
            </p>
          </div>
          {/* WASHROOM */}
          <div className="flex flex-row justify-center items-center gap-xs">
            <Image
              className="text-primary"
              src={WashIcon}
              alt="Wash room icon"
            />
            <p className="text-text-secondary-dark text-md-subtitle-secondary">
              {rent.washroom.count}
            </p>
          </div>
          {/* DIMENSIONS */}
          <div className="inline-flex flex-row justify-center items-center gap-xs">
            <Image
              className="text-primary"
              src={DimensionIcon}
              alt="Dimension icon"
            />
            <p className="text-text-secondary-dark text-md-subtitle-secondary line-clamp-1">
              {rent.size.dimensions.length}x{rent.size.dimensions.width}{" "}
              {rent.size.type === "FEET" ? "ft" : "m"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentCard;
