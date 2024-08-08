"use client";

import { PropertyStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const propertySteps = [
  { title: "Property info" },
  { title: "Address details" },
  { title: "Benefits & Extras" },
];

const pricePeriods = ["DAILY", "MONTHLY", "YEARLY"];
const washroomTypes = ["SHARED", "ATTACHED"];

const propertySchema = z.object({
  description: z.string({ message: "description is required" }),
  propertyType: z.string({ message: "type is required" }),
  title: z.string({ message: "title is required " }),
  washroom: z.number().min(1),
  washroomType: z.string({ message: "type is required" }).default("SHARED"),
  beds: z.number().nullable(),
  halls: z.number().nullable(),
  kitchens: z.number().nullable(),
  washrooms: z.number().nullable(),
  balcony: z.number().nullable(),
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

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
        <div className="grid grid-cols-2 grid-rows-2 gap-default">
          {/* TITLE */}
          <div className="flex flex-col gap-1 col-span-1">
            <label htmlFor="title" className="text-text-secondary font-medium">
              Title *
            </label>
            <input
              className="p-sm rounded-default focus:outline-none border"
              type="text"
              id="title"
              {...register("title")}
              placeholder="Enter your title"
            />
            {errors.title && <p>{errors.title?.message}</p>}
          </div>
          {/* IMAGE */}
          <div
            {...getRootProps()}
            className={`col-span-1 row-span-2 border border-dashed rounded-lg bg-white border-text-secondary flex flex-col gap-default w-full h-full justify-center items-center ${
              isDragActive ? "bg-gray-100" : ""
            }`}
          >
            <input {...getInputProps()} />
            <IconPlus className="text-text-secondary" />
            <p className="text-text-secondary text-sm-subtitle font-medium">
              {isDragActive ? "Drop the files here ..." : "Add property images"}
            </p>
          </div>
          {/* PROPERTY TYPE */}
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="property-Type"
              className="text-text-secondary font-medium"
            >
              Property type *
            </label>
            <select
              id="property-Type"
              className="p-sm rounded-default text-text-secondary focus:outline-none border"
              {...register("propertyType")}
            >
              {propertyType.map((type) => (
                <option value={type}>{type.toLowerCase()}</option>
              ))}
            </select>
            {errors.description && <p>{errors.description?.message}</p>}
          </div>
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1 col-span-2">
            <label
              htmlFor="description"
              className="text-text-secondary font-medium"
            >
              Description *
            </label>
            <textarea
              className="p-sm rounded-default focus:outline-none border"
              id="description"
              {...register("description")}
              placeholder="Enter something about your property"
            />
            {errors.description && <p>{errors.description?.message}</p>}
          </div>
          <div className="flex flex-col gap-default col-span-2">
            <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
              Details
            </p>
            <div className="grid grid-cols-2 gap-default">
              {/* Number of beds */}
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="beds"
                  className="text-text-secondary font-medium"
                >
                  Number of bed rooms
                </label>
                <input
                  type="number"
                  className="p-sm rounded-default focus:outline-none border"
                  id="beds"
                  {...register("beds")}
                  placeholder="Enter the number of bed rooms"
                />
                {errors.beds && <p>{errors.beds?.message}</p>}
              </div>
              {/* Number of halls */}
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="halls"
                  className="text-text-secondary font-medium"
                >
                  Number of halls
                </label>
                <input
                  type="number"
                  className="p-sm rounded-default focus:outline-none border"
                  id="halls"
                  {...register("halls")}
                  placeholder="Enter the number of halls"
                />
                {errors.halls && <p>{errors.halls?.message}</p>}
              </div>
              {/* Number of kitchens */}
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="kitchens"
                  className="text-text-secondary font-medium"
                >
                  Number of kitchens
                </label>
                <input
                  type="number"
                  className="p-sm rounded-default focus:outline-none border"
                  id="kitchens"
                  {...register("kitchens")}
                  placeholder="Enter the number of kitchens"
                />
                {errors.kitchens && <p>{errors.kitchens?.message}</p>}
              </div>
              {/* Number of balcony */}
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="balcony"
                  className="text-text-secondary font-medium"
                >
                  Number of balcony
                </label>
                <input
                  type="number"
                  className="p-sm rounded-default focus:outline-none border"
                  id="balcony"
                  {...register("balcony")}
                  placeholder="Enter the number of balcony"
                />
                {errors.balcony && <p>{errors.balcony?.message}</p>}
              </div>
              {/* WASHROOM TYPE */}
              <div className="flex flex-col gap-1 flex-1">
                <label
                  htmlFor="washroom-Type"
                  className="text-text-secondary font-medium"
                >
                  washroom type *
                </label>
                <select
                  id="washroom-Type"
                  className="p-sm rounded-default text-text-secondary focus:outline-none border"
                  {...register("washroomType")}
                >
                  {washroomTypes.map((type) => (
                    <option value={type}>{type.toLowerCase()}</option>
                  ))}
                </select>
                {errors.description && <p>{errors.description?.message}</p>}
              </div>
              {/* Number of washrooms */}
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="washrooms"
                  className="text-text-secondary font-medium"
                >
                  Number of washrooms *
                </label>
                <input
                  type="number"
                  className="p-sm rounded-default focus:outline-none border"
                  id="washrooms"
                  {...register("washrooms")}
                  placeholder="Enter the number of washrooms"
                />
                {errors.washrooms && <p>{errors.washrooms?.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
