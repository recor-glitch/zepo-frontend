"use client";

import { ChipComponent } from "@/components/chip";
import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import { useUserContext } from "@/context/user/user-context";
import { useUpdateAddress } from "@/mutation/addressMutation";
import { useFileDelete, useFileUpload } from "@/mutation/fileMutation";
import { useUpdateProperty } from "@/mutation/propertyMutation";
import { IPropertyDto } from "@/type/dto/property/property-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const priceAndExtraSchema = z.object({
  period: z.enum(["DAILY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
  unit: z.enum(["FEET", "METER"]).default("METER"),
  currency: z.enum(["INR", "USD"]).default("INR"),
  price: z
    .number()
    .nullable()
    .transform((val) => Number(val))
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "price must be a non-negative integer",
    }),
  width: z
    .number()
    .nullable()
    .transform((val) => Number(val))
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "width must be a non-negative integer",
    }),
  length: z
    .number()
    .nullable()
    .transform((val) => Number(val))
    .refine((val) => val === null || (val >= 0 && Number.isInteger(val)), {
      message: "length must be a non-negative integer",
    }),
});

type PriceAndEntrasFormData = z.infer<typeof priceAndExtraSchema>;

const PriceAndExtrasEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PriceAndEntrasFormData>({
    resolver: zodResolver(priceAndExtraSchema),
  });

  const [amenitiestxt, setAmenitiestxt] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleAddAmenities = () => {
    if (amenitiestxt.length === 0) return;
    setAmenities((prev) => [...prev, ...amenitiestxt.split(",")]);
    setAmenitiestxt("");
  };

  const { dispatch, propertyInfo, addressDetails, extras } =
    usePropertyFormContext();

  console.log({ propertyInfo, addressDetails });

  useEffect(() => {
    if (propertyInfo && addressDetails) {
      setValue("price", propertyInfo.amount ?? 0);
      setValue("length", propertyInfo.property_length ?? 0);
      setValue("width", propertyInfo.property_width ?? 0);
      setAmenities(propertyInfo.amenities);
    }
  }, [propertyInfo, addressDetails]);

  const {
    mutateAsync: deleteFn,
    isError: IsfileUploadError,
    data: fileUploadDeleteData,
    isPending: fileUploadDeletePending,
    error: fileUploadDeleteError,
    isSuccess: IsFileUploadDeleteSuccess,
  } = useFileDelete();

  const {
    mutateAsync: uploadFn,
    isError: IsfileDeleteError,
    data: fileUploadData,
    isPending: fileUploadPending,
    error: fileUploadError,
    isSuccess: IsFileUploadSuccess,
  } = useFileUpload();

  const {
    mutateAsync: updatePropertyFn,
    isPending: IsPropertyUpdatePending,
    isError: IsPropertyUpdateError,
    isSuccess: IsPropertyUpdateSuccess,
  } = useUpdateProperty();

  const {
    mutateAsync: updateAddressFn,
    isPending: IsAddressUpdatePending,
    isError: IsAddressUpdateError,
    isSuccess: IsAddressUpdateSuccess,
  } = useUpdateAddress();

  const router = useRouter();
  const { user } = useUserContext();

  const onSubmit = async (data: PriceAndEntrasFormData) => {
    // DELETE UNWANTED FILES FROM CLOUDINARY
    if (extras) {
      await deleteFn({ urls: extras?.removedUrls });
    }

    const formData = new FormData();

    // PROPERTY FORM
    propertyInfo?.images.forEach((file) => {
      if (typeof file !== "string") formData.append("files", file);
    });

    let newImages: string[] = [];

    if (propertyInfo?.images.some((img) => typeof img !== "string")) {
      try {
        const fileRes = await uploadFn({ files: formData });

        if (fileRes.statusCode !== 200) {
          toast.error("file upload failed, please try again");
          return;
        }

        newImages = [...fileRes.urls.map((url) => url.URL)];
      } catch (e) {
        toast.error(
          "Image you have added is too large, please resize it or try some other alternative"
        );
        return;
      }
    }

    newImages = [
      ...newImages,
      ...(propertyInfo?.images.filter(
        (img) => typeof img === "string"
      ) as string[]),
    ];

    if (propertyInfo && addressDetails) {
      const propertyDetails: IPropertyDto = {
        title: propertyInfo?.title,
        amenities: amenities,
        description: propertyInfo?.description,
        images: newImages,
        is_popular: propertyInfo?.is_popular,
        like_count: propertyInfo?.like_count,
        property_type: propertyInfo?.property_type,
        washroom_count: propertyInfo?.washroom_count ?? 1,
        washroom_type: propertyInfo?.washroom_type,
        host_id: propertyInfo?.id?.toString() ?? user.id,
        balcony: propertyInfo?.balcony ?? undefined,
        bed: propertyInfo?.bed ?? undefined,
        hall: propertyInfo?.hall ?? undefined,
        kitchen: propertyInfo?.kitchen ?? undefined,
        property_length: data.length ?? undefined,
        property_width: data.width ?? undefined,
        amount: data.price ?? undefined,
        currency: data.currency,
        unit: data.unit,
        period: data.period,
      };

      const res = await updatePropertyFn({
        propertyId: propertyInfo.id || -1,
        updateDetails: { ...propertyDetails },
      });

      const addRes = await updateAddressFn({
        ...addressDetails,
        latitude: addressDetails.latitude,
        longitude: addressDetails.longitude,
        id: addressDetails.id!.toString(),
      });

      if (res.statusCode === 200 && addRes.statusCode === 200) {
        toast.success("Successfully updated property");
      }
    }
  };

  const handleOnBack = () => {
    dispatch({ type: "setActiveStep", payload: { step: 1 } });
    dispatch({ type: "setFormStatus", payload: { status: "EDIT" } });
    return;
  };

  const handleUnselected = (idx: number) => {
    setAmenities((prev) => [...prev.filter((_, index) => idx !== index)]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-default w-full"
    >
      <p className="text-md-subtitle-main text-text-primary font-bold items-start w-full">
        Pricing and Extras
      </p>
      <p className="text-md-subtitle-secondary text-text-primary font-medium items-start w-full">
        Provide the full pricing details, including any additional costs or
        fees, as well as information on any included extras or special offers
        that may be available.
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
          <label htmlFor="price" className="text-text-secondary font-medium">
            Price
          </label>
          <input
            className="p-sm rounded-default focus:outline-none border"
            type="number"
            id="price"
            {...register("price", { required: true })}
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
          <label htmlFor="width" className="text-text-secondary font-medium">
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
            type="button"
            className="filledBtn col-span-1"
            onClick={() => handleAddAmenities()}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-default col-span-2">
          {amenities?.map((chip, idx) => (
            <ChipComponent
              text={chip}
              key={chip + idx}
              isSelected={amenities.includes(chip)}
              handleUnselected={() => handleUnselected(idx)}
            />
          ))}
        </div>
        <div className="flex justify-end gap-default items-center w-full col-span-2">
          <button className="outlinedBtn" onClick={() => handleOnBack()}>
            Back
          </button>
          {IsPropertyUpdateSuccess && IsAddressUpdateSuccess ? (
            <DialogClose>
              <button className="outlinedBtn">Continue to dashboard</button>
            </DialogClose>
          ) : (
            <button className="filledBtn" type="submit">
              {fileUploadPending ||
              IsPropertyUpdatePending ||
              IsAddressUpdatePending ? (
                <IconLoader className="animate-spin text-white" />
              ) : (
                "Save Changes"
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PriceAndExtrasEditForm;
