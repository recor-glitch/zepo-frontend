"use client";

import { ChipComponent } from "@/components/chip";
import { usePropertyFormContext } from "@/context/property/property-fom-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const priceAndExtraSchema = z.object({
  period: z.enum(["DAILY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
  unit: z.enum(["FEET", "METER"]).default("METER"),
  currency: z.enum(["INR", "USD"]).default("INR"),
  price: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : Number(val)))
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "price must be a non-negative integer",
    }),
  width: z
    .string()
    .transform((val) => (val === "" ? null : Number(val)))
    .nullable()
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "width must be a non-negative integer",
    }),
  length: z
    .string()
    .transform((val) => (val === "" ? null : Number(val)))
    .nullable()
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "height must be a non-negative integer",
    }),
});

type PriceAndEntrasFormData = z.infer<typeof priceAndExtraSchema>;

const PriceAndEntrasForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceAndEntrasFormData>({
    resolver: zodResolver(priceAndExtraSchema),
  });

  const [amenitiestxt, setAmenitiestxt] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleAddAmenities = () => {
    setAmenities((prev) => [...prev, ...amenitiestxt.split(",")]);
    setAmenitiestxt("");
  };

  const { dispatch } = usePropertyFormContext();

  const onSubmit = (data: PriceAndEntrasFormData) => {
    console.log(data);
    // Handle form submission (e.g., send data to an API)
  };

  const handleOnBack = () => {
    dispatch({ type: "setActiveStep", payload: { step: 1 } });
    return;
  };

  const handleUnselected = (idx: number) => {
    setAmenities((prev) => [...prev.filter((amenity, index) => idx !== index)]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-default w-full"
    >
      <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
        Pricing and Extras
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-default">
        {/* CURRENCY */}
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="property-Type"
            className="text-text-secondary font-medium"
          >
            select your currency
          </label>
          <select
            id="property-Type"
            className="p-sm rounded-default text-text-secondary focus:outline-none border"
            {...register("currency")}
          >
            {["INR", "USD"].map((type, idx) => (
              <option key={type + idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.currency && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.currency?.message}
            </p>
          )}
        </div>
        {/* PRICE */}
        <div className="flex flex-col gap-1 col-span-1">
          <label htmlFor="title" className="text-text-secondary font-medium">
            Price
          </label>
          <input
            className="p-sm rounded-default focus:outline-none border"
            type="text"
            id="title"
            {...register("price")}
            placeholder="Enter your price"
          />
          {errors.price && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.price?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-default col-span-2">
          <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
            Additional Details
          </p>
          <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full">
            Provide detailed information on the property's size and dimensions
            to ensure that it aligns perfectly with your needs and preferences,
            allowing for a more precise match to your specifications.
          </p>
        </div>
        {/* UNIT */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="unit" className="text-text-secondary font-medium">
            select your unit
          </label>
          <select
            id="unit"
            className="p-sm rounded-default text-text-secondary focus:outline-none border"
            {...register("unit")}
          >
            {["FEET", "METER"].map((type, idx) => (
              <option key={type + idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.unit?.message}
            </p>
          )}
        </div>
        {/* PROPERTY LENGTH */}
        <div className="flex flex-col gap-1">
          <label htmlFor="length" className="text-text-secondary font-medium">
            length
          </label>
          <input
            type="number"
            className="p-sm rounded-default focus:outline-none border"
            id="length"
            {...register("length")}
            placeholder="Enter the property length"
          />
          {errors.length && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.length?.message}
            </p>
          )}
        </div>
        {/* PROPERTY WIDTH */}
        <div className="flex flex-col gap-1 col-span-1">
          <label htmlFor="beds" className="text-text-secondary font-medium">
            width
          </label>
          <input
            type="number"
            className="p-sm rounded-default focus:outline-none border"
            id="width"
            {...register("width")}
            placeholder="Enter the property width"
          />
          {errors.width && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.width?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-default col-span-2">
          <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
            Extras
          </p>
          <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full">
            Provider the amenities you desire, including any specific features
            or facilities, to ensure that the property you select fully meets
            your expectations and enhances your living experience.
          </p>
        </div>
        <div className="w-full col-span-2 grid grid-cols-5 gap-default">
          <input
            value={amenitiestxt}
            type="text"
            className="p-sm rounded-default focus:outline-none border col-span-4"
            id="amenities"
            onChange={(e) => setAmenitiestxt(e.target.value)}
            // {...register("length")}
            placeholder="Enter the property amenities that are available"
          />
          <button
            className="filledBtn col-span-1"
            onClick={() => handleAddAmenities()}
          >
            Add
          </button>
        </div>
        <div className="grid gap-default grid-cols-5 col-span-2">
          {amenities?.map((chip, idx) => (
            <ChipComponent
              text={chip}
              handleUnselected={() => handleUnselected(idx)}
            />
          ))}
        </div>
        <div className="flex justify-end gap-default items-center w-full col-span-2">
          <button className="outlinedBtn" onClick={() => handleOnBack()}>
            Back
          </button>
          <button className="filledBtn" type="submit">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default PriceAndEntrasForm;
