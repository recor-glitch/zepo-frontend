import { RentCard } from "@/components/cards";
import { IBannerPropertyResponse } from "@/type/dto/property/property-dto";
import Link from "next/link";

export async function BrowsePropertySection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/property`);
  const data: { data: IBannerPropertyResponse[] } = await res.json();

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
        <Link href="/browse">
          <button className="filledBtn w-full lg:w-auto">
            Browse more properties
          </button>
        </Link>
      </div>
      {/* PROPERTIES GRID */}
      <div className="grid lg:grid-cols-4 gap-h w-full">
        {data && data.data?.length != 0 ? (
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
