import { propertyContextDto } from "@/type/app";
import { Action } from "./action";
import { object } from "zod";
import { IPropertyDto } from "@/type/dto/property/property-dto";

export const propertyReducer = (
  state: propertyContextDto,
  action: Action
): propertyContextDto => {
  switch (action.type) {
    case "setActiveStep":
      return { ...state, activeStep: action.payload.step };
    case "setPropertyInfo":
      return { ...state, propertyInfo: action.payload };
    case "setAdressDetails":
      return { ...state, addressDetails: action.payload };
    case "setFormStatus":
      return { ...state, status: action.payload.status };
    case "setUpdatePropertyInfo":
      const updatedProperties = {} as Record<string, any>;

      Object.keys(action.payload).forEach((key) => {
        const currentValue = action.payload[key as keyof typeof action.payload];
        const previousValue = state.propertyInfo
          ? state.propertyInfo[key as keyof typeof state.propertyInfo]
          : undefined;

        if (currentValue) updatedProperties[key] = currentValue;
        else updatedProperties[key] = previousValue;
      });

      return { ...state, propertyInfo: updatedProperties as IPropertyDto };
    case "setRemovedUrlInExtras":
      return {
        ...state,
        extras: { ...state.extras, removedUrls: action.payload.urls },
      };
    default:
      return state;
  }
};
