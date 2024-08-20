"use client";

import { userContextDto } from "@/type/app";
import { AccessTokenStorage } from "@/utils/access-token-storage/access-token-storage";
import { useSession } from "next-auth/react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { userReducer } from "./reducer";

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
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({
        type: "setUser",
        payload: {
          email: session.profile?.email,
          id: session.profile?.sub,
          image: session.profile?.picture,
          name: session.profile?.name,
        },
      });
    }
  }, [session]);

  useEffect(() => {
    AccessTokenStorage.setAccessToken(session?.profile?.accessToken || "");
  }, [session]);

  return (
    <customUserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </customUserContext.Provider>
  );
}
