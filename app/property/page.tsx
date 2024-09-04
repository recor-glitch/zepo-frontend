import { rupee } from "@/constants";
import BedIcon from "@/public/bed-icon.svg";
import DimensionIcon from "@/public/dimension-icon.svg";
import WashIcon from "@/public/wash-icon.svg";
import { IPropertyDto } from "@/type/dto/property/property-dto";
import {
  Icon,
  IconAdjustmentsDollar,
  IconArrowNarrowRight,
  IconBrandAsana,
  IconFlame,
  IconPaw,
  IconPlugConnected,
  IconProps,
  IconRipple,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import DummyImage from "@/public/dummy-rent-9.svg";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const tags: {
  title: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}[] = [
  {
    icon: IconUsers,
    title: "4 Adults",
  },
  {
    icon: IconPaw,
    title: "Pets Allowed",
  },
  {
    icon: IconRipple,
    title: "Lake nearby",
  },
  {
    icon: IconPlugConnected,
    title: "Unsecluded",
  },
  {
    icon: IconFlame,
    title: "Bonfire",
  },
  {
    icon: IconBrandAsana,
    title: "Sauna",
  },
];

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
  return (
    <div className="flex flex-col md:grid grid-cols-5 grid-rows-12 gap-default w-full px-[10rem] py-default">
      <div className="col-span-5 h-fit row-span-2 flex justify-between items-center p-default">
        <div className="flex flex-col">
          <p className="text-md-subtitle-primary font-bold">
            {dummyRent.title}
          </p>
          <p className="text-md-subtitle-secondary font-bold text-primary">
            offers from {rupee}
            {dummyRent.amount}
          </p>
        </div>
        <button className="filledBtn">
          <span className="inline-flex">
            <p className="text-white text-md-subtitle-secondary">
              PURCHASE THIS PROPERTY &nbsp;
            </p>
            <IconArrowNarrowRight />
          </span>
        </button>
      </div>
      <div className="col-span-2 row-span-5 rounded-default overflow-hidden">
        <Image
          src={dummyRent.images[0]}
          alt="Dummy image"
          className="h-full w-full object-fill"
          height={100}
          width={200}
        />
      </div>
      <div className="col-span-3 row-span-5 border flex flex-col gap-default p-default">
        <div className="flex flex-col gap-default">
          <p className="font-bold text-text-primary">Overview</p>
          <p className="font-medium text-text-primary text-md-subtitle-secondary line-clamp-4 overflow-hidden text-ellipsis">
            {dummyRent.description}
          </p>
        </div>
        <div className="flex-col gap-default">
          <p className="font-bold text-text-primary">Details</p>
          <div className="flex flex-wrap gap-default">
            {tags.map((tag) => (
              <div className="rounded-full flex gap-default border-2 p-sm justify-center items-center">
                <tag.icon className="text-text-secondary" />
                <p className="text-text-primary text-md-subtitle-secondary font-medium">
                  {tag.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="divider-h" />
        <div className="flex justify-between gap-default items-center">
          <div className="flex flex-col justify-center items-start">
            <IconAdjustmentsDollar className="text-text-secondary h-5 w-5" />
            <p className="text-text-primary text-md-subtitle-primary font-bold">
              Potential Value
            </p>
            <div className="text-text-primary text-md-subtitle-secondary font-medium rounded-md bg-primary-lighter p-sm">
              High Confidence
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-default">
            {/* BED */}
            <div className="flex flex-col">
              <p className="text-text-secondary font-bold text-md-subtitle-primary">
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
                  {rent.property_type === "SINGLE"
                    ? 1
                    : rent.property_type === "DOUBLE"
                    ? 2
                    : rent.bed || 2}
                </p>
              </div>
            </div>
            {/* WASHROOM */}
            <div className="flex flex-col">
              <p className="text-text-secondary font-bold text-md-subtitle-primary">
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
                  {rent.washroom_count || 1}
                </p>
              </div>
            </div>
            {/* DIMENSIONS */}
            <div className="flex flex-col">
              <p className="text-text-secondary font-bold text-md-subtitle-primary">
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
                  {rent.property_length || "0"}x{rent.property_width || "0"}{" "}
                  {rent.unit === "FEET" ? "ft" : "m"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-3 border"></div>
      <div className="col-span-3 row-span-3 border"></div>
      <div className="col-span-5 row-span-2 border"></div>
    </div>
  );
};

export default PropertyDetailPage;
