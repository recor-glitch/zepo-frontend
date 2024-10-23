import { IDefaultResponse } from "@/type/app";
import {
  IAddressDetails,
  IUpdateAddressDetails,
} from "@/type/dto/address/address-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function SaveAddress(
  address: IAddressDetails
): Promise<IDefaultResponse> {
  const res = await axiosInstance.post("/property/address", {
    ...address,
  });

  return res.data;
}

export async function UpdateAddress(
  address: IUpdateAddressDetails
): Promise<IDefaultResponse> {
  const res = await axiosInstance.patch("/property/address", {
    ...address,
  });

  return res.data;
}
