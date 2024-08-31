"use client";

import { usePropertyFormContext } from "@/context/property/property-fom-context";
import { useUserContext } from "@/context/user/user-context";
import { WashRoomType } from "@/type/app";
import { IPropertyFormDto } from "@/type/dto/property/property-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
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
    files: z
      .array(z.instanceof(File), { required_error: "File is required" })
      .min(1, "File is required"),
    washroomType: z.enum(["SHARED", "ATTACHED"]).default("SHARED"),
    beds: z
      .number()
      .nullable()
      .transform((val) => Number(val))
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "Beds must be a non-negative integer",
      }),
    halls: z
      .number()
      .nullable()
      .transform((val) => Number(val))
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "halls must be a non-negative integer",
      }),
    kitchens: z
      .number()
      .nullable()
      .transform((val) => Number(val))
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "kitchens must be a non-negative integer",
      }),
    washrooms: z
      .number()
      .default(1)
      .transform((val) => Number(val))
      .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
        message: "washrooms must be a non-negative integer",
      }),
    balcony: z
      .number()
      .nullable()
      .transform((val) => Number(val))
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
    setValue,
    control,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const router = useRouter();

  const { dispatch, addressDetails, status, propertyInfo } =
    usePropertyFormContext();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (status === "EDIT" && propertyInfo) {
      setValue("title", propertyInfo?.title!);
      setValue("description", propertyInfo?.description!);
      setValue("propertyType", propertyInfo?.property_type!);
      setValue("washroomType", propertyInfo?.washroom_type! as WashRoomType);
      setValue("washrooms", propertyInfo?.washroom_count ?? 1);
      setValue("kitchens", propertyInfo?.kitchen ?? 0);
      setValue("beds", propertyInfo?.bed ?? 0);
      setValue("halls", propertyInfo?.hall ?? 0);
      setValue("balcony", propertyInfo?.balcony ?? 0);
      setAcceptedFiles(propertyInfo?.images as File[]);
    }
  }, [status, propertyInfo]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (accFiles, regFiles, event) => {
      setAcceptedFiles((prev) => [...prev, ...accFiles]);
    },
  });

  const { user } = useUserContext();

  const onSubmit = async (data: PropertyFormData) => {
    console.log(data);
    const propertyDetails: IPropertyFormDto = {
      title: data.title,
      amenities: [],
      description: data.description,
      images: acceptedFiles,
      is_popular: false,
      like_count: 0,
      property_type: data.propertyType,
      washroom_count: data.washrooms ?? 1,
      washroom_type: data.washroomType,
      host_id: user.id,
      balcony: data.balcony ?? undefined,
      bed: data.beds ?? undefined,
      hall: data.halls ?? undefined,
      kitchen: data.kitchens ?? undefined,
    };
    dispatch({
      type: "setPropertyInfo",
      payload: { ...propertyDetails },
    });

    dispatch({ type: "setActiveStep", payload: { step: 1 } });
    if (!addressDetails)
      dispatch({ type: "setFormStatus", payload: { status: "DRAFT" } });
  };

  const handleOnCancel = () => {
    router.back();
    return;
  };

  const [imageSrc, setImageSrc] = useState<string[]>([]);

  useEffect(() => {
    setImageSrc([]);
    setValue("files", acceptedFiles, { shouldValidate: false });
    if (acceptedFiles.length === 0) return;
    for (let i = 0; i < acceptedFiles.length; i++) {
      const url = URL.createObjectURL(acceptedFiles[i]); // Create a URL for the file
      setImageSrc((state) => state.concat([url]));
    }
  }, [acceptedFiles]);

  const handleRemovePhotos = (idx: number) => {
    // Update both acceptedFiles and imageSrc in one operation
    setAcceptedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(idx, 1); // Remove the file at the given index
      return updatedFiles;
    });

    setImageSrc((prevSrc) => {
      const updatedSrc = [...prevSrc];
      updatedSrc.splice(idx, 1); // Remove the corresponding image URL at the same index
      return updatedSrc;
    });
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
        <div className="flex flex-col gap-default col-span-1 row-span-2">
          <div className="flex gap-default h-full">
            <div
              {...getRootProps()}
              className={`border border-primary border-dashed rounded-lg bg-white flex flex-col flex-1 gap-default justify-center items-center ${
                isDragActive ? "bg-gray-100" : ""
              }`}
            >
              <input {...register("files")} {...getInputProps()} />
              <IconPlus className="text-text-secondary" />
              <p className="text-text-secondary text-sm-subtitle font-medium">
                {isDragActive
                  ? "Drop the files here ..."
                  : "Add property images"}
              </p>
            </div>
            {/* PREVIEW */}
            {imageSrc.length !== 0 && (
              <div className="flex flex-col gap-default w-1/3 items-center">
                {imageSrc?.map((file, index) => {
                  if (index < 2)
                    return (
                      <div
                        className="relative h-1/3 w-full rounded-lg overflow-hidden border-2"
                        key={file + index}
                      >
                        <div
                          className="absolute right-1 top-1 flex justify-center items-center rounded-full border"
                          onClick={() => handleRemovePhotos(index)}
                        >
                          <IconX className="text-text-primary" />
                        </div>
                        <Image
                          src={file}
                          alt="Preview Images"
                          height={100}
                          width={100}
                        />
                      </div>
                    );
                  else if (index === 2)
                    return (
                      <div
                        className="h-1/3 w-full rounded-lg border-2 flex justify-center items-center"
                        key={file + index}
                      >
                        <IconPlus height={14} width={14} />
                        <p className="font-medium text-text-primary text-md-subtitle-primary">
                          {imageSrc.length - 2}
                        </p>
                      </div>
                    );
                })}
              </div>
            )}
          </div>
          {errors.files && (
            <p className="text-error text-sm-subtitle font-medium">
              {errors.files?.message}
            </p>
          )}
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
            {propertyType.map((type, idx) => (
              <option value={type} key={type + idx}>
                {type}
              </option>
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

              <Controller
                control={control}
                name="beds"
                render={({ field }) => (
                  <input
                    type="number"
                    className="p-sm rounded-default focus:outline-none border"
                    id="beds"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter the number of bed rooms"
                  />
                )}
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
              <Controller
                control={control}
                name="halls"
                render={({ field }) => (
                  <input
                    type="number"
                    className="p-sm rounded-default focus:outline-none border"
                    id="halls"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter the number of halls"
                  />
                )}
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

              <Controller
                control={control}
                name="kitchens"
                render={({ field }) => (
                  <input
                    type="number"
                    className="p-sm rounded-default focus:outline-none border"
                    id="kitchens"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter the number of kitchens"
                  />
                )}
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

              <Controller
                control={control}
                name="balcony"
                render={({ field }) => (
                  <input
                    type="number"
                    className="p-sm rounded-default focus:outline-none border"
                    id="balcony"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter the number of halls"
                  />
                )}
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

              <Controller
                control={control}
                name="washrooms"
                render={({ field }) => (
                  <input
                    type="number"
                    className="p-sm rounded-default focus:outline-none border"
                    id="washrooms"
                    {...field}
                    value={field.value || 1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter the number of washrooms"
                  />
                )}
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
