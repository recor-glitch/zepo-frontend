"use client";

import { usePropertyFormContext } from "@/context/property/property-fom-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const washroomTypes = ["SHARED", "ATTACHED"];

const propertySchema = z
  .object({
    title: z
      .string({ message: "Title is required" })
      .min(1, "Title is required"),
    description: z
      .string({ message: "Description is required" })
      .min(1, "Description is required"),
    propertyType: z
      .string({ message: "Property type is required" })
      .min(1, "Property type is required"),
    washroomType: z.enum(["SHARED", "ATTACHED"]).default("SHARED"),
    beds: z
      .string()
      .nullable()
      .transform((val) => (val === "" ? null : Number(val)))
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "Beds must be a non-negative integer",
      }),
    halls: z
      .string()
      .transform((val) => (val === "" ? null : Number(val)))
      .nullable()
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "halls must be a non-negative integer",
      }),
    kitchens: z
      .string()
      .transform((val) => (val === "" ? null : Number(val)))
      .nullable()
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "kitchens must be a non-negative integer",
      }),
    washrooms: z
      .string()
      .transform((val) => (val === "" ? null : Number(val)))
      .nullable()
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "washrooms must be a non-negative integer",
      }),
    balcony: z
      .string()
      .transform((val) => (val === "" ? null : Number(val)))
      .nullable()
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "balcony must be a non-negative integer",
      }),
  })
  .superRefine((data, ctx) => {
    // Validation for beds
    if (data.propertyType !== "SINGLE" && data.beds === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Beds must be provided when property type is not single",
        path: ["beds"],
      });
    }

    // Validation for halls
    if (data.propertyType !== "SINGLE" && data.halls === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Halls must be provided when property type is not single",
        path: ["halls"],
      });
    }

    // Validation for kitchens
    if (data.propertyType !== "SINGLE" && data.kitchens === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kitchens must be provided when property type is not single",
        path: ["kitchens"],
      });
    }

    // Validation for washrooms
    if (data.washrooms === null || data.washrooms < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Washrooms must be provided",
        path: ["washrooms"],
      });
    }

    // Validation for balcony
    if (data.propertyType !== "SINGLE" && data.balcony === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Balcony must be provided when property type is not single",
        path: ["balcony"],
      });
    }
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

  const router = useRouter();

  const { dispatch } = usePropertyFormContext();

  const onSubmit = (data: PropertyFormData) => {
    console.log(data);
    dispatch({ type: "setActiveStep", payload: { step: 1 } });
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

  const handleOnCancel = () => {
    router.back();
    return;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-default w-full"
    >
      <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
        Property Info
      </p>
      <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full">
        Please provide a comprehensive description of the property, including
        all relevant details such as size, layout, features, and any additional
        information that would help in accurately assessing and understanding
        the property's characteristics and appeal.
      </p>
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
          {errors.title && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.title?.message}
            </p>
          )}
        </div>
        {/* IMAGE */}
        <div
          {...getRootProps()}
          className={`col-span-1 row-span-2 border border-primary border-dashed rounded-lg bg-white flex flex-col gap-default w-full h-full justify-center items-center ${
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
            Property type
          </label>
          <select
            id="property-Type"
            className="p-sm rounded-default text-text-secondary focus:outline-none border"
            {...register("propertyType")}
          >
            {propertyType.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          {errors.propertyType && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.propertyType?.message}
            </p>
          )}
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
          {errors.description && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-default col-span-2">
          <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
            Additional Details
          </p>
          <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full">
            Provide any additional details about the room, including unique
            features, furnishings, amenities, or any other information that
            would help in fully understanding the room's appeal and suitability.
          </p>
          <div className="grid grid-cols-2 gap-default">
            {/* Number of beds */}
            <div className="flex flex-col gap-1 col-span-1">
              <label htmlFor="beds" className="text-text-secondary font-medium">
                Number of bed rooms
              </label>
              <input
                type="number"
                className="p-sm rounded-default focus:outline-none border"
                id="beds"
                {...register("beds")}
                placeholder="Enter the number of bed rooms"
              />
              {errors.beds && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.beds?.message}
                </p>
              )}
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
              {errors.halls && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.halls?.message}
                </p>
              )}
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
              {errors.kitchens && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.kitchens?.message}
                </p>
              )}
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
              {errors.balcony && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.balcony?.message}
                </p>
              )}
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
                {washroomTypes.map((type, idx) => (
                  <option key={type + idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.washroomType && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.washroomType?.message}
                </p>
              )}
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
                defaultValue={1}
                type="number"
                className="p-sm rounded-default focus:outline-none border"
                id="washrooms"
                {...register("washrooms")}
                placeholder="Enter the number of washrooms"
              />
              {errors.washrooms && (
                <p className="text-error text-sm-subtitle font-medium">
                  {errors.washrooms?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-default items-center w-full col-span-2">
          <button className="outlinedBtn" onClick={() => handleOnCancel()}>
            Cancel
          </button>
          <button className="filledBtn" type="submit">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;
