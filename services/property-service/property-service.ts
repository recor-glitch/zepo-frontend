import {
  IPropertyDto,
  IPropertyUpdateDto,
} from "@/type/dto/property/property-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function CreateProperty(property: IPropertyDto): Promise<any> {
  const res = await axiosInstance.post("/property", {
    ...property,
  });

  return res.data;
}

export async function UpdateProperty(
  propertyId: number,
  property: IPropertyUpdateDto
): Promise<any> {
  const res = await axiosInstance.patch(`property/${propertyId}`, {
    ...property,
  });

  return res.data;
}
