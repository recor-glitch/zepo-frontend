import {
  IDashboardNavItem,
  INavItems,
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

// CURRENCY
export const rupee = "₹";
export const dollar = "$";

// DUMMY ROOM DATA
export const dummyRoomRent: RentRoomType[] = [
  {
    images: [{ url: "/dummy-rent.svg", alt: "Dummy room image 1" }],
    type: "VILLA",
    address: "2821 Lake Sevilla, Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: true,
    likeCount: 0,
    price: { amount: 1500, currency: "INR", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 20,
        width: 80,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Beverly Springfield",
  },
  {
    images: [{ url: "/dummy-rent-9.svg", alt: "Dummy room image 9" }],
    type: "VILLA",
    address: "103 Lake Shores, Michigan, IN",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 1600, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Tarpon Bay",
  },
  {
    images: [{ url: "/dummy-rent-2.svg", alt: "Dummy room image 2" }],
    type: "VILLA",
    address: "Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: true,
    likeCount: 0,
    price: { amount: 1600, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 8,
        width: 6,
      },
      type: "METERS",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Tarpon Bay",
  },
  {
    images: [{ url: "/dummy-rent-5.svg", alt: "Dummy room image 5" }],
    type: "VILLA",
    address: "909 Woodland St, Michigan, IN",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 4550, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Faulkner Ave",
  },
  {
    images: [{ url: "/dummy-rent-6.svg", alt: "Dummy room image 6" }],
    type: "VILLA",
    address: "210 US Highway, Highland Lake, FL",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 2400, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "St. Crystal",
  },
  {
    images: [{ url: "/dummy-rent-7.svg", alt: "Dummy room image 7" }],
    type: "VILLA",
    address: "243 Curlew Road, Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 1500, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Cove Red",
  },
  {
    images: [{ url: "/dummy-rent-8.svg", alt: "Dummy room image 8" }],
    type: "VILLA",
    address: "243 Curlew Road, Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 3350, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Cove Red",
  },
  {
    images: [{ url: "/dummy-rent-7.svg", alt: "Dummy room image 7" }],
    type: "VILLA",
    address: "243 Curlew Road, Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
    likeCount: 0,
    price: { amount: 1500, currency: "USD", period: "MONTHLY" },
    balcony: 2,
    beds: 3,
    halls: 1,
    kitchen: 1,
    size: {
      dimensions: {
        length: 7,
        width: 5,
      },
      type: "FEET",
    },
    washroom: {
      count: 2,
      type: "ATTACHED",
    },
    swimmingpull: true,
    title: "Cove Red",
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
