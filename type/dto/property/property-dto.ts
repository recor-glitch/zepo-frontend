export interface IPropertyDto {
  id?: string;
  images: string[];
  description: string;
  is_popular: boolean;
  amenities: string[];
  property_type: string;
  like_count: number;
  reviews?: any[];
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
  created_at: string;
  updated_at: string;
}
