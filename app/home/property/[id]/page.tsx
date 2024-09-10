"use client";

import { ImageCarousel } from "@/components/carousel";
import { MapComponent } from "@/components/map";
import { rupee, tags } from "@/constants";
import BedIcon from "@/public/bed-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import { useGetPropertyById } from "@/query/propertyQuery";
import { IPropertyDto } from "@/type/dto/property/property-dto";
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
import PropertyLoadingPage from "./loading";
import PropertyDetailErrorPage from "./error";

const dummyRent: IPropertyDto = {
  id: 10,
  description:
    "Indulge in the epitome of luxury living with this stunning waterfront penthouse, where modern sophistication meets timeless elegance. Nestled on the top floor of an exclusive high-rise, this exquisite residence offers unparalleled panoramic ocean views from every room.\n\nSpanning over 4,000 square feet, the penthouse features a grand open-concept living area with floor-to-ceiling windows, filling the space with natural light and breathtaking vistas. The gourmet chef's kitchen, equipped with top-of-the-line appliances and custom cabinetry, is perfect for both intimate dinners and grand entertaining.\n\nRetreat to the opulent master suite, complete with a private balcony, spa-inspired bathroom, and expansive walk-in closet. Additional bedrooms are generously sized, each with its own luxurious en-suite bathroom.\n\nStep outside to the private rooftop terrace, a true sanctuary with a plunge pool, outdoor kitchen, and multiple lounging areas, all designed to offer the ultimate in relaxation and privacy.\n\nThis penthouse is located in a prestigious building with world-class amenities, including a 24-hour concierge, state-of-the-art fitness center, infinity pool, and private beach access. Situated just minutes from fine dining, shopping, and cultural attractions, this property offers a lifestyle of convenience and unparalleled luxury.\n\nExperience the height of sophistication and the beauty of oceanfront living in this extraordinary penthouse.",
  images: [
    "https://res.cloudinary.com/dpw6hr94k/image/upload/v1724869198/property/dj6yhyzojdjtvdo1i5fs.png",
    "https://res.cloudinary.com/dpw6hr94k/image/upload/v1724869199/property/axyng79sftb8cgl7g0sj.png",
  ],
  is_popular: false,
  property_type: "VILLA",
  like_count: 0,
  title: "Elegant Waterfront Penthouse with Panoramic Ocean Views",
  bed: 2,
  hall: 1,
  kitchen: 1,
  balcony: 1,
  washroom_type: "ATTACHED",
  washroom_count: 1,
  property_width: 42,
  property_length: 56,
  unit: "FEET",
  currency: "INR",
  period: "MONTHLY",
  amount: 1500,
  amenities: [],
  host_id: "",
};

const PropertyDetailPage = (rent: IPropertyDto) => {
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

  if (response?.data)
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
              {response?.data?.property.title}
            </p>
            <p className="text-md-subtitle-secondary font-bold text-primary">
              offers from {rupee}
              {response?.data?.property.amount}
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
        <div className="col-span-1 row-span-5 rounded-default overflow-hidden">
          <ImageCarousel images={response?.data?.property.images ?? []} />
        </div>
        <div className="col-span-2 row-span-5 flex flex-col gap-default p-default">
          <div className="flex flex-col gap-default">
            <p className="font-bold text-text-primary">Overview</p>
            <p className="font-medium text-text-primary text-md-subtitle-secondary line-clamp-4 overflow-hidden text-ellipsis">
              {response?.data?.property.description}
            </p>
          </div>
          <div className="flex-col gap-default flex-grow">
            <p className="font-bold text-text-primary">Details</p>
            <div className="flex flex-wrap gap-default py-default">
              {tags.map((tag, index) => (
                <div
                  className="rounded-full flex gap-default border-2 p-sm justify-center items-center"
                  key={tag.title + index}
                >
                  <tag.icon className="text-text-secondary" />
                  <p className="text-text-primary text-md-subtitle-secondary font-medium">
                    {tag.title}
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
                  {`${rupee}`} {response?.data?.property.amount}
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
                  {rupee} {response?.data?.property.amount! + 500}
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
                  {response?.data?.property.period?.toLocaleLowerCase()}
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
                      {response?.data?.property.property_type === "SINGLE"
                        ? 1
                        : response?.data?.property.property_type === "DOUBLE"
                        ? 2
                        : response?.data?.property.bed || 2}
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
                      {response?.data?.property.washroom_count || 1}
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
                      {response?.data?.property.property_length || "0"}x
                      {response?.data?.property.property_width || "0"}{" "}
                      {response?.data?.property.unit === "FEET" ? "ft" : "m"}
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
                &nbsp;&nbsp;CONTACT&nbsp;AGENT&&nbsp;VIEW&nbsp;LISTING
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
              <p className="text-primary">
                &nbsp;&nbsp;ADD&nbsp;TO&nbsp;CALENDAR
              </p>
            </button>
          </div>
        </div>
        {/* MAP */}
        <div className="col-span-2 row-span-4 rounded-lg overflow-hidden">
          <MapComponent
            defaultPosition={{
              lat: Number(response?.data?.address.latitude),
              lon: Number(response?.data?.address.longitude),
            }}
          />
        </div>
        <div className="col-span-3 row-span-2 p-default flex border flex-col gap-default">
          <p className="font-bold text-text-primary">Property Information</p>
          <p className="font-medium text-text-secondary text-md-subtitle-secondary line-clamp-1 overflow-hidden text-ellipsis lg:w-2/3">
            Address: {response?.data?.address.street_address}
          </p>
        </div>
      </div>
    );
};

export default PropertyDetailPage;
