export interface IAddressResponse {
  message: string;
  statusCode: number;
}

export interface IAddressDetails {
  id?: number;
  label: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  property_id?: number;
  latitude: string;
  longitude: string;
}
