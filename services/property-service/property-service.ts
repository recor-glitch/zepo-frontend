import { IAddressDetails } from "@/type/dto/address/address-dto";
import {
  IAllPropertyLocationResponse,
  IAllPropertyResponse,
  IPropertyByIdResponse,
  IPropertyDto,
  IPropertyFiltersDto,
  IPropertyRuleResponse,
  IPropertyUpdateDto,
  IPropertyWithRulesIdDto,
} from "@/type/dto/property/property-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function CreateProperty(property: IPropertyDto): Promise<any> {
  const res = await axiosInstance.post("/property/create", {
    ...property,
  });

  return res.data;
}

export async function CreatePropertyWithAddress(
  property: IPropertyWithRulesIdDto,
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

export async function GetAllProperties({
  cursor,
  limit,
  beds,
  city,
  low_to_high,
  max_price,
  min_price,
  property_type,
  search,
  rules,
}: IPropertyFiltersDto): Promise<IAllPropertyResponse> {
  console.log({ property_type });
  const res = await axiosInstance.get(
    `/property?search=${search || ""}&limit=${limit}&cursor=${cursor}&beds=${
      beds || ""
    }&city=${city || ""}&low_to_high=${low_to_high || ""}&max_price=${
      max_price || ""
    }&min_price=${min_price || ""}&property_type=${property_type ?? ""}&rules=${
      rules || ""
    }`
  );

  return res.data;
}

export async function GetPropertyById(
  id: string
): Promise<IPropertyByIdResponse> {
  const res = await axiosInstance.get(`/property/${id}`);

  return res.data;
}

export async function GetPropertyRules(): Promise<IPropertyRuleResponse> {
  const res = await axiosInstance.get(`/property/rules`);

  return res.data;
}

export async function GetAllPropertyLocations({
  cursor,
  limit,
  beds,
  city,
  low_to_high,
  max_price,
  min_price,
  property_type,
  search,
  rules,
}: IPropertyFiltersDto): Promise<IAllPropertyLocationResponse> {
  const res = await axiosInstance.get(
    `/locations?search=${search || ""}&limit=${limit}&cursor=${cursor}&beds=${
      beds || ""
    }&city=${city || ""}&low_to_high=${low_to_high || ""}&max_price=${
      max_price || ""
    }&min_price=${min_price || ""}&property_type=${property_type ?? ""}&rules=${
      rules || ""
    }`
  );

  return res.data;
}
