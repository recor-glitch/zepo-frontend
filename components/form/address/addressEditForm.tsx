"use client";

import { MapComponent } from "@/components/map";
import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import { IAddressDetails } from "@/type/dto/address/address-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  label: z
    .string({ message: "address label is required" })
    .min(1, "address label is required"),
  streetAddress: z
    .string({ message: "street address is required" })
    .min(1, "street address is required"),
  city: z.string({ message: "city is required" }).min(1, "city is required"),
  state: z.string({ message: "state is required" }).min(1, "state is required"),
  country: z
    .string({ message: "country is required" })
    .min(1, "country is required"),
  postalCode: z
    .number()
    .min(1, "postal code is required")
    .transform((val) => Number(val))
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "postal code must be a non-negative integer",
    }),
});

type AddressFormData = z.infer<typeof addressSchema>;

const AddressEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  const { dispatch, propertyInfo, status, addressDetails } =
    usePropertyFormContext();

  useEffect(() => {
    if (status === "EDIT" && propertyInfo && addressDetails) {
      setValue("city", addressDetails.city);
      setValue("country", addressDetails.country);
      setValue("label", addressDetails.label);
      setValue("postalCode", Number(addressDetails.postal_code));
      setValue("state", addressDetails.state);
      setValue("streetAddress", addressDetails.street_address);

      setCoords({
        lat: Number(addressDetails.latitude),
        lon: Number(addressDetails.longitude),
      });
    } else navigator.geolocation.getCurrentPosition(onSuccessLocationRetrive);
  }, [status, addressDetails]);

  const onSubmit = async (data: AddressFormData) => {
    const addDetails: IAddressDetails = {
      id: addressDetails?.id,
      city: data.city,
      country: data.country,
      label: data.label,
      latitude: coords.lat.toString(),
      longitude: coords.lon.toString(),
      postal_code: data.postalCode?.toString() ?? "",
      state: data.state,
      street_address: data.streetAddress,
    };

    dispatch({ type: "setAdressDetails", payload: addDetails });
    dispatch({ type: "setActiveStep", payload: { step: 2 } });
  };

  const handleOnBack = () => {
    console.log("Handle back", { status, propertyInfo });
    dispatch({ type: "setActiveStep", payload: { step: 0 } });
    return;
  };

  const onSuccessLocationRetrive = (position: GeolocationPosition) => {
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessLocationRetrive);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-default w-full"
    >
      <div className="grid grid-cols-2 gap-default">
        <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full col-span-2">
          Address Details
        </p>
        <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full col-span-2">
          Kindly provide the full and detailed address, ensuring it includes
          every relevant piece of information needed for accurate
          identification, correspondence, or navigation
        </p>
        {/* ADDRESS LABEL */}
        <div className="flex flex-col gap-1 col-span-1">
          <label htmlFor="title" className="text-text-secondary font-medium">
            Address label *
          </label>
          <input
            className="p-sm rounded-default focus:outline-none border"
            type="text"
            id="title"
            {...register("label")}
            placeholder="Enter your label"
          />
          {errors.label && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.label?.message}
            </p>
          )}
        </div>
        {/* STREET ADDRESS */}
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="property-Type"
            className="text-text-secondary font-medium"
          >
            street address *
          </label>
          <input
            type="text"
            className="p-sm rounded-default focus:outline-none border"
            id="beds"
            {...register("streetAddress")}
            placeholder="Enter your street address"
          />
          {errors.streetAddress && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.streetAddress?.message}
            </p>
          )}
        </div>
        {/* CITY */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-text-secondary font-medium">
            city *
          </label>
          <input
            type="text"
            className="p-sm rounded-default focus:outline-none border"
            id="city"
            {...register("city")}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.city?.message}
            </p>
          )}
        </div>
        {/* STATE */}
        <div className="flex flex-col gap-1 col-span-1">
          <label htmlFor="beds" className="text-text-secondary font-medium">
            state *
          </label>
          <input
            type="text"
            className="p-sm rounded-default focus:outline-none border"
            id="state"
            {...register("state")}
            placeholder="Enter the number of bed rooms"
          />
          {errors.state && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.state?.message}
            </p>
          )}
        </div>
        {/* POSTAL CODE */}
        <div className="flex flex-col gap-1 col-span-1">
          <label
            htmlFor="postalCode"
            className="text-text-secondary font-medium"
          >
            postal code *
          </label>
          <Controller
            control={control}
            name="postalCode"
            render={({ field }) => (
              <input
                type="text"
                className="p-sm rounded-default focus:outline-none border"
                id="postalCode"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="Enter your postal code"
              />
            )}
          />
          {errors.postalCode && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.postalCode?.message}
            </p>
          )}
        </div>
        {/* COUNTRY */}
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="property-Type"
            className="text-text-secondary font-medium"
          >
            select your country
          </label>
          <select
            id="property-Type"
            className="p-sm rounded-default text-text-secondary focus:outline-none border"
            {...register("country")}
          >
            {["India", "US"].map((type, idx) => (
              <option key={type + idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.country?.message}
            </p>
          )}
        </div>
        <div className=" flex flex-col justify-center items-center col-span-2 gap-default min-h-80">
          <MapComponent onLocationSelect={setCoords} defaultPosition={coords} />
          <div className="flex col-span-2 gap-default justify-start items-center w-full">
            <button
              className="outlinedBtn"
              type="button"
              onClick={handleCurrentLocation}
            >
              Current location
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-default items-center w-full col-span-2">
          <button
            className="outlinedBtn"
            type="button"
            onClick={() => handleOnBack()}
          >
            Back
          </button>
          <button className="filledBtn" type="submit">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressEditForm;
