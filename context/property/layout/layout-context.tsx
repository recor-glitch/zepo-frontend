"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context structure
interface LayoutContextType {
  isGrid: boolean;
  toggleLayout: (isGrid: boolean) => void;
}

// Create context with default values
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isGrid, setIsGrid] = useState(true);

  const toggleLayout = (isGrid: boolean) => {
    setIsGrid(isGrid);
  };

  return (
    <LayoutContext.Provider value={{ isGrid, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for accessing the layout context
export const usePropertyLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
