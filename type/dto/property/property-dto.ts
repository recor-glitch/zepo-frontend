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

export interface IPropertyResponse {
  message: string;
  propertyId: number;
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
