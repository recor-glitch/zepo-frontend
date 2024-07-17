import { userContextDto } from "@/type/app";
import { Action } from "./action";

export const userReducer = (state: userContextDto, action: Action) => {
  switch (action.type) {
    case "setAccessToken":
      break;
    case "setUser":
      break;
    default:
      return state;
  }
  return state;
};
