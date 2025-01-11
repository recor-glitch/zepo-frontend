// Wishlist
export interface IWishlistProperty {
  id: number;
  description: string;
  images: string;
  property_type: string;
  title: string;
  host_id: string;
  bed: number;
  hall: number;
  kitchen: number;
  balcony: number;
  washroom_count: number;
  washroom_type: string;
  amount: number;
  currency: string;
  period: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  list_from: string;
  wishlist_id: number;
}

export interface IWishListResponse {
  statusCode: number;
  data: IWishlistProperty[];
}

export interface IWishListVariable {
  property_id: number;
  user_id: string;
}
