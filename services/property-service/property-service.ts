import { IPropertyDto } from "@/type/dto/property/property-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function CreateProperty(property: IPropertyDto): Promise<any> {
  const res = await axiosInstance.post("/property", {
    ...property,
  });

  return res.data;
}
