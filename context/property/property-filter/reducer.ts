import { propertyFilterContentDto } from "@/type/app";
import { IPropertyFiltersDto } from "@/type/dto/property/property-dto";
import { Action as FilterAction } from "./action";

export const PropertyFilterReducer = (
  state: propertyFilterContentDto,
  action: FilterAction
): propertyFilterContentDto => {
  switch (action.type) {
    case "clearPropertyFilter":
      return { dispatch: state.dispatch, filters: { limit: 10, cursor: 0 } };
    case "setPropertyFilter":
      const newFilters: Record<
        string,
        number | string | undefined | string[] | number[]
      > = {
        cursor: 0,
        limit: 10,
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
