import {
  UseMutationOptions,
  useMutation
} from "@tanstack/react-query";

export const useCreateProperty = ({
  option,
}: {
  email: string;
  option?: UseMutationOptions<any>;
}) => {
  return useMutation<any>({
    mutationFn: () => Promise.resolve(),
    mutationKey: ["create-property"],
    ...option,
  });
};
