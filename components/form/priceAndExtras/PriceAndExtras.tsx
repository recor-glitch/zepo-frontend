"use client";

import { ChipComponent } from "@/components/chip";
import { usePropertyFormContext } from "@/context/property/property-form/property-fom-context";
import { useUserContext } from "@/context/user/user-context";
import { useFileUpload } from "@/mutation/fileMutation";
import { useCreatePropertyWithAddress } from "@/mutation/propertyMutation";
import { CurrencyType } from "@/type/app";
import { IPropertyDto } from "@/type/dto/property/property-dto";
import { zodResolver } from "@hookform/resolvers/zod";
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
    .string()
    .transform((val) => (val === "" ? null : Number(val)))
    .refine(
      (val) =>
        val !== null && val !== undefined && val > 0 && Number.isInteger(val),
      {
        message: "price must be a non-negative integer",
      }
    ),
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
    setValue,
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

  const { dispatch, propertyInfo, addressDetails, status } =
    usePropertyFormContext();

  const {
    mutateAsync: uploadFn,
    isError: IsfileUploadError,
    data: fileUploadData,
    isPending: fileUploadPending,
    error: fileUploadError,
    isSuccess: IsFileUploadSuccess,
  } = useFileUpload();

  const {
    mutateAsync: createPropertyFn,
    error: PropertyError,
    isError: IsPropertyError,
    isPending: IsPropertyPending,
    data: PropertyData,
    context: PropertyContext,
    isSuccess: IsPropertySuccess,
  } = useCreatePropertyWithAddress();

  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (status === "EDIT" && propertyInfo) {
      setValue("price", propertyInfo.amount || 0);
      setValue("length", propertyInfo.property_length || 0);
      setValue("width", propertyInfo.property_width || 0);
    }
  }, [status, propertyInfo]);

  const onSubmit = async (data: PriceAndEntrasFormData) => {
    const formData = new FormData();

    // PROPERTY FORM
    propertyInfo?.images.forEach((file) => {
      formData.append("files", file);
    });
    const fileRes = await uploadFn({ files: formData });

    if (fileRes.statusCode !== 200) {
      toast.error("file upload failed, please try again");
      return;
    }

    if (propertyInfo && addressDetails) {
      const propertyDetails: IPropertyDto = {
        title: propertyInfo?.title,
        amenities: amenities,
        description: propertyInfo?.description,
        images: [...fileRes.urls.map((res) => res.URL)],
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
        rules: propertyInfo.rules ?? [],
      };

      const propertyRes = await createPropertyFn({
        property: {
          ...propertyDetails,
          images: [...fileRes.urls.map((url) => url.URL)],
        },
        address: addressDetails,
      });
      if (propertyRes.statusCode !== 201) {
        toast.error("something went wrong");
        return;
      }

      dispatch({
        type: "setPropertyInfo",
        payload: {
          ...propertyDetails,
          images: propertyInfo?.images,
        },
      });

      router.back();
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
          <button className="filledBtn" type="submit">
            {fileUploadPending || IsPropertyPending ? (
              <IconLoader className="animate-spin text-white" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PriceAndEntrasForm;
