"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

interface IdrawerContext {
  trigger: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const initialValue = {
  trigger: () => {},
  isOpen: false,
};

const customDrawerContext = createContext<IdrawerContext>(initialValue);

export function useDrawerContext() {
  const context = useContext<IdrawerContext>(customDrawerContext);
  if (!context)
    throw new Error("Component must be a child of UseDrawerContextProvider");
  return context;
}

export function UseDrawerContextProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log("I am here at drawer context", { isOpen });

  return (
    <customDrawerContext.Provider
      value={{
        trigger: setIsOpen,
        isOpen: isOpen,
      }}
    >
      {children}
    </customDrawerContext.Provider>
  );
}
