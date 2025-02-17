"use client";

import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import { useGetPropertyById } from "@/query/propertyQuery";
import { IAddressDetails } from "@/type/dto/address/address-dto";
import { IPropertyFormDto } from "@/type/dto/property/property-dto";
import { useEffect } from "react";
import AddressEditForm from "../address/addressEditForm";
import PriceAndExtrasEditForm from "../priceAndExtras/priceAdnExtrasEditForm";
import PropertyEditForm from "../property/propertyEditForm";

const propertySteps = [
  { title: "Property info" },
  { title: "Address details" },
  { title: "Price & Extras" },
];

const PropertyEditFormWrapper = ({ id }: { id: string }) => {
  const { activeStep, dispatch, propertyInfo, addressDetails } =
    usePropertyFormContext();

  const {
    data: propertyData,
    isSuccess,
    refetch,
  } = useGetPropertyById({
    id: id,
    option: {
      enabled: id !== null || id !== undefined,
      queryKey: ["getProperty", id],
    },
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

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

  console.log(propertyInfo, addressDetails);

  return (
    <div className="flex flex-col justify-center gap-default items-center w-full">
      {activeStep === 0 ? (
        <PropertyEditForm />
      ) : activeStep === 1 ? (
        <AddressEditForm />
      ) : (
        <PriceAndExtrasEditForm />
      )}
    </div>
  );
};

export default PropertyEditFormWrapper;
