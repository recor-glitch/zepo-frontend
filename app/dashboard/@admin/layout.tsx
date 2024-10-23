import { UsePropertyFilterContextProvider } from "@/context/property/property-filter/property-filter-content";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UsePropertyFilterContextProvider>
      <div className="w-full h-full  flex flex-col flex-1 gap-default">
        {children}
      </div>
    </UsePropertyFilterContextProvider>
  );
};

export default AdminLayout;
