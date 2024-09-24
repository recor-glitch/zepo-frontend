"use client";

import { PropertyStepper } from "@/components/stepper";
import { usePropertyFormContext } from "@/context/property/property-fom-context";
import { useGetPropertyById } from "@/query/propertyQuery";
import { IAddressDetails } from "@/type/dto/address/address-dto";
import { IPropertyFormDto } from "@/type/dto/property/property-dto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddressFom from "../address/addressForm";
import PriceAndEntrasForm from "../priceAndExtras/PriceAndExtras";
import PropertyForm from "../property/propertyForm";

const propertySteps = [
  { title: "Property info" },
  { title: "Address details" },
  { title: "Price & Extras" },
];

const PropertyFormWrapper = () => {
  const { activeStep, dispatch, propertyInfo, addressDetails } =
    usePropertyFormContext();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const edit = searchParams.get("edit");

  const { data: propertyData, isSuccess } = useGetPropertyById({
    id: id ?? "",
    option: {
      enabled: id !== null || id !== undefined,
      queryKey: ["getProperty", id],
    },
  });

  useEffect(() => {
    if (isSuccess && isSuccess === true && propertyData && propertyData.data) {
      const data = propertyData.data;
      dispatch({
        type: "setPropertyInfo",
        payload: {
          ...(data?.property as IPropertyFormDto),
          amenities: data.property.amenities ?? [],
        },
      });

      dispatch({
        type: "setAdressDetails",
        payload: { ...(data?.address as IAddressDetails) },
      });

      dispatch({ type: "setFormStatus", payload: { status: "EDIT" } });
    }
  }, [propertyData]);

  console.log({ propertyInfo, addressDetails });

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
