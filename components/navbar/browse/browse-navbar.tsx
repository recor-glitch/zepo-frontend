"use client";

import { PropertyFilterForm } from "@/components/form";
import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import { NavbarSelectComponent } from "@/components/select";
import { usePropertyLayout } from "@/context/property/layout/layout-context";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import useDebounce from "@/hook/debounce";
import { useSetModalAndDrawerClose } from "@/hook/use-modal-drawer-close";
import ZepoLogo from "@/public/zepo-logo.svg";
import {
  IconAdjustmentsHorizontal,
  IconLayoutGrid,
  IconList,
  IconSearch,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BrowseNavBar() {
  const router = useRouter();
  const { dispatch, filters } = usePropertyFilterContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch({
        type: "setPropertyFilter",
        payload: { ...filters, search: debouncedSearchTerm },
      });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!filters.search || filters.search.length === 0) {
      setSearchTerm("");
    }
  }, [filters]);

  const { isGrid, toggleLayout } = usePropertyLayout();
  const { open, toggleOpen } = useSetModalAndDrawerClose();

  return (
    <div className="h-24 flex flex-row gap-default justify-between items-center px-default md:px-h sticky top-0 z-50 bg-bg-primary">
      <Image
        src={ZepoLogo}
        alt="Website logo"
        className="w-logo h-logo hidden md:flex cursor-pointer"
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
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-normal placeholder:text-text-secondary-dark focus:outline-none flex py-sm bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      <ResponsiveDrawerDialog
        open={open}
        toggleOpen={toggleOpen}
        title="Edit Property"
        description="Make sure the property details provided are correct"
        trigger={
          <IconAdjustmentsHorizontal className="text-text-secondary md:hidden" />
        }
        content={<PropertyFilterForm />}
      />
    </div>
  );
}

export default BrowseNavBar;
