import { SaveAddress } from "@/services/address-service/address-service";
import { IAddressDetails } from "@/type/app";
import { IAddressResponse } from "@/type/dto/address/address-dto";
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
