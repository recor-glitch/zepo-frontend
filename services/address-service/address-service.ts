import { IAddressDetails } from "@/type/app";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function SaveAddress(address: IAddressDetails): Promise<any> {
  const res = await axiosInstance.post("/property/address", {
    ...address,
  });

  return res.data;
}
