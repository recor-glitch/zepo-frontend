import {
  CurrencyType,
  PeriodType,
  RoomType,
  SizeType,
  WashRoomType,
} from "@/type/app";
import { IAddressDetails } from "../address/address-dto";

export interface IPropertyDto {
  id?: number;
  title: string;
  images: string[];
  description: string;
  is_popular: boolean;
  amenities: string[];
  property_type: string;
  like_count: number;
  review_id?: number;
  host_id: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type: string;
  washroom_count: number;
  property_width?: number;
  property_length?: number;
  unit?: string;
  currency?: string;
  amount?: number;
  period?: string;
  created_at?: string;
  updated_at?: string;
  rules: IPropertyRule[];
}

export interface IPropertyWithRulesIdDto {
  id?: number;
  title: string;
  images: string[];
  description: string;
  is_popular: boolean;
  amenities: string[];
  property_type: string;
  like_count: number;
  review_id?: number;
  host_id: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type: string;
  washroom_count: number;
  property_width?: number;
  property_length?: number;
  unit?: string;
  currency?: string;
  amount?: number;
  period?: string;
  created_at?: string;
  updated_at?: string;
  rules: number[];
}

export interface IPropertyDtoWithIdRequired {
  id: number;
  title: string;
  images: string[];
  description: string;
  is_popular: boolean;
  amenities: string[];
  property_type: string;
  like_count: number;
  review_id?: number;
  host_id: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type: string;
  washroom_count: number;
  property_width?: number;
  property_length?: number;
  unit?: string;
  currency?: string;
  amount?: number;
  period?: string;
  created_at?: string;
  updated_at?: string;
  rules: IPropertyRule[];
}
export interface IPropertyFormDto {
  id?: number;
  title: string;
  images: (File | string)[];
  description: string;
  is_popular: boolean;
  amenities: string[];
  property_type: string;
  like_count: number;
  review_id?: number;
  host_id: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type: string;
  washroom_count: number;
  property_width?: number;
  property_length?: number;
  unit?: string;
  currency?: string;
  amount?: number;
  period?: string;
  created_at?: string;
  updated_at?: string;
  rules: IPropertyRule[];
}

export interface IPropertyUpdateDto {
  title?: string;
  images?: string[];
  description?: string;
  is_popular?: boolean;
  amenities?: string[];
  property_type?: string;
  like_count?: number;
  review_id?: number;
  host_id?: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type?: string;
  washroom_count?: number;
  property_width?: number;
  property_length?: number;
  unit?: string;
  currency?: string;
  amount?: number;
  period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPropertyLocationResponse {
  id: number;
  lat: string;
  lon: string;
  image: string;
  title: string;
}

export interface IBannerPropertyResponse {
  id: number;
  images: string[];
  description: string;
  amount: number;
  currency: CurrencyType;
  property_type: RoomType;
  period: PeriodType;
  unit: SizeType;
  isPopular: boolean;
  likeCount: number;
  title: string;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom_type: WashRoomType;
  washroom_count: number;
  property_width?: number;
  property_length?: number;
  amenities: string[];
}

export interface IPropertyFiltersDto {
  limit: number;
  cursor: number;
  city?: string;
  low_to_high?: number;
  property_type?: string[];
  max_price?: number;
  min_price?: number;
  rating?: number;
  beds?: number[];
  search?: string;
  rules?: number[];
}

export interface IAllPropertyResponse {
  data?: IBannerPropertyResponse[];
  statusCode: number;
  total: number;
}

export interface IAllPropertyLocationResponse {
  data: IPropertyLocationResponse[];
  statusCode: number;
  total: number;
}

export interface IPropertyRule {
  id: number;
  rule_name: string;
  description: string;
}
export interface IPropertyRuleWithIcon extends IPropertyRule {
  icon: any;
}

export interface IPropertyRuleResponse {
  data: { rules: IPropertyRule[] };
  statusCode: number;
}

export interface IPropertyByIdResponse {
  data?: {
    property: IPropertyDtoWithIdRequired;
    address: IAddressDetails;
  };
  statusCode: number;
}

export interface IPropertyResponse extends DefaultResponse {
  propertyId: number;
}
export interface DefaultResponse {
  message: string;
  statusCode: number;
}

export interface IPropertyUpdateVariables {
  propertyId: number;
  updateDetails: IPropertyUpdateDto;
}

export interface IPropertyUpdateResponse {
  message: string;
  statusCode: number;
}

export interface IPropertyWithAddressVariables {
  property: IPropertyWithRulesIdDto;
  address: IAddressDetails;
}
