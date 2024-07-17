"use client";

import { userContextDto } from "@/type/app";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { userReducer } from "./reducer";
import { AccessTokenStorage } from "@/utils/access-token-storage/access-token-storage";

const initialValue: userContextDto = {
  accessToken: "",
  user: {
    id: "",
    email: "",
    image: "",
    name: "",
  },
  dispatch: () => {},
};

const customUserContext = createContext<userContextDto>(initialValue);

export function useUserContext() {
  const context = useContext<userContextDto>(customUserContext);
  if (!context)
    throw new Error("Component must be a child of UseUserContextProvider");
  return context;
}

export function UserContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(userReducer, initialValue);

  useEffect(() => {
    AccessTokenStorage.setAccessToken(state.accessToken || "");
  }, [state]);

  return (
    <customUserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </customUserContext.Provider>
  );
}
