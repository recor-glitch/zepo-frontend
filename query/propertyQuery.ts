import {
  GetAllProperties,
  GetAllPropertyLocations,
  GetPropertyById,
  GetPropertyRules,
} from "@/services";
import {
  IAllPropertyLocationResponse,
  IAllPropertyResponse,
  IPropertyByIdResponse,
  IPropertyFiltersDto,
  IPropertyRuleResponse,
} from "@/type/dto/property/property-dto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllProperties = ({
  filters,
  option,
}: {
  filters: IPropertyFiltersDto;
  option?: UseQueryOptions<IAllPropertyResponse>;
}) => {
  return useQuery<IAllPropertyResponse>({
    queryFn: () => GetAllProperties({ ...filters }),
    queryKey: ["getAllProperties"],
    ...option,
  });
};

export const useGetAllPropertyLocations = ({
  filters,
  option,
}: {
  filters: IPropertyFiltersDto;
  option?: UseQueryOptions<IAllPropertyLocationResponse>;
}) => {
  return useQuery<IAllPropertyLocationResponse>({
    queryFn: () => GetAllPropertyLocations({ ...filters }),
    queryKey: ["getAllPropertyLocations"],
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

export const useGetPropertyRules = ({
  option,
}: {
  option?: UseQueryOptions<IPropertyRuleResponse>;
}) => {
  return useQuery<IPropertyRuleResponse>({
    queryFn: () => GetPropertyRules(),
    queryKey: ["getPropertyRules"],
    ...option,
  });
};
