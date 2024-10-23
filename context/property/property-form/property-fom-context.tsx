"use client";

import { propertyContextDto } from "@/type/app";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { propertyReducer } from "./reducer";

const initialValue: propertyContextDto = {
  activeStep: 0,
  status: "DRAFT",
  dispatch: () => {},
};

const customPropertyFormContext =
  createContext<propertyContextDto>(initialValue);

export function usePropertyFormContext() {
  const context = useContext<propertyContextDto>(customPropertyFormContext);
  if (!context)
    throw new Error(
      "Component must be a child of usePropertyFormContextProvider"
    );
  return context;
}

export function UsePropertyFormContextProvider({
  children,
}: PropsWithChildren) {
  const [state, dispatch] = useReducer(propertyReducer, initialValue);

  return (
    <customPropertyFormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </customPropertyFormContext.Provider>
  );
}
