"use client";

import PropertyEditComponent from "@/components/form/modal/edit/editPropertyForm";
import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import { dollar, rupee } from "@/constants";
import { useUserContext } from "@/context/user/user-context";
import { useSetModalAndDrawerClose } from "@/hook/use-modal-drawer-close";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/mutation/wishlistMutation";
import BedIcon from "@/public/bed-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import DummyImg from "@/public/dummy-rent.svg";
import PointedEdge from "@/public/pointed-edge.svg";
import StarIcon from "@/public/stars-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import { IBannerPropertyResponse } from "@/type/dto/property/property-dto";
import { IconEdit, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface rentProps {
  className?: string;
  rent: IBannerPropertyResponse;
  isSmall?: boolean;
  Liked?: boolean;
  showLike?: boolean;
  showPopular?: boolean;
  clickable?: boolean;
  editEnabled?: boolean;
  editCallback?: () => void;
  isReverse?: boolean;
}

function HorizontalRentCard({
  className,
  rent,
  isSmall,
  Liked = false,
  showLike = false,
  showPopular = true,
  clickable = false,
  editEnabled = false,
  isReverse = false,
  editCallback,
}: rentProps) {
  const router = useRouter();
  const { open, toggleOpen } = useSetModalAndDrawerClose();
  const {
    mutateAsync: addToWishListMutation,
    isError: addToWishListIsError,
    isPending: addToWishListIsPending,
    isSuccess: addToWishListIsSuccess,
  } = useAddToWishlistMutation({});

  const {
    mutateAsync: removeFromWishlistMutation,
    isError: removeFromWishListIsError,
    isPending: removeFromWishListIsPending,
    isSuccess: removeFromWishListIsSuccess,
  } = useRemoveFromWishlistMutation({});

  const { user } = useUserContext();

  const [isLiked, setIsLiked] = useState<boolean>(Liked!!);

  useEffect(() => {
    if (addToWishListIsSuccess || removeFromWishListIsSuccess) {
      toast.error("Something went wrong, please try again latter");
    }
  }, [addToWishListIsError, removeFromWishListIsError]);

  const handleLlikeClicked = async (isLiked: boolean) => {
    if (!user) {
      toast("Please login to go further!");
      return;
    }

    if (isLiked) {
      await removeFromWishlistMutation({
        property_id: rent.id,
        user_id: user.id,
      });
      setIsLiked(false);
      return;
    }
    await addToWishListMutation({ property_id: rent.id, user_id: user.id });
    setIsLiked(true);
  };
  return (
    <div
      className={`rentContainer-h ${isReverse && "flex-row-reverse"} ${
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
        <ResponsiveDrawerDialog
          open={open}
          toggleOpen={toggleOpen}
          title="Edit Property"
          description="Make sure the property details provided are correct"
          trigger={
            <div className="absolute top-5 right-5 rounded-full bg-white opacity-70 cursor-pointer p-2">
              <IconEdit className="text-text-primary" />
            </div>
          }
          content={<PropertyEditComponent id={rent.id.toString()} />}
        />
      )}
      <Image
        src={rent.images.length != 0 ? rent.images[0] : DummyImg}
        unoptimized
        alt={"Property images"}
        className="flex rounded-default h-full w-1/3 min-h-[10vh]"
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
            <div
              className="rounded-full border-2 border-primary-light flex justify-center items-center p-2 cursor-pointer"
              onClick={() => handleLlikeClicked(isLiked)}
            >
              {isLiked ? (
                <IconHeartFilled className="text-primary" />
              ) : (
                <IconHeart className="text-primary" />
              )}
            </div>
          )}
        </div>
        <p className="text-text-primary text-md-title font-bold text-ellipsis line-clamp-1">
          {rent.title}
        </p>
        <p className="text-text-primary text-md-subtitle-primary font-medium line-clamp-2 md:line-clamp-3 lg:line-clamp-5 text-ellipsis overflow-hidden">
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

export default HorizontalRentCard;
