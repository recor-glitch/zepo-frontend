import { propertyFilterContentDto } from "@/type/app";
import { Action as FilterAction } from "./action";
import { IPropertyFiltersDto } from "@/type/dto/property/property-dto";

export const PropertyFilterReducer = (
  state: propertyFilterContentDto,
  action: FilterAction
): propertyFilterContentDto => {
  switch (action.type) {
    case "clearPropertyFilter":
      return { dispatch: state.dispatch, filters: { limit: 1, cursor: 0 } };
    case "setPropertyFilter":
      const newFilters: Record<string, number | string | undefined> = {
        cursor: 0,
        limit: 1,
      };

      const keys = Object.keys(action.payload) as (keyof IPropertyFiltersDto)[];
      if (keys.length === 0) return state;

      keys.forEach((key) => {
        newFilters[key] = action.payload[key] || state.filters[key];
      });

      return { ...state, filters: { ...state.filters, ...newFilters } };
    default:
      return state;
  }
};