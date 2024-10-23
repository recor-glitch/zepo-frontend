"use client";

import { PropertyStepper } from "@/components/stepper";
import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import AddressFom from "../address/addressForm";
import PriceAndEntrasForm from "../priceAndExtras/PriceAndExtras";
import PropertyForm from "../property/propertyForm";

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
