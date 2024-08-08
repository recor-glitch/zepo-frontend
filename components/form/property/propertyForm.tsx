"use client";

import { PropertyStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const propertySteps = [
  { title: "Property info" },
  { title: "Address details" },
  { title: "Benefits & Extras" },
];

const propertySchema = z.object({
  description: z.string({ message: "description is required" }),
  price: z.number({ message: "price is required" }),
  propertyType: z.string({ message: "type is required" }),
  title: z.string({ message: "title is required " }),
  washroom: z.number().min(1),
  washroomType: z.string({ message: "type is required" }).default("SHARED"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const propertyType = ["SINGLE", "DOUBLE", "BHK", "VILLA", "SHARED"];

const PropertyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = (data: PropertyFormData) => {
    console.log(data);
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <div className="flex flex-col justify-center gap-default items-center w-full">
      <PropertyStepper activeStep={0} steps={propertySteps} />
      <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
        Property Info
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-default w-full"
      >
        <div className="grid grid-cols-2 grid-rows-3 gap-default">
          {/* TITLE */}
          <div className="flex flex-col gap-1 col-span-1">
            <label htmlFor="title" className="text-text-secondary font-medium">
              Title
            </label>
            <input
              className="p-sm rounded-default focus:outline-none"
              type="text"
              id="title"
              {...register("title")}
              placeholder="Enter your title"
            />
            {errors.title && <p>{errors.title?.message}</p>}
          </div>
          {/* IMAGE */}
          <div className="col-span-1 row-span-3 border border-dashed rounded-lg border-text-secondary flex flex-col gap-default w-full h-full justify-center items-center">
            <IconPlus className="text-text-secondary" />
            <p className="text-text-secondary text-sm-subtitle font-medium ">
              Add property images
            </p>
          </div>
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1 col-span-1">
            <label
              htmlFor="description"
              className="text-text-secondary font-medium"
            >
              Description
            </label>
            <input
              className="p-sm rounded-default focus:outline-none"
              type="text"
              id="description"
              {...register("description")}
              placeholder="Enter something about your property"
            />
            {errors.description && <p>{errors.description?.message}</p>}
          </div>
          {/* PROPERTY TYPE */}
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="property-Type"
              className="text-text-secondary font-medium"
            >
              Property type
            </label>
            <select
              id="property-Type"
              className="p-sm rounded-default text-text-secondary focus:outline-none"
            >
              {propertyType.map((type) => (
                <option value={type}>{type.toLowerCase()}</option>
              ))}
            </select>
            {errors.description && <p>{errors.description?.message}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
