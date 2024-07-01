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
