import { propertyContextDto } from "@/type/app";
import { Action } from "./action";

export const propertyReducer = (
  state: propertyContextDto,
  action: Action
): propertyContextDto => {
  switch (action.type) {
    case "setActiveStep":
      return { ...state, activeStep: action.payload.step };
    default:
      return state;
  }
  return state;
};
