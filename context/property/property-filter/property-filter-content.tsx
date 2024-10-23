"use client";

import { propertyFilterContentDto } from "@/type/app";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { PropertyFilterReducer } from "./reducer";

const initialValue: propertyFilterContentDto = {
  filters: { cursor: 0, limit: 10 },
  dispatch: () => {},
};

const customPropertyFilterContext =
  createContext<propertyFilterContentDto>(initialValue);

export function usePropertyFilterContext() {
  const context = useContext<propertyFilterContentDto>(
    customPropertyFilterContext
  );
  if (!context)
    throw new Error(
      "Component must be a child of usePropertyFilterContextProvider"
    );
  return context;
}

export function UsePropertyFilterContextProvider({
  children,
}: PropsWithChildren) {
  const [state, dispatch] = useReducer(PropertyFilterReducer, initialValue);

  return (
    <customPropertyFilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </customPropertyFilterContext.Provider>
  );
}
