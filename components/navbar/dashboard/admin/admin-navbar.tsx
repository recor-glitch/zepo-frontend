"use client";

import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import { SelectInput } from "@/components/select";
import { DualRangeSlider } from "@/components/slider/multi-range-slider";
import { DrawerClose } from "@/components/ui/drawer";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import { IPropertyFiltersDto } from "@/type/dto/property/property-dto";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconCurrencyDollar,
  IconNotification,
  IconSearch,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const propertyTypes = ["ALL", "SINGLE", "DOUBLE", "BHK", "VILLA"];

const AdminNavbar = () => {
  const queryClient = useQueryClient();
  const { dispatch, filters } = usePropertyFilterContext();
  const [values, setValues] = useState<IPropertyFiltersDto>({ ...filters });
  const [minMaxValues, setMinMaxValues] = useState([
    filters.min_price ?? 500,
    filters.max_price ?? 10000,
  ]);

  const handlePropertyTypeChange = (value: string) => {
    if (value.trim().length !== 0)
      setValues((prev) => {
        return { ...prev, property_type: value };
      });
  };

  const handleCityChange = (value: string) => {
    if (value.trim().length !== 0)
      setValues((prev) => {
        return { ...prev, city: value };
      });
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length !== 0)
      setValues((prev) => {
        return { ...prev, search: e.target.value };
      });
  };

  const handleBedCountChange = (value: string) => {
    if (typeof value === "number")
      setValues((prev) => {
        return { ...prev, beds: Number(value) };
      });
  };

  const handleClear = () => {
    dispatch({ type: "clearPropertyFilter", payload: {} });
    setMinMaxValues([filters.min_price ?? 500, filters.max_price ?? 10000]);
  };

  const handleApplyFilters = () => {
    dispatch({
      type: "setPropertyFilter",
      payload: {
        ...values,
        min_price: minMaxValues[0],
        max_price: minMaxValues[1],
      },
    });
    queryClient.invalidateQueries({ queryKey: ["getAllProperties"] });
  };

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
                    value={minMaxValues}
                    onValueChange={setMinMaxValues}
                    min={500}
                    max={10000}
                    step={1}
                  />
                </div>
                <div className="flex col-span-1 justify-between items-center rounded-default px-sm-h bg-white border">
                  <input
                    name="search"
                    value={values.search}
                    placeholder="Search here..."
                    className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-normal placeholder:text-text-secondary-dark focus:outline-none flex py-default"
                    onChange={handleSearchTextChange}
                  />
                  <IconSearch className="text-text-secondary" />
                </div>
                <SelectInput
                  onChange={() => {}}
                  defaultValue={
                    values.low_to_high === 1 ? "Low to high" : "High to low"
                  }
                  placeholder="Sort by"
                  selectList={["Low to high", "High to low"]}
                />
                <div className="col-span-2 grid grid-cols-2 justify-between gap-default items-center">
                  <SelectInput
                    onChange={handleBedCountChange}
                    placeholder="Beds"
                    defaultValue={values.beds?.toString()}
                    selectList={["1", "2", "3", "4"]}
                  />
                  <SelectInput
                    onChange={handlePropertyTypeChange}
                    placeholder="Property type"
                    selectList={propertyTypes}
                  />
                </div>
                <SelectInput
                  onChange={handleCityChange}
                  placeholder="Location"
                  selectList={["Guwahati"]}
                />
                <div className="flex gap-default w-full">
                  <DrawerClose asChild>
                    <button
                      className="outlinedBtn flex-1"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <button
                      className="filledBtn flex-1"
                      onClick={handleApplyFilters}
                    >
                      Apply
                    </button>
                  </DrawerClose>
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
