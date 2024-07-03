import { RentRoomType } from "./type/app";

// CURRENCY
export const rupee = "₹";
export const dollar = "$";

// DUMMY DATA
export const dummyRoomRent: RentRoomType[] = [
  {
    images: [{ url: "/dummy-rent.svg", alt: "Dummy room image 1" }],
    type: "VILLA",
    address: "2821 Lake Sevilla, Palm Harbor, TX",
    desc: "Style country house is quiet owners take care of itself. Safe and clean with warm and personalized. Parking Facilities Situated near the bypass road east Getting comfortable Airport - Walking Street - downtown 10 minutes - 15 minutes Wat Rong Khun is ideal for those seeking a private residence, not a building.",
    isPopular: false,
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
    images: [{ url: "/dummy-rent-2.svg", alt: "Dummy room image 2" }],
    type: "VILLA",
    address: "Palm Harbor, TX",
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
];
