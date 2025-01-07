import { GetWishListByUserId } from "@/services/wishlist-service/wishListService";
import { IWishListResponse } from "@/type/dto/wishlist/wishlist-dto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetWishListByUserId = ({
  option,
  user_id,
}: {
  user_id: string;
  option?: UseQueryOptions<IWishListResponse>;
}) => {
  return useQuery<IWishListResponse>({
    queryFn: () => GetWishListByUserId(user_id),
    queryKey: ["getWishListByUserId", user_id],
    ...option,
  });
};