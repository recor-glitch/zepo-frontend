import { propertyContextDto } from "@/type/app";
import { Action } from "./action";

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
    default:
      return state;
  }
};
