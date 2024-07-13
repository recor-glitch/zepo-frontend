// NAVBAR ITEMS

export type NavbarItemType = "STANDARD" | "SELECT" | "LINK";

export interface ISelectItems {
  title: string;
  link: string;
}

export interface INavItems {
  type: NavbarItemType;
  title: string;
  link: string;
  selectItems?: ISelectItems[];
}

export interface IFooterItems {
  title: string;
  items: ISelectItems[];
}

export interface ITabBarItems extends ISelectItems {}

// CARD
export type PeriodType = "MONTHLY" | "DAILY" | "YEARLY";
export type CurrencyType = "USD" | "INR";
export type SizeType = "METERS" | "FEET";
export type RoomType = "SINGLE" | "DOUBLE" | "BHK" | "VILLA" | "SHARED";
export type WashRoomType = "SHARED" | "ATTACHED";

export interface IRoomInfo {
  images: Iimage[];
  price: Iprice;
  desc: string;
  isPopular: boolean;
  likeCount: number;
  title: string;
  address: string;
  size: IRoomSize;
}
export interface ISingleRoom extends IRoomInfo {
  type: "SINGLE";
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface IDoubleRoom extends IRoomInfo {
  type: "DOUBLE";
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface IBHKRoom extends IRoomInfo {
  type: "BHK";
  beds: number;
  halls: number;
  kitchen: number;
  balcony: number;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface ISharedRoom extends IRoomInfo {
  type: "SHARED";
  beds: number;
  halls: number;
  kitchen: number;
  balcony: number;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface IVilla extends IRoomInfo {
  type: "VILLA";
  swimmingpull: boolean;
  beds: number;
  halls: number;
  kitchen: number;
  balcony: number;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface Iprice {
  period: PeriodType;
  amount: number;
  currency: CurrencyType;
}
export interface IRoomSize {
  type: SizeType;
  dimensions: {
    length: number;
    width: number;
  };
}

export interface Iimage {
  url: string;
  alt: string;
}

export type RentRoomType =
  | ISingleRoom
  | IDoubleRoom
  | IBHKRoom
  | ISharedRoom
  | IVilla;

// STATS
export interface IStatCard {
  title: string;
  subtitle: string;
  img: { url: string; alt: string };
  floatingIcon?: { url: string; alt: string };
}

// USER

export interface IReview {
  msg: string;
  ratting: number;
}

export type UserRole = "user" | "admin" | "superuser";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface INormalUser extends IUser {
  role: "user";
  reviews: IReview[];
  liked: RentRoomType[];
  // TODO: history schema to be prepared
  history: [];
}
export interface IAdminUser extends IUser {
  role: "admin";
}
export interface ISuperUser extends IUser {
  role: "superuser";
}

export type UserType = INormalUser | IAdminUser | ISuperUser;
