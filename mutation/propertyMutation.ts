import {
  CreateProperty,
  UpdateProperty,
} from "@/services/property-service/property-service";
import {
  IPropertyDto,
  IPropertyResponse,
  IPropertyUpdateResponse,
  IPropertyUpdateVariables,
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

export const useUpdateProperty = (
  option?: UseMutationOptions<
    IPropertyUpdateResponse,
    AxiosError,
    IPropertyUpdateVariables
  >
) => {
  return useMutation<
    IPropertyUpdateResponse,
    AxiosError,
    IPropertyUpdateVariables
  >({
    mutationFn: (variable) =>
      UpdateProperty(variable.propertyId, variable.updateDetails),
    mutationKey: ["update-property"],
    ...option,
  });
};
