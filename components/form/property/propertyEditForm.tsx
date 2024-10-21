"use client";

import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import { useUserContext } from "@/context/user/user-context";
import { WashRoomType } from "@/type/app";
import { IPropertyFormDto } from "@/type/dto/property/property-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";
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
      .array(z.union([z.string(), z.instanceof(File)]), {
        required_error: "File is required",
      })
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

const PropertyEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const { dispatch, addressDetails, status, propertyInfo, extras } =
    usePropertyFormContext();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [imageMapping, setImageMapping] = useState<Record<string, File>>({});

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
      setValue("files", propertyInfo?.images ?? []);

      if (propertyInfo.images.some((img) => typeof img === "string")) {
        setAcceptedFiles((prev) =>
          propertyInfo?.images.filter((img) => typeof img !== "string")
        );

        const newFileMappings: Record<string, File> = {};
        const updatedList: string[] = propertyInfo?.images.map((img, idx) => {
          if (typeof img === "string") return img;
          else {
            const url = URL.createObjectURL(img);
            newFileMappings[url] = propertyInfo.images[idx] as File;
            return url;
          }
        });

        setImageMapping(newFileMappings);
        setImageSrc(updatedList);
      } else setAcceptedFiles(propertyInfo?.images as File[]);
    }

    return () => {
      setImageSrc([]);
      setAcceptedFiles([]);
      setImageMapping({});
    };
  }, [status, propertyInfo]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (accFiles, regFiles, event) => {
      const newFileMappings: Record<string, File> = {};
      const newImages: string[] = [];

      accFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        newFileMappings[url] = file;
        newImages.push(url);
      });

      setAcceptedFiles((prev) => [...prev, ...accFiles]);
      setImageMapping((prev) => ({ ...prev, ...newFileMappings }));
      setImageSrc((prev) => [...newImages, ...prev]);
    },
  });

  const { user } = useUserContext();

  const onSubmit = async (data: PropertyFormData) => {
    console.log(data);
    const propertyDetails: IPropertyFormDto = {
      ...propertyInfo,
      id: propertyInfo?.id,
      title: data.title,
      amenities: propertyInfo?.amenities ?? [],
      description: data.description,
      images: propertyInfo?.images.some((img) => typeof img === "string")
        ? [
            ...acceptedFiles,
            ...propertyInfo.images.filter(
              (img) => typeof img === "string" && imageSrc.includes(img)
            ),
          ]
        : acceptedFiles,
      is_popular: propertyInfo?.is_popular ?? false,
      like_count: propertyInfo?.like_count ?? 0,
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

  const handleRemovePhotos = (file: string) => {
    dispatch({
      type: "setRemovedUrlInExtras",
      payload: { urls: [...(extras?.removedUrls || []), file] },
    });

    setImageSrc((prev) => [...prev.filter((img) => img !== file)]);

    if (file.includes("blob")) {
      const { [file]: _, ...updatedMap } = imageMapping;
      const updatedFiles = acceptedFiles.filter((f) => {
        if (Object.values(updatedMap).includes(f)) return true;
        else return false;
      });

      setAcceptedFiles(updatedFiles);
      setImageMapping(updatedMap);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-default w-full"
    >
      <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
        Property Info
      </p>
      <div className="flex flex-col gap-default">
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
            className="p-sm h-24 rounded-default focus:outline-none border"
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
        {/* IMAGE */}
        <div className="flex flex-col gap-default col-span-1 row-span-2">
          <div className="flex flex-col gap-default h-full">
            <div
              {...getRootProps()}
              className={`border border-primary cursor-pointer border-dashed rounded-lg bg-white flex flex-col flex-1 justify-center items-center ${
                isDragActive ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex gap-default w-full justify-center items-center my-10">
                <input {...register("files")} {...getInputProps()} />
                <IconPlus className="text-text-secondary" />
                <p className="text-text-secondary text-sm-subtitle font-medium">
                  {isDragActive
                    ? "Drop the files here ..."
                    : "Add property images"}
                </p>
              </div>
            </div>
            {/* PREVIEW */}
            {imageSrc.length !== 0 && (
              <div className="flex flex-col gap-default w-full items-center">
                {imageSrc?.map((file, index) => {
                  return (
                    <div
                      className="relative h-16 w-full rounded-lg overflow-hidden border-2"
                      key={file + index}
                    >
                      <div
                        className="absolute right-1 top-1 flex justify-center items-center rounded-full border"
                        onClick={() => handleRemovePhotos(file)}
                      >
                        <IconX className="text-text-primary" />
                      </div>
                      <Image
                        className="rounded-default"
                        src={file}
                        alt="Preview Images"
                        height={50}
                        width={100}
                      />
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
        <div className="flex flex-col gap-default col-span-2">
          <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
            Additional Details
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
          <DialogClose>
            <button className="outlinedBtn">Cancel</button>
          </DialogClose>
          <button className="filledBtn" type="submit">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyEditForm;
