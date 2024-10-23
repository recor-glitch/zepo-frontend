import { AddEmailToWaitlist } from "@/services/waitlist-service/waitlist-service";
import { IWaitlistResponse } from "@/type/app";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useSaveToWaitlist = ({
  email,
  option,
}: {
  email: string;
  option?: UseQueryOptions<IWaitlistResponse>;
}) => {
  return useQuery<IWaitlistResponse>({
    queryFn: () => AddEmailToWaitlist(email),
    queryKey: ["waitlist", email],
    ...option,
  });
};
