import {
  SaveAddress,
  UpdateAddress,
} from "@/services/address-service/address-service";
import { IDefaultResponse } from "@/type/app";
import {
  IAddressDetails,
  IAddressResponse,
  IUpdateAddressDetails,
} from "@/type/dto/address/address-dto";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSaveAddress = (
  option?: UseMutationOptions<IAddressResponse, AxiosError, IAddressDetails>
) => {
  return useMutation<IAddressResponse, AxiosError, IAddressDetails>({
    mutationFn: (address) => SaveAddress(address),
    mutationKey: ["create-property"],
    ...option,
  });
};

export const useUpdateAddress = (
  option?: UseMutationOptions<
    IDefaultResponse,
    AxiosError,
    IUpdateAddressDetails
  >
) => {
  return useMutation<IDefaultResponse, AxiosError, IUpdateAddressDetails>({
    mutationFn: (address) => UpdateAddress(address),
    mutationKey: ["update-property"],
    ...option,
  });
};
