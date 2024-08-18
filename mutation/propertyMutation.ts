import { CreateProperty } from "@/services/property-service/property-service";
import {
  IPropertyDto,
  IPropertyResponse,
} from "@/type/dto/property/property-dto";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateProperty = (
  option?: UseMutationOptions<IPropertyResponse, AxiosError, IPropertyDto>
) => {
  return useMutation<IPropertyResponse, AxiosError, IPropertyDto>({
    mutationFn: (property) => CreateProperty(property),
    mutationKey: ["create-property"],
    ...option,
  });
};
