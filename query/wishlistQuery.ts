import { GetWishListByUserId } from "@/services/wishlist-service/wishListService";
import { IWishListResponse } from "@/type/dto/wishlist/wishlist-dto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetWishListByUserId = ({
  option,
}: {
  option?: UseQueryOptions<IWishListResponse>;
}) => {
  return useQuery<IWishListResponse>({
    queryFn: () => GetWishListByUserId(),
    queryKey: ["getWishListByUserId"],
    ...option,
  });
};
