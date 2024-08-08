import { PropertyForm } from "@/components/form";
import { UsePropertyFormContextProvider } from "@/context/property/property-fom-context";
import React from "react";

const PropertyListingPage = () => {
  return (
    <UsePropertyFormContextProvider>
      <div className="flex flex-col h-full justify-center items-center gap-default">
        <div className="flex flex-col gap-default w-1/2 items-center">
          <p className="text-md-title font-bold text-text-primary">
            List your Property
          </p>
          <p className="text-md-subtitle-secondary font-medium text-text-primary">
            List your Property with us, connect with potential renters
          </p>
          <PropertyForm />
        </div>
      </div>
    </UsePropertyFormContextProvider>
  );
};

export default PropertyListingPage;
