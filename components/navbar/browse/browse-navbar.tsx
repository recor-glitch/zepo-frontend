"use client";

import { NavbarSelectComponent } from "@/components/select";
import { usePropertyLayout } from "@/context/property/layout/layout-context";
import ZepoLogo from "@/public/zepo-logo.svg";
import { IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function BrowseNavBar() {
  const router = useRouter();
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const { isGrid, toggleLayout } = usePropertyLayout();

  return (
    <div className="h-24 flex flex-row gap-default justify-between items-center px-default md:px-h sticky top-0 z-50 bg-bg-primary">
      <Image
        src={ZepoLogo}
        alt="Website logo"
        className="w-logo h-logo cursor-pointer"
        onClick={() => router.replace("/home")}
      />
      <div className="hidden lg:flex">
        <NavbarSelectComponent />
      </div>
      <div className="flex gap-default">
        <div className="flex justify-between items-center rounded-default px-sm-h border">
          <input
            name="search"
            placeholder="Search here..."
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-normal placeholder:text-text-secondary-dark focus:outline-none flex py-sm"
            onChange={handleSearchTextChange}
          />
          <IconSearch className="text-text-secondary" />
        </div>
        <div className="border rounded-default gap-default p-sm hidden lg:flex">
          <IconLayoutGrid
            className={`text-text-secondary cursor-pointer ${
              isGrid && "text-text-primary"
            }`}
            onClick={() => {
              toggleLayout(true);
            }}
          />
          <div className="divider-v" />
          <IconList
            className={`text-text-secondary cursor-pointer ${
              !isGrid && "text-text-primary"
            }`}
            onClick={() => {
              toggleLayout(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseNavBar;
