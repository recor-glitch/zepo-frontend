import { GetAllProperties } from "@/services";
import { IAllPropertyResponse } from "@/type/dto/property/property-dto";
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
