"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import { RentCard } from "@/components/cards";
import HorizontalRentCard from "@/components/cards/rent-card/rent-card-horizontal";
import ErrorComponent from "@/components/fallbacks/error";
import { PropertyFilterForm } from "@/components/form";
import { MapComponent } from "@/components/map";
import MultiMapComponent from "@/components/map/multi-cordinate-map";
import NoDataComponent from "@/components/pages/noData/no-data";
import { SelectInput } from "@/components/select";
import RentCardSkeleton from "@/components/skeletons/cards/rent-card";
import { usePropertyLayout } from "@/context";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import {
  useGetAllProperties,
  useGetAllPropertyLocations
} from "@/query/propertyQuery";
import {
  IconAdjustmentsHorizontal
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BrowsePage = () => {
  const path = usePathname();
  const paths = [];

  paths.push("home");
  paths.push(path.split("/").filter((path) => path !== ""));

  const breadCrumbs = paths.map((path) => {
    return { link: `/${path}`, title: path };
  });

  const { filters, dispatch } = usePropertyFilterContext();
  const queryClient = useQueryClient();

  const {
    data: allProperties,
    isLoading,
    isError,
  } = useGetAllProperties({ filters });

  const {
    data: locations,
    isLoading: locationLoading,
    isError: locationError,
  } = useGetAllPropertyLocations({ filters });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["getAllProperties"],
    });
    queryClient.invalidateQueries({
      queryKey: ["getAllPropertyLocations"],
    });
  }, [filters]);

  const handleSortingChange = (value: string) => {
    if (value === "Hight to low") {
      dispatch({
        type: "setPropertyFilter",
        payload: { ...filters, low_to_high: -1 },
      });
    } else {
      dispatch({
        type: "setPropertyFilter",
        payload: { ...filters, low_to_high: 1 },
      });
    }
  };

  const { isGrid } = usePropertyLayout();

  return (
    <div className="w-full flex md:grid md:grid-cols-5 gap-default">
      {/* FILTERS */}
      <div className="col-span-1 hidden md:flex gap-default p-default h-full">
        <PropertyFilterForm />
      </div>
      {/* PROPERTIES */}
      <div className="w-full flex flex-col gap-default p-default md:col-span-3">
        <BreadcrumbWithCustomSeparator
          items={breadCrumbs as { title: string; link: string }[]}
        />
        <p className="text-text-normal text-md-title font-bold">
          Available for Rent around you
        </p>
        <div className="flex justify-between items-center">
          <p className="text-text-secondary font-bold text-md-subtitle-secondary">
            {allProperties?.total ? allProperties?.total.toLocaleString() : 0}{" "}
            units available
          </p>
          <div className="flex gap-2 items-center px-default">
            <SelectInput
              prefix={
                <IconAdjustmentsHorizontal className="text-text-secondary hidden md:flex" />
              }
              className="border-none"
              selectList={["Hight to low", "Low to high"]}
              onChange={handleSortingChange}
              placeholder={"Sort by"}
            />
          </div>
        </div>

        {isLoading ? (
          [...new Array(6)].map((_, idx) => <RentCardSkeleton key={idx} />)
        ) : isError ? (
          <div className="flex flex-col justify-center items-center">
            <ErrorComponent />
          </div>
        ) : allProperties && allProperties.data?.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <NoDataComponent />
          </div>
        ) : (
          <div
            className={`${
              isGrid
                ? `grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-default`
                : `flex flex-col gap-default`
            }`}
          >
            {allProperties &&
              allProperties.data?.map((rent, index) =>
                !isGrid ? (
                  <HorizontalRentCard
                    clickable
                    showLike
                    showPopular
                    rent={rent}
                    key={rent.title + index}
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
              )}
          </div>
        )}
      </div>
      {/* MAP */}
      <div className="h-full overflow-hidden col-span-1 hidden md:flex p-default">
        {locations && locations.data ? (
          <MultiMapComponent properties={locations.data} />
        ) : (
          <MapComponent />
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
