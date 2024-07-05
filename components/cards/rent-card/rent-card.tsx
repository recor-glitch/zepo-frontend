import { RentRoomType } from "@/type/app";
import React from "react";
import Image from "next/image";
import DummyImg from "@/public/dummy-rent.svg";
import { dollar, rupee } from "@/constants";
import BedIcon from "@/public/bed-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import StarIcon from "@/public/stars-icon.svg";
import PointedEdge from "@/public/pointed-edge.svg";
import HeartIcon from "@/public/heart-icon.svg";

export interface rentProps {
  className?: string;
  rent: RentRoomType;
  isSmall?: boolean;
  isLiked?: boolean;
  showLike?: boolean;
  showPopular?: boolean;
}

function RentCard({
  className,
  rent,
  isSmall,
  isLiked = false,
  showLike = false,
  showPopular = true,
}: rentProps) {
  return (
    <div
      className={`rentContainer ${
        isSmall && "h-mi-rent-card w-mi-rent-card"
      } ${className}`}
    >
      {/* POPULAR */}
      {showPopular && rent.isPopular && (
        <div className="flex justify-around items-center absolute min-w-[7.063rem] min-h-[2.5rem] bg-primary z-30 top-[47%] left-0 transform translate-x-[-0.5rem] rounded-t-lg rounded-br-lg">
          <Image src={StarIcon} alt="popular star icon" />
          <p className="text-sm-subtitle text-white font-bold">POPULAR</p>
        </div>
      )}
      {showPopular && rent.isPopular && (
        <Image
          src={PointedEdge}
          alt="pointer for popular tag"
          height={8}
          width={8}
          className="absolute top-[56.6%] transform translate-x-[-0.5rem]"
        />
        // <div className="bg-primary absolute rounded-bl-sm z-10 transform :bottom-0 left-0 translate-y-[1.2rem] translate-x-[-0.35rem] top-[11.9rem] rotate-45 h-3 w-3"></div>
      )}
      <Image
        src={rent.images.length != 0 ? rent.images[0].url : DummyImg}
        alt={rent.images[0].alt}
        className="flex rounded-t-default w-full h-[52%] object-cover"
        width={300}
        height={250}
      />
      <div
        className={`flex flex-col ${
          isSmall ? "gap-xxs p-2" : "gap-xs py-btn-v px-btn-h"
        }`}
      >
        <div className="flex justify-between items-start">
          <span className="w-full inline-flex items-center text-primary text-md-title font-extrabold">
            <p className="">{rent.price.currency === "INR" ? rupee : dollar}</p>
            <p className=""> {rent.price.amount}/ </p>
            <p className="text-md-subtitle-secondary font-medium">
              {rent.price.period.toLowerCase().slice(0, -2)}
            </p>
          </span>
          {showLike && (
            <div className="rounded-full border-2 border-primary-light flex justify-center items-center p-btn-v">
              <Image
                src={HeartIcon}
                alt="like buttoon"
                height={24}
                width={24}
              />
            </div>
          )}
        </div>
        <p className="text-text-primary text-md-title font-bold">
          {rent.title}
        </p>
        <p className="text-text-primary text-md-subtitle-primary font-medium line-clamp-1 text-ellipsis overflow-hidden">
          {rent.address}
        </p>
        <div className="divider-h h-[2px]" />
        <div className="flex flex-row justify-around items-center gap-sm">
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
