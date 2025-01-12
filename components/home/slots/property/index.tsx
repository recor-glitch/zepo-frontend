import { RentCard } from "@/components/cards";
import { IAllPropertyResponse } from "@/type/dto/property/property-dto";
import {
  IWishlistProperty,
  IWishListResponse,
} from "@/type/dto/wishlist/wishlist-dto";
import { TokenStorage } from "@/utils/access-token-storage/access-token-storage";
import axiosInstance from "@/utils/axios-instance/axios-instance";
import Link from "next/link";

export async function BrowsePropertySection() {
  // PROPERTY RESPONSE
  const res = await axiosInstance.get<IAllPropertyResponse>("/property");
  const { data, statusCode, total } = res.data;

  // WISHLIST RESPONSE
  let wishlist: IWishlistProperty[] = [];
  if (TokenStorage.getAccessToken) {
    try {
      const wishListRes = await axiosInstance.get<IWishListResponse>(
        "/wishlist"
      );
      wishlist = wishListRes.data.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  return (
    <div className="flex flex-col py-property-h gap-h lg:px-40 px-sm-h">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-text-spacing">
        <div className="flex flex-col gap-text-spacing">
          <p className="text-md-header font-bold text-text-primary">
            Based on your location
          </p>
          <p className="text-md-subtitle-primary font-normal text-text-primary">
            Some of our picked properties near you location.
          </p>
        </div>
        <Link href="/browse">
          <button className="filledBtn w-full lg:w-auto">
            Browse more properties
          </button>
        </Link>
      </div>
      {/* PROPERTIES GRID */}
      <div className="grid lg:grid-cols-4 gap-h w-full">
        {data && data?.length != 0 ? (
          data?.map((rent, index) => {
            console.log(
              "My wishlist filter data:",
              wishlist?.filter((item) => item.id === rent.id)
            );
            wishlist?.filter((item) => {
              console.log(
                "My ids",
                item.id,
                rent.id,
                typeof item.id,
                typeof rent.id
              );
              return item.id == rent.id;
            });
            return (
              <RentCard
                rent={rent}
                clickable
                showLike
                key={rent.title + index}
                Liked={
                  wishlist?.filter((item) => item.id == rent.id).length > 0
                }
              />
            );
          })
        ) : (
          <>No property listed yet</>
        )}
      </div>
    </div>
  );
}
