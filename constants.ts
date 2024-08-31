import {
  IDashboardNavItem,
  INavItems,
  IReview,
  IStatCard,
  RentRoomType,
} from "./type/app";
import {
  IconLayoutDashboard,
  IconBuildingEstate,
  IconUser,
  IconList,
  IconUsers,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";
import { IBannerPropertyResponse } from "./type/dto/property/property-dto";

// CURRENCY
export const rupee = "₹";
export const dollar = "$";

// DUMMY ROOM DATA
export const dummyRoomRent: IBannerPropertyResponse[] = [
  {
    images: ["/dummy-rent.svg"],
    property_type: "VILLA",
    amenities: [],
    description:
      "This stylish villa offers a serene living experience with self-sufficient owners. Safe and clean with warm, personalized service. Convenient parking facilities. Located near the East Bypass Road, it's a comfortable 10-minute drive from the airport, walking street, and downtown. Ideal for those seeking a private residence.",
    isPopular: true,
    likeCount: 0,
    amount: 120000,
    currency: "INR",
    period: "MONTHLY",
    balcony: 2,
    bed: 3,
    hall: 1,
    kitchen: 1,
    property_length: 20,
    property_width: 80,
    unit: "FEET",
    washroom_count: 2,
    washroom_type: "SHARED",
    title: "Beverly Springfield",
  },
  {
    images: ["/dummy-rent-9.svg"],
    property_type: "VILLA",
    amenities: [],
    description:
      "This stylish villa offers a serene living experience with self-sufficient owners. Safe and clean with warm, personalized service. Convenient parking facilities. Located near the East Bypass Road, it's a comfortable 10-minute drive from the airport, walking street, and downtown. Ideal for those seeking a private residence.",
    isPopular: true,
    likeCount: 0,
    amount: 120000,
    currency: "INR",
    period: "MONTHLY",
    balcony: 2,
    bed: 3,
    hall: 1,
    kitchen: 1,
    property_length: 20,
    property_width: 80,
    unit: "FEET",
    washroom_count: 2,
    washroom_type: "SHARED",
    title: "Beverly Springfield",
  },
  {
    images: ["/dummy-rent-2.svg"],
    property_type: "VILLA",
    amenities: [],
    description:
      "This stylish villa offers a serene living experience with self-sufficient owners. Safe and clean with warm, personalized service. Convenient parking facilities. Located near the East Bypass Road, it's a comfortable 10-minute drive from the airport, walking street, and downtown. Ideal for those seeking a private residence.",
    isPopular: true,
    likeCount: 0,
    amount: 120000,
    currency: "INR",
    period: "MONTHLY",
    balcony: 2,
    bed: 3,
    hall: 1,
    kitchen: 1,
    property_length: 20,
    property_width: 80,
    unit: "FEET",
    washroom_count: 2,
    washroom_type: "SHARED",
    title: "Beverly Springfield",
  },
  {
    images: ["/dummy-rent-5.svg"],
    property_type: "VILLA",
    amenities: [],
    description:
      "This stylish villa offers a serene living experience with self-sufficient owners. Safe and clean with warm, personalized service. Convenient parking facilities. Located near the East Bypass Road, it's a comfortable 10-minute drive from the airport, walking street, and downtown. Ideal for those seeking a private residence.",
    isPopular: true,
    likeCount: 0,
    amount: 120000,
    currency: "INR",
    period: "MONTHLY",
    balcony: 2,
    bed: 3,
    hall: 1,
    kitchen: 1,
    property_length: 20,
    property_width: 80,
    unit: "FEET",
    washroom_count: 2,
    washroom_type: "SHARED",
    title: "Beverly Springfield",
  },
];

// DUMMY STATS DATA
export const dummyStatsData: IStatCard[] = [
  {
    title: "7.4%",
    subtitle: "Property Return Rate",
    img: {
      alt: "property return rate icon",
      url: "/property-return-rate.svg",
    },
    floatingIcon: {
      alt: "Analytics Icon",
      url: "/analytic-icon.svg",
    },
  },
  {
    title: "3,856",
    subtitle: "Property in Sell & Rent",
    img: {
      alt: "property sell and rent icon",
      url: "/property-sell-rent.svg",
    },
    floatingIcon: {
      alt: "search Icon",
      url: "/search-icon.svg",
    },
  },
  {
    title: "2,540",
    subtitle: "Daily Completed Transactions",
    img: {
      alt: "completed transaction icon",
      url: "/property-transaction.svg",
    },
    floatingIcon: {
      alt: "search Icon",
      url: "/correct-icon.svg",
    },
  },
];

// DUMMY NAV DATA
export const navItems: INavItems[] = [
  {
    title: "Rent",
    link: "/rent",
    type: "LINK",
  },
  {
    title: "Buy",
    link: "/buy",
    type: "LINK",
  },
  {
    title: "Sell",
    link: "/sell",
    type: "LINK",
  },
  {
    title: "Manage Property",
    link: "/manage",
    type: "SELECT",
    selectItems: [
      {
        link: "#",
        title: "1",
      },
      {
        link: "#",
        title: "2",
      },
    ],
  },
  {
    title: "Resources",
    link: "/resource",
    type: "SELECT",
    selectItems: [
      {
        link: "#",
        title: "1",
      },
      {
        link: "#",
        title: "2",
      },
    ],
  },
];

export const dashboardAdminNavItems: IDashboardNavItem[] = [
  {
    icon: IconLayoutDashboard,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: IconBuildingEstate,
    title: "Properties",
    link: "/dashboard/properties",
  },
  {
    icon: IconUser,
    title: "Contacts",
    link: "/dashboard/contacts",
  },
  {
    icon: IconList,
    title: "Listing",
    link: "/dashboard/listing",
  },
  {
    icon: IconUsers,
    title: "Clients",
    link: "/dashboard/clients",
  },
  {
    icon: IconReport,
    title: "Reports",
    link: "/dashboard/reports",
  },
  {
    icon: IconSettings,
    title: "Reports",
    link: "/settings",
  },
];

// COLORS
export const colorPalette = [
  "#F2D9C7",
  "#D9F2F5",
  "#B2E2D9",
  "#F0C79F",
  "#C5E8F2",
  "#96D6C9",
  "#FFD6A5",
  "#E5F5FF",
  "#B2E8D3",
  "#F0D7B2",
  "#D9E8F0",
  "#A2D6C1",
];

export const pieData = [
  {
    name: "Online Sale",
    value: 3425,
  },
  {
    name: "Offline Sale",
    value: 3120,
  },
  {
    name: "Agent Sale",
    value: 2475,
  },
  {
    name: "Marketing Sale",
    value: 5120,
  },
];

export const barData = [
  {
    name: "Jan",
    value: 70000,
  },
  {
    name: "Feb",
    value: 120000,
  },
  {
    name: "Mar",
    value: 50000,
  },
  {
    name: "Apr",
    value: 150000,
  },
  {
    name: "May",
    value: 120000,
  },
  {
    name: "Jun",
    value: 50000,
  },
  {
    name: "Jul",
    value: 120000,
  },
];

export const salesData = [
  {
    id: 1,
    salesBy: "Alena",
    propertyName: "Lafayette, California",
    salesType: "Sale",
    price: 500000,
    status: "Sold",
  },
  {
    id: 2,
    salesBy: "Elston Gullan",
    propertyName: "Lasnsing, Illinois",
    salesType: "Rent",
    price: 750000,
    status: "Pending",
  },
  {
    id: 3,
    salesBy: "James",
    propertyName: "Newyork NY, US",
    salesType: "Rent",
    price: 600000,
    status: "Available",
  },
];

export const dummyReviews: IReview[] = [
  {
    user: {
      email: "user@example.com",
      id: "user@example",
      image: "",
      name: "Bikash Kalita",
    },
    msg: "Best broker of the town",
    rating: 3,
  },
  {
    user: {
      email: "user@example.com",
      id: "user@example",
      image: "",
      name: "Aryan Chobey",
    },
    msg: "Awesome communication",
    rating: 4,
  },
  {
    user: {
      email: "jane.doe@example.com",
      id: "user123",
      image: "https://example.com/images/jane.jpg",
      name: "Jane Doe",
    },
    msg: "Excellent service, very professional!",
    rating: 5,
  },
  {
    user: {
      email: "john.smith@example.com",
      id: "user456",
      image: "https://example.com/images/john.jpg",
      name: "John Smith",
    },
    msg: "Good experience overall, but room for improvement.",
    rating: 4,
  },
  // {
  //   user: {
  //     email: "alice.wonderland@example.com",
  //     id: "user789",
  //     image: "https://example.com/images/alice.jpg",
  //     name: "Alice Wonderland",
  //   },
  //   msg: "Not satisfied with the service.",
  //   rating: 2,
  // },
];
