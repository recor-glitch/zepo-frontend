import { ICreateUserResponse, IUser } from "@/type/app";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function CreateUser(props: IUser): Promise<ICreateUserResponse> {
  const res = await axiosInstance.post<ICreateUserResponse>(`/user`, {
    ...props,
  });
  return res.data;
}

export async function GetUserById(id: string): Promise<any> {}

export async function validateUser() {}
