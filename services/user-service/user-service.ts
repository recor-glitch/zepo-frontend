import { ICreateUserResponse, IUser, IUserResponse } from "@/type/app";
import axiosInstance from "@/utils/axios-instance/axios-instance";
import axios from "axios";

export async function CreateUser(props: IUser): Promise<ICreateUserResponse> {
  const res = await axiosInstance.post<ICreateUserResponse>(`/user`, {
    ...props,
  });
  return res.data;
}

export async function GetUserById(id: string): Promise<any> {}

export async function GetUserByEmail(email: string): Promise<IUserResponse> {
  const res = await axios.post<IUserResponse>(
    `${process.env.BASE_URL}/get-by-email`,
    {
      email,
    }
  );
  console.log({ response: res.data });
  return res.data;
}

export async function validateUser() {}
