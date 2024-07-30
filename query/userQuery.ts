import {
  CreateUser,
  GetUserByEmail,
  GetUserById,
  validateUser,
} from "@/services";
import { ICreateUserResponse, IUser } from "@/type/app";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSigninUser = ({
  option,
  user,
}: {
  user: IUser;
  option?: UseQueryOptions<ICreateUserResponse>;
}) => {
  return useQuery<ICreateUserResponse>({
    queryFn: () => CreateUser(user),
    queryKey: ["create"],
    ...option,
  });
};

export const useGetUserById = ({
  id,
  option,
}: {
  id: string;
  option?: UseQueryOptions;
}) => {
  return useQuery({
    queryFn: () => GetUserById(id),
    queryKey: ["getUserById", id],
    ...option,
  });
};

export const useGetUserByEmail = ({
  Email,
  option,
}: {
  Email: string;
  option?: UseQueryOptions;
}) => {
  return useQuery({
    queryFn: () => GetUserByEmail(Email),
    queryKey: ["getUserByEmail", Email],
    ...option,
  });
};

export const useValidateUser = ({ option }: { option?: UseQueryOptions }) => {
  return useQuery({
    queryFn: validateUser,
    queryKey: ["validate"],
    ...option,
  });
};
