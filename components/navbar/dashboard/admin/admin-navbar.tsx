"use client";

import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import { SelectInput } from "@/components/select";
import { DualRangeSlider } from "@/components/slider/multi-range-slider";
import { DrawerClose } from "@/components/ui/drawer";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconCurrencyDollar,
  IconNotification,
  IconSearch,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const propertyTypes = ["ALL", "SINGLE", "DOUBLE", "BHK", "VILLA"];

const AdminNavbar = () => {
  const { dispatch, filters } = usePropertyFilterContext();
  const [values, setValues] = useState([
    filters.min_price ?? 500,
    filters.max_price ?? 10000,
  ]);

  const handleClear = () => {
    dispatch({ type: "clearPropertyFilter", payload: {} });
    setValues([filters.min_price ?? 500, filters.max_price ?? 10000]);
  };

  const handleApplyFilters = () => {};

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
                <div className="flex flex-col gap-default">
                  <p className="text-text-secondary text-md-subtitle-primary font-medium">
                    Price range:
                  </p>
                  <DualRangeSlider
                    label={(value) => value}
                    value={values}
                    onValueChange={setValues}
                    min={500}
                    max={10000}
                    step={1}
                  />
                </div>
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
                  <SelectInput
                    // label="Property type"
                    placeholder="Beds"
                    selectList={["1", "2", "3", "4"]}
                  />
                  <SelectInput
                    // label="Property type"
                    placeholder="Property type"
                    selectList={propertyTypes}
                  />
                </div>
                <SelectInput
                  className="col-span-1"
                  // label="Property type"
                  placeholder="Location"
                  selectList={["Guwahati"]}
                />
                <div className="flex col-span-1 justify-between items-center rounded-default px-sm-h bg-white border">
                  <input
                    name="filter"
                    disabled
                    placeholder="Filters"
                    className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                    onChange={() => {}}
                  />
                  <IconAdjustmentsHorizontal />
                </div>
                <div className="flex gap-default w-full">
                  <DrawerClose asChild>
                    <button
                      className="outlinedBtn flex-1"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </DrawerClose>
                  <button
                    className="filledBtn flex-1"
                    onClick={handleApplyFilters}
                  >
                    Apply
                  </button>
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
