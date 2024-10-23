"use client";

import { RentCard } from "@/components/cards";
import RentCardSkeleton from "@/components/skeletons/cards/rent-card";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import { useGetAllProperties } from "@/query/propertyQuery";

export function BrowsePropertySection() {
  const { filters } = usePropertyFilterContext();

  const { data, isLoading } = useGetAllProperties({ filters });

  return (
    <div className="flex flex-col py-property-h gap-h lg:px-40 px-sm-h">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-text-spacing">
        <div className="flex flex-col gap-text-spacing">
          <p className="text-md-header font-bold text-text-primary">
            Based on your location
          </p>
          <p className="text-md-subtitle-primary font-normal text-text-primary">
            Some of our picked properties near you location.
          </p>
        </div>
        <button className="filledBtn w-full lg:w-auto">
          Browse more properties
        </button>
      </div>
      {/* PROPERTIES GRID */}
      <div className="grid lg:grid-cols-4 gap-h w-full">
        {isLoading ? (
          [...new Array(6)].map((_, idx) => <RentCardSkeleton key={idx} />)
        ) : data && data.data ? (
          data.data?.map((rent, index) => (
            <RentCard rent={rent} clickable showLike key={rent.title + index} />
          ))
        ) : (
          <>No property listed yet</>
        )}
      </div>
    </div>
  );
}
