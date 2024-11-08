type SetPropertyFilter = {
  type: "setPropertyFilter";
  payload: ISetPropertyFilter;
};

type ClearPropertyFilter = {
  type: "clearPropertyFilter";
  payload: {};
};

// PAYLOAD
interface ISetPropertyFilter {
  limit?: number;
  cursor?: number;
  city?: string;
  low_to_high?: number;
  property_type?: string[];
  max_price?: number;
  min_price?: number;
  rating?: number;
  beds?: number[];
  search?: string;
}

export type Action = SetPropertyFilter | ClearPropertyFilter;
