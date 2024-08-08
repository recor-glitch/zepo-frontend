import { propertyContextDto } from "@/type/app";
import { Action } from "./action";

export const propertyReducer = (
  state: propertyContextDto,
  action: Action
): propertyContextDto => {
  switch (action.type) {
    case "setPropertyInfo":
      return state;
    default:
      return state;
  }
  return state;
};
