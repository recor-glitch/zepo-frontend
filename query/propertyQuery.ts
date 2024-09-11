import { GetAllProperties, GetPropertyById } from "@/services";
import {
  IAllPropertyResponse,
  IPropertyByIdResponse,
} from "@/type/dto/property/property-dto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllProperties = ({
  option,
}: {
  option?: UseQueryOptions<IAllPropertyResponse>;
}) => {
  return useQuery<IAllPropertyResponse>({
    queryFn: () => GetAllProperties(),
    queryKey: ["getAllProperties"],
    ...option,
  });
};

export const useGetPropertyById = ({
  id,
  option,
}: {
  id: string;
  option?: UseQueryOptions<IPropertyByIdResponse>;
}) => {
  return useQuery<IPropertyByIdResponse>({
    queryFn: () => GetPropertyById(id),
    queryKey: ["getProperty", id],
    ...option,
  });
};
