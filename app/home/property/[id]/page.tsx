"use client";

import { ImageCarousel } from "@/components/carousel";
import { MapComponent } from "@/components/map";
import { ReadMoreComponent } from "@/components/typography";
import { RulesIconMap, rupee } from "@/constants";
import BedIcon from "@/public/bed-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import { useGetPropertyById } from "@/query/propertyQuery";
import { IPropertyRuleWithIcon } from "@/type/dto/property/property-dto";
import {
  IconAdjustmentsDollar,
  IconArrowLeft,
  IconArrowNarrowRight,
  IconCalendarCheck,
  IconCalendarMonth,
  IconHeart,
  IconPhoneCall,
  IconTag,
  IconTimeline,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import PropertyDetailErrorPage from "./error";
import PropertyLoadingPage from "./loading";

const PropertyDetailPage = () => {
  const path = usePathname();

  const paths = path.split("/");
  const paramId = paths[paths.length - 1];

  const {
    data: response,
    isError,
    isLoading,
  } = useGetPropertyById({
    id: paramId,
  });

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (isLoading) return <PropertyLoadingPage />;

  if (isError) return <PropertyDetailErrorPage />;

  if (response?.data) {
    const propertyData = response.data.property;
    const addressData = response.data.address;

    const tags: IPropertyRuleWithIcon[] = propertyData?.rules?.map((rule) => ({
      ...rule,
      icon: RulesIconMap[rule?.rule_name as keyof typeof RulesIconMap],
    }));

    return (
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-12 gap-default px-default 2xl:px-[15rem] py-default">
        <div className="col-span-3 row-span-1 flex justify-between items-center">
          <div
            className="rounded-full border-2 p-2 cursor-pointer"
            onClick={handleBack}
          >
            <IconArrowLeft
              className="text-text-secondary"
              height={25}
              width={25}
            />
          </div>
          <IconHeart className="text-text-secondary" height={25} width={25} />
        </div>
        <div className="col-span-3 h-fit row-span-1 flex flex-col gap-default md:gap-0 md:flex-row justify-between items-start md:items-center p-default">
          <div className="flex flex-col">
            <p className="text-md-subtitle-primary font-bold">
              {propertyData.title}
            </p>
            <p className="text-md-subtitle-secondary font-bold text-primary">
              offers from {rupee}
              {propertyData.amount}
            </p>
          </div>
          <button className="filledBtn">
            <span className="inline-flex">
              <p className="text-white text-md-subtitle-secondary">
                RENT THIS PROPERTY &nbsp;
              </p>
              <IconArrowNarrowRight />
            </span>
          </button>
        </div>
        <div className="col-span-1 row-span-5 rounded-default overflow-hidden min-h-[30vh]">
          <ImageCarousel images={propertyData.images ?? []} />
        </div>
        <div className="col-span-2 row-span-5 flex flex-col gap-default p-default">
          <div className="flex flex-col gap-default">
            <p className="font-bold text-text-primary">Overview</p>
            <ReadMoreComponent
              id="property-detail-desc"
              text={response.data.property.description}
              className="font-medium text-text-primary text-md-subtitle-secondary"
            />
          </div>
          <div className="flex-col gap-default flex-grow">
            <p className="font-bold text-text-primary">Details</p>
            <div className="flex flex-wrap gap-default py-default">
              {tags.map((tag, index) => (
                <div
                  className="rounded-full flex gap-default border-2 p-sm justify-center items-center"
                  key={tag.rule_name + index}
                >
                  <tag.icon className="text-text-secondary" />
                  <p className="text-text-primary text-md-subtitle-secondary font-medium">
                    {tag.rule_name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-default justify-between items-center flex-wrap py-default">
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 justify-start">
                  <IconTag className="text-text-secondary" />
                  <p className="text-md-subtitle-primary font-bold text-text-secondary">
                    Discounted Price
                  </p>
                </div>
                <p className="text-md-subtitle-main font-bold text-primary">
                  {`${rupee}`} {propertyData.amount}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 justify-start">
                  <IconTag className="text-text-secondary" />
                  <p className="text-md-subtitle-primary font-bold text-text-secondary">
                    Actual Price
                  </p>
                </div>
                <p className="text-md-subtitle-main font-bold text-primary">
                  {rupee} {propertyData.amount! + 500}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 justify-start">
                  <IconTimeline className="text-text-secondary" />
                  <p className="text-md-subtitle-primary font-bold text-text-secondary">
                    Tenure
                  </p>
                </div>
                <p className="text-md-subtitle-main font-bold text-primary">
                  {propertyData.period?.toLocaleLowerCase()}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 justify-start">
                  <IconCalendarCheck className="text-text-secondary" />
                  <p className="text-md-subtitle-primary font-bold text-text-secondary">
                    Listed
                  </p>
                </div>
                <p className="text-md-subtitle-main font-bold text-primary">
                  21 days ago
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-default">
            <div className="divider-h" />
            <div className="flex justify-between gap-default items-center">
              <div className="flex flex-col justify-center items-start">
                <div className="flex flex-row gap-2 md:flex-col">
                  <IconAdjustmentsDollar className="text-text-secondary h-5 w-5" />
                  <p className="text-text-primary text-md-subtitle-primary font-bold">
                    Potential&nbsp;Value
                  </p>
                </div>
                <div className="text-text-primary text-md-subtitle-secondary font-medium rounded-md bg-primary-lighter p-sm">
                  High&nbsp;Confidence
                </div>
              </div>
              <div className="flex flex-row justify-between items-center gap-default">
                {/* BED */}
                <div className="flex flex-col">
                  <p className="text-text-secondary hidden md:flex font-bold text-md-subtitle-primary">
                    Beds
                  </p>
                  <div className="flex flex-row justify-center items-center gap-default">
                    <Image
                      className="text-primary"
                      src={BedIcon}
                      alt="Bed icon"
                      height={30}
                      width={30}
                    />
                    <p className="text-text-secondary-dark text-md-subtitle-secondary">
                      {propertyData.property_type === "SINGLE"
                        ? 1
                        : propertyData.property_type === "DOUBLE"
                        ? 2
                        : propertyData.bed || 2}
                    </p>
                  </div>
                </div>
                {/* WASHROOM */}
                <div className="flex flex-col">
                  <p className="text-text-secondary hidden md:flex font-bold text-md-subtitle-primary">
                    Washrooms
                  </p>
                  <div className="flex flex-row justify-center items-center gap-xs">
                    <Image
                      className="text-primary"
                      src={WashIcon}
                      alt="Wash room icon"
                      height={30}
                      width={30}
                    />
                    <p className="text-text-secondary-dark text-md-subtitle-secondary">
                      {propertyData.washroom_count || 1}
                    </p>
                  </div>
                </div>
                {/* DIMENSIONS */}
                <div className="flex flex-col">
                  <p className="text-text-secondary hidden md:flex font-bold text-md-subtitle-primary">
                    Dimensions
                  </p>
                  <div className="inline-flex flex-row justify-center items-center gap-xs">
                    <Image
                      className="text-primary"
                      src={DimensionIcon}
                      alt="Dimension icon"
                      height={30}
                      width={30}
                    />
                    <p className="text-text-secondary-dark text-md-subtitle-secondary line-clamp-1">
                      {propertyData.property_length || "0"}x
                      {propertyData.property_width || "0"}{" "}
                      {propertyData.unit === "FEET" ? "ft" : "m"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-4 border flex flex-col gap-default justify-between items-start p-default">
          <div className="flex flex-col gap-default">
            <p className="font-bold text-text-primary">Owner details</p>

            <div className="flex flex-col">
              <p className="font-bold text-text-primary text-md-subtitle-primary">
                Aryan Chobey
              </p>
              <p className="font-medium text-text-secondary text-md-subtitle-secondary">
                Partner since July, 2024
              </p>
            </div>
            <button className="filledBtn inline-flex items-center">
              <IconPhoneCall className="text-white" height={25} width={25} />
              <p className="font-bold text-text-white text-md-subtitle-secondary">
                CONTACT AGENT & VIEW LISTING
              </p>
            </button>
          </div>
          <div className="flex flex-col gap-default">
            <p className="font-bold text-text-primary">Inspection Times</p>
            <div className="flex flex-col">
              <p className="font-medium text-text-secondary text-md-subtitle-secondary">
                Inspection available for the property on
              </p>
              <p className="font-medium text-primary text-md-subtitle-primary">
                Saturday, 7 Aug, 1:00pm - 4:30pm
              </p>
            </div>
            <button className="filledBtn bg-primary-lighter inline-flex justify-between items-center">
              <IconCalendarMonth
                className="text-primary"
                height={25}
                width={25}
              />
              <p className="text-primary">ADD TO CALENDAR</p>
            </button>
          </div>
        </div>
        {/* MAP */}
        <div className="col-span-2 row-span-4 rounded-default overflow-hidden">
          <MapComponent
            disableInteractions
            defaultPosition={{
              lat: Number(addressData.latitude),
              lon: Number(addressData.longitude),
            }}
          />
        </div>
        <div className="col-span-3 row-span-2 p-default flex border flex-col gap-default">
          <p className="font-bold text-text-primary">Property Information</p>
          <p className="font-medium text-text-secondary text-md-subtitle-secondary line-clamp-1 overflow-hidden text-ellipsis lg:w-2/3">
            Address: {addressData.street_address}
          </p>
        </div>
      </div>
    );
  }
};

export default PropertyDetailPage;
