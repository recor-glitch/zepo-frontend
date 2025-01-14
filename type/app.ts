// NAVBAR ITEMS

import { Action as PropertyAction } from "@/context/property/property-form/action";
import { Action as FilterAction } from "@/context/property/property-filter/action";
import { Action } from "@/context/user/action";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  IPropertyFiltersDto,
  IPropertyFormDto,
} from "./dto/property/property-dto";
import { IAddressDetails } from "./dto/address/address-dto";

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
  images: string[];
  amount: number;
  currency: CurrencyType;
  period: PeriodType;
  unit: SizeType;
  desc: string;
  isPopular: boolean;
  likeCount: number;
  title: string;
  address?: {};
  propertyWidth?: number;
  propertyHeight?: number;
  amenities: string[];
}
export interface ISingleRoom extends IRoomInfo {
  id?: number;
  type: "SINGLE";
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface IDoubleRoom extends IRoomInfo {
  id?: number;
  type: "DOUBLE";
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

export interface IBHKRoom extends IRoomInfo {
  id?: number;
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
  id?: number;
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
  id?: number;
  type: "VILLA";
  swimmingpool: boolean;
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
  user: IUser;
  msg: string;
  rating: number;
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

// CONTEXT
export interface propertyFilterContentDto {
  dispatch: React.Dispatch<FilterAction>;
  filters: IPropertyFiltersDto;
}

export interface userContextDto {
  accessToken: string;
  user: IUser;
  dispatch: React.Dispatch<Action>;
}

export interface propertyContextDto {
  dispatch: React.Dispatch<PropertyAction>;
  activeStep: number;
  status: FormStatus;
  propertyInfo?: IPropertyFormDto;
  addressDetails?: IAddressDetails;
  extras?: IExtras;
}

export type FormStatus = "EDIT" | "PUBLISHED" | "DRAFT";

export interface IPropertyInfo {
  id?: number;
  title: string;
  description: string;
  propertyType: RoomType;
  bed?: number;
  hall?: number;
  kitchen?: number;
  balcony?: number;
  washroom: number;
  washroomType: WashRoomType;
  price: number;
  currency?: CurrencyType;
  period?: PeriodType;
}

export interface IExtras {
  removedUrls: string[];
}

// DATABASE API

export interface ICreateUserResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IUserResponse extends IUser {
  role: string;
  createAt: string;
  updatedAt: string;
}

// DASHBOARD ITEMS
export interface IDashboardNavItem {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  title: string;
  link: string;
}

// WAITLIST
export interface IWaitlistResponse {
  id: number;
  email: string;
  createdAt: string;
}

export interface IDefaultResponse {
  message: string;
  statusCode: number;
}

