import { AddToWishList } from "@/services/wishlist-service/wishListService";
import { IDefaultResponse } from "@/type/app";
import { IWishListVariable } from "@/type/dto/wishlist/wishlist-dto";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAddToWishlistMutation = ({
  options,
}: {
  options?: UseMutationOptions<IDefaultResponse, AxiosError, IWishListVariable>;
}) => {
  return useMutation<IDefaultResponse, AxiosError, IWishListVariable>({
    mutationFn: (variable) =>
      AddToWishList(variable.property_id, variable.user_id),
    mutationKey: ["addToWishList"],
    ...options,
  });
};

export const useRemoveFromWishlistMutation = ({
  options,
}: {
  options?: UseMutationOptions<IDefaultResponse, AxiosError, IWishListVariable>;
}) => {
  return useMutation<IDefaultResponse, AxiosError, IWishListVariable>({
    mutationFn: (variable) =>
      AddToWishList(variable.property_id, variable.user_id),
    mutationKey: ["removeFromWishList"],
    ...options,
  });
};
