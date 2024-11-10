"use client";

import PropertyEditComponent from "@/components/form/modal/edit/editPropertyForm";
import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import DefaultPopoverComponent from "@/components/popover/default-popover/default-popover";
import { dollar, rupee } from "@/constants";
import { useSetModalAndDrawerClose } from "@/hook/use-modal-drawer-close";
import BedIcon from "@/public/bed-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import DummyImg from "@/public/dummy-rent.svg";
import HeartIcon from "@/public/heart-icon.svg";
import PointedEdge from "@/public/pointed-edge.svg";
import StarIcon from "@/public/stars-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import { IBannerPropertyResponse } from "@/type/dto/property/property-dto";
import {
  IconDotsVertical,
  IconEdit,
  IconHeart,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface rentProps {
  className?: string;
  rent: IBannerPropertyResponse;
  isSmall?: boolean;
  isLiked?: boolean;
  showLike?: boolean;
  showPopular?: boolean;
  clickable?: boolean;
  editEnabled?: boolean;
  editCallback?: () => void;
}

function RentCard({
  className,
  rent,
  isSmall,
  isLiked = false,
  showLike = false,
  showPopular = true,
  clickable = false,
  editEnabled = false,
  editCallback,
}: rentProps) {
  const router = useRouter();
  const { open, toggleOpen } = useSetModalAndDrawerClose();
  return (
    <div
      className={`rentContainer ${
        isSmall && "h-mi-rent-card w-mi-rent-card shadow-md"
      } ${className} ${clickable && "cursor-pointer"}`}
      id={rent.title + rent.description}
      onClick={() => clickable && router.push(`/home/property/${rent.id}`)}
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
      {/* EDITABLE */}
      {editEnabled && (
        <DefaultPopoverComponent
          content={
            <div className="flex flex-col gap-default">
              <ResponsiveDrawerDialog
                open={open}
                toggleOpen={toggleOpen}
                title="Edit Property"
                description="Make sure the property details provided are correct"
                trigger={
                  <div className="flex gap-default p-2 cursor-pointer">
                    <IconEdit className="text-text-secondary" />
                    <p className="text-text-secondary font-medium">
                      Edit Property
                    </p>
                  </div>
                }
                content={<PropertyEditComponent id={rent.id.toString()} />}
              />
              {/* <div className="divider-h" /> */}
              <div className="flex gap-default p-2 cursor-pointer">
                <IconTrash className="text-text-secondary" />

                <p className="text-text-secondary font-medium">
                  Delete Property
                </p>
              </div>
            </div>
          }
          triggerElement={
            <div className="absolute top-5 right-5 rounded-full bg-white opacity-70 cursor-pointer p-2">
              <IconDotsVertical className="text-text-secondary min-h-4 min-w-4" />
            </div>
          }
        />
      )}
      <Image
        src={rent.images.length != 0 ? rent.images[0] : DummyImg}
        unoptimized
        alt={"Property images"}
        className="flex rounded-t-default w-full h-[52%] min-h-[10vh]"
        width={100}
        height={100}
        objectFit="contain" // Ensures the image fits within the container
      />
      <div
        className={`flex flex-col ${
          isSmall ? "gap-xxs p-2" : "gap-xs py-btn-v px-btn-h"
        }`}
      >
        <div className="flex justify-between items-start">
          <span className="w-full inline-flex items-center text-primary text-md-title font-extrabold">
            <p className="">{rent.currency === "INR" ? rupee : dollar}</p>
            <p className=""> {rent.amount}/ </p>
            <p className="text-md-subtitle-secondary font-medium">
              {rent.period.toString().toLowerCase()}
            </p>
          </span>
          {showLike && (
            <div className="rounded-full border-2 border-primary-light flex justify-center items-center p-2">
              <IconHeart className="text-primary" />
            </div>
          )}
        </div>
        <p className="text-text-primary text-md-title font-bold text-ellipsis line-clamp-1">
          {rent.title}
        </p>
        <p className="text-text-primary text-md-subtitle-primary font-medium line-clamp-1 text-ellipsis overflow-hidden">
          {rent.description}
        </p>
        <div className="divider-h h-[2px]" />
        <div className="flex flex-row justify-around items-center gap-sm">
          {/* BED */}
          <div className="flex flex-row justify-center items-center gap-xs">
            <Image className="text-primary" src={BedIcon} alt="Bed icon" />
            <p className="text-text-secondary-dark text-md-subtitle-secondary">
              {rent.property_type === "SINGLE"
                ? 1
                : rent.property_type === "DOUBLE"
                ? 2
                : rent.bed}
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
              {rent.washroom_count}
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
              {rent.property_length}x{rent.property_width}{" "}
              {rent.unit === "FEET" ? "ft" : "m"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentCard;
