// NAVBAR ITEMS

type NavbarItemType = "STANDARD" | "SELECT" | "LINK";

interface ISelectItems {
  title: string;
  link: string;
}

interface INavItems {
  type: NavbarItemType;
  title: string;
  link: string;
  selectItems?: ISelectItems[];
}

interface IFooterItems {
  title: string;
  items: ISelectItems[];
}

interface ITabBarItems extends ISelectItems {}

// CARD
type PriceType = "MONTHLY" | "DAILY" | "YEARLY";
type SizeType = "METERS" | "FEET";
type RoomType = "SINGLE" | "DOUBLE" | "BHK" | "SHARED";
type WashRoomType = "SHARED" | "ATTACHED";

interface ISingleRoom {
  type: "SINGLE";
  size: IRoomSize;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

interface IDoubleRoom {
  type: "DOUBLE";
  size: IRoomSize;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

interface IBHKRoom {
  type: "BHK";
  size: IRoomSize;
  beds: number;
  halls: number;
  kitchen: number;
  balcony: number;
  washroom: {
    type: WashRoomType;
    count: number;
  };
}

interface ISharedRoom extends IBHKRoom {
  type: "SHARED";
}

interface Iprice {
  type: PriceType;
  amount: number;
}
interface IRoomSize {
  type: SizeType;
  dimensions: {
    length: number;
    width: number;
  };
}
interface IRoomDescription {
  images: string[];
  price: Iprice;
  desc: string;
  type: RoomType;
  spec: ISingleRoom | IDoubleRoom | IBHKRoom | ISharedRoom;
}

interface IRentRoom extends IRoomDescription {
  isPopular: boolean;
  likeCount: number;
  title: string;
  address: string;
}
