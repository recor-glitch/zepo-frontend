import { DefaultResponse } from "@/type/dto/property/property-dto";
import { IWishListResponse } from "@/type/dto/wishlist/wishlist-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function AddToWishList(
  property_id: number,
  user_id: string
): Promise<DefaultResponse> {
  const res = await axiosInstance.post<DefaultResponse>(`/wishlist`, {
    property_id,
    user_id,
  });

  return res.data;
}

export async function GetWishListByUserId(): Promise<IWishListResponse> {
  const res = await axiosInstance.get<IWishListResponse>(`/wishlist`);

  return res.data;
}

export async function RemoveFromWishList(
  property_id: number,
  user_id: string
): Promise<DefaultResponse> {
  const res = await axiosInstance.delete<DefaultResponse>(`/wishlist`, {
    data: {
      property_id,
      user_id,
    },
  });

  return res.data;
}
