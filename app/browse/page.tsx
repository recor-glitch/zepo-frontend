"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import { RentCard } from "@/components/cards";
import HorizontalRentCard from "@/components/cards/rent-card/rent-card-horizontal";
import ErrorComponent from "@/components/fallbacks/error";
import { PropertyFilterForm } from "@/components/form";
import { MapComponent } from "@/components/map";
import NoDataComponent from "@/components/pages/noData/no-data";
import DefaultPopoverComponent from "@/components/popover/default-popover/default-popover";
import RentCardSkeleton from "@/components/skeletons/cards/rent-card";
import { usePropertyLayout } from "@/context";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import { useGetAllProperties } from "@/query/propertyQuery";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const sortingOptions = ["High to low", "Low to high"];

const BrowsePage = () => {
  const path = usePathname();
  const paths = [];

  paths.push("home");
  paths.push(path.split("/").filter((path) => path !== ""));

  const breadCrumbs = paths.map((path) => {
    return { link: `/${path}`, title: path };
  });

  const { filters } = usePropertyFilterContext();
  const router = useRouter();

  const {
    data: allProperties,
    isLoading,
    isError,
    error,
  } = useGetAllProperties({ filters });

  const { isGrid } = usePropertyLayout();
  const [category, setCategory] = useState<{ id: string; label: string }[]>([
    { id: "ALL", label: "ALL" },
  ]);

  return (
    <div className="h-body w-full flex md:grid md:grid-cols-5 gap-default">
      {/* FILTERS */}
      <div className="col-span-1 hidden md:flex gap-default p-default h-full">
        <PropertyFilterForm />
      </div>
      {/* PROPERTIES */}
      <div className="h-full overflow-y-scroll no-scrollbar w-full flex flex-col gap-default p-default md:col-span-3">
        <BreadcrumbWithCustomSeparator
          items={breadCrumbs as { title: string; link: string }[]}
        />
        <p className="text-text-normal text-md-title font-bold">
          Available for Rent in Guwahati
        </p>
        <div className="flex justify-between items-center">
          <p className="text-text-secondary font-bold text-md-subtitle-secondary">
            {allProperties?.total.toLocaleString()} units available
          </p>
          <div className="flex gap-2 items-center">
            <IconAdjustmentsHorizontal className="text-text-secondary" />
            <p className="text-text-secondary font-bold text-md-subtitle-secondary">
              Sort by:
            </p>
            <DefaultPopoverComponent
              triggerElement={
                <IconChevronDown className="text-text-secondary" />
              }
              content={
                <div className="flex flex-col gap-default p-default">
                  {sortingOptions.map((option, idx) => (
                    <>
                      <p className="text-text-secondary text-md-subtitle-secondary cursor-pointer">
                        {option}
                      </p>
                      {idx !== sortingOptions.length - 1 && (
                        <div className="divider-h" />
                      )}
                    </>
                  ))}
                </div>
              }
            />
          </div>
        </div>
        <div
          className={`${
            isGrid
              ? `grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-default`
              : `flex flex-col gap-default`
          }`}
        >
          {isLoading ? (
            [...new Array(6)].map((_, idx) => <RentCardSkeleton key={idx} />)
          ) : isError ? (
            <ErrorComponent />
          ) : allProperties && allProperties.data?.length === 0 ? (
            <NoDataComponent />
          ) : (
            allProperties &&
            allProperties.data?.map((rent, index) =>
              !isGrid ? (
                <HorizontalRentCard
                  clickable
                  showLike
                  showPopular
                  rent={rent}
                  key={rent.title + index}
                  isReverse={index % 2 !== 0}
                />
              ) : (
                <RentCard
                  clickable
                  showLike
                  showPopular
                  rent={rent}
                  key={rent.title + index}
                />
              )
            )
          )}
        </div>
      </div>
      {/* MAP */}
      <div className="h-full overflow-hidden col-span-1 hidden md:flex p-default">
        <MapComponent />
      </div>
    </div>
  );
};

export default BrowsePage;
