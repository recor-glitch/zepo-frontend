"use client";

import { PropertyStepper } from "@/components/stepper";
import { useGetPropertyById } from "@/query/propertyQuery";
import { IAddressDetails } from "@/type/dto/address/address-dto";
import { IPropertyFormDto } from "@/type/dto/property/property-dto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddressFom from "../address/addressForm";
import PriceAndEntrasForm from "../priceAndExtras/PriceAndExtras";
import PropertyForm from "../property/propertyForm";
import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";

const propertySteps = [
  { title: "Property info" },
  { title: "Address details" },
  { title: "Price & Extras" },
];

const PropertyFormWrapper = () => {
  const { activeStep } = usePropertyFormContext();

  return (
    <div className="flex flex-col justify-center gap-default items-center w-full">
      <div className="hidden lg:flex">
        <PropertyStepper steps={propertySteps} />
      </div>
      {activeStep === 0 ? (
        <PropertyForm />
      ) : activeStep === 1 ? (
        <AddressFom />
      ) : (
        <PriceAndEntrasForm />
      )}
    </div>
  );
};

export default PropertyFormWrapper;
