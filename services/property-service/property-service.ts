import { IAddressDetails, propertyContextDto } from "@/type/app";
import {
  IAllPropertyResponse,
  IPropertyDto,
  IPropertyUpdateDto,
} from "@/type/dto/property/property-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function CreateProperty(property: IPropertyDto): Promise<any> {
  const res = await axiosInstance.post("/property/create", {
    ...property,
  });

  return res.data;
}

export async function CreatePropertyWithAddress(
  property: IPropertyDto,
  address: IAddressDetails
): Promise<any> {
  const res = await axiosInstance.post("/property", {
    property,
    address,
  });

  return res.data;
}

export async function UpdateProperty(
  propertyId: number,
  property: IPropertyUpdateDto
): Promise<any> {
  const res = await axiosInstance.patch(`/property/${propertyId}`, {
    ...property,
  });

  return res.data;
}

export async function GetAllProperties(): Promise<IAllPropertyResponse> {
  const res = await axiosInstance.get(`/property`);

  return res.data;
}
