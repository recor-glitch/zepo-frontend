import { userContextDto } from "@/type/app";
import { Action } from "./action";

export const userReducer = (
  state: userContextDto,
  action: Action
): userContextDto => {
  switch (action.type) {
    case "setAccessToken":
      return { ...state, accessToken: action.payload.access_token };
    case "setUser":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
  return state;
};
