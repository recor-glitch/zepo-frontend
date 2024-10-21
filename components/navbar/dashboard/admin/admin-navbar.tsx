"use client";

import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import MultiRangeSlider from "@/components/slider/multi-range-slider";
import { DrawerClose } from "@/components/ui/drawer";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconCurrencyDollar,
  IconNotification,
  IconSearch,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <div className="flex w-full flex-col justify-between items-center gap-default">
      <div className="flex w-full justify-between items-center">
        <p className="text-text-primary font-bold text-md-title">Dashboard</p>
        <div className="flex gap-default justify-between items-center">
          <IconNotification />
          <Link href={{ pathname: "/dashboard/listing" }}>
            <IconSquareRoundedPlus />
          </Link>
          <ResponsiveDrawerDialog
            trigger={
              <Link href={{ pathname: "" }}>
                <IconAdjustmentsHorizontal />
              </Link>
            }
            title="Edit Filters"
            description="Apply appropriate filters to the selected properties"
            content={
              <div className="flex flex-col gap-default">
                <MultiRangeSlider
                  min={0}
                  max={10000}
                  onChange={({ min, max }: { min: number; max: number }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
                <div className="flex col-span-1 justify-between items-center rounded-default px-sm-h bg-white border">
                  <input
                    name="search"
                    placeholder="Search here..."
                    className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                    onChange={() => {}}
                  />
                  <IconSearch />
                </div>
                <div className="col-span-2 grid grid-cols-2 justify-between gap-default items-center">
                  <div className="flex col-span-1 justify-between items-center rounded-default px-sm-h bg-white border">
                    <input
                      name="price"
                      placeholder="Price"
                      className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                      onChange={() => {}}
                    />
                    <IconCurrencyDollar />
                  </div>
                  <div className="flex col-span-1 justify-between items-center flex-1 rounded-default px-sm-h bg-white border">
                    <input
                      name="propertyType"
                      placeholder="Property Type"
                      className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                      onChange={() => {}}
                    />
                    <IconChevronDown />
                  </div>
                </div>
                <div className="flex colspan-1 justify-between items-center rounded-default px-sm-h bg-white border">
                  <input
                    name="location"
                    placeholder="location"
                    className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                    onChange={() => {}}
                  />
                  <IconChevronDown />
                </div>
                <div className="flex col-span-1 justify-between items-center rounded-default px-sm-h bg-white border">
                  <input
                    name="filter"
                    placeholder="Filters"
                    className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                    onChange={() => {}}
                  />
                  <IconAdjustmentsHorizontal />
                </div>
                <div className="flex gap-default w-full">
                  <DrawerClose asChild>
                    <button className="outlinedBtn flex-1">Cancel</button>
                  </DrawerClose>
                  <button className="filledBtn flex-1">Apply</button>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
