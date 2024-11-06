"use client";

import { DashboardStatCard, RentCard } from "@/components/cards";
import ErrorComponent from "@/components/fallbacks/error";
import { AdminNavbar } from "@/components/navbar";
import RentCardSkeleton from "@/components/skeletons/cards/rent-card";
import { dummyReviews } from "@/constants";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import DummyAvatar from "@/public/dummy-avatar.svg";
import { useGetAllProperties } from "@/query/propertyQuery";
import { IconDotsVertical } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { filters } = usePropertyFilterContext();
  const queryClient = useQueryClient();

  const {
    data: allProperties,
    isLoading,
    isError,
    error,
  } = useGetAllProperties({ filters });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getAllProperties"] });
  }, [filters]);

  const router = useRouter();

  return (
    <div className="flex flex-col h-full gap-default">
      <AdminNavbar />
      <div className="flex flex-col h-full gap-default">
        {/* HEADER */}
        <div className="flex justify-start items-center gap-default w-full">
          <p className="text-md-subtitle-primary text-text-secondary font-medium">
            Your Listing
          </p>
          <p className="text-md-subtitle-primary text-text-secondary font-medium">
            Drafts
          </p>
        </div>
        {/* BODY */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-default">
          <div
            className={`lg:col-span-2 gap-default ${
              isError
                ? `flex flex-col justify-center items-center`
                : `grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`
            }`}
          >
            {isLoading ? (
              [...new Array(6)].map((_, idx) => <RentCardSkeleton key={idx} />)
            ) : isError ? (
              <ErrorComponent />
            ) : allProperties && allProperties.data?.length === 0 ? (
              <p>No data found</p>
            ) : (
              allProperties &&
              allProperties.data?.map((rent, index) => (
                <RentCard
                  showPopular={false}
                  rent={rent}
                  key={rent.title + index}
                  editEnabled
                  editCallback={() => {
                    router.push(`/dashboard/listing?id=${rent.id}&edit=true`);
                  }}
                />
              ))
            )}
          </div>
          <div className="col-span-1 flex-col flex gap-default">
            <div className="flex flex-col border gap-default rounded-default px-sm-h py-sm-v h-fit m-h-3/5">
              <div className="flex justify-between items-center">
                <p className="font-bold text-text-secondary text-md-subtitle-primary">
                  Sales Statistics
                </p>
                <IconDotsVertical className="text-text-secondary" />
              </div>
              <div className="flex col-span-4 lg:flex-row flex-col w-full h-full gap-4">
                <DashboardStatCard
                  title="Income"
                  bgColor="bg-income-card-1-bg"
                  value={34.1}
                  percentage="105.23"
                />
                <DashboardStatCard
                  title="Profit"
                  bgColor="bg-income-card-3-bg"
                  value={34.1}
                  percentage="105.23"
                />
              </div>
            </div>
            <div className="flex flex-col border gap-default rounded-default px-sm-h py-sm-v h-fit m-h-3/5">
              <div className="flex justify-between items-center">
                <p className="font-bold text-text-secondary text-md-subtitle-primary">
                  Recent Reviews
                </p>
                <IconDotsVertical className="text-text-secondary" />
              </div>
              {/* MESSAGES */}
              <div className="flex flex-col gap-default">
                {dummyReviews.map((review, index) => (
                  <>
                    <div className="flex gap-default justify-start items-center">
                      <div className="circle-div">
                        <Image src={DummyAvatar} alt="dummy profile image" />
                      </div>
                      <div className="flex flex-col items-start w-2/3">
                        <p className="text-md-subtitle-primary text-text-primary font-bold line-clamp-1">
                          {review.user.name}
                        </p>
                        <p className="text-md-subtitle-primary text-text-primary font-medium line-clamp-2">
                          {review.msg}
                        </p>
                      </div>
                    </div>
                    {index !== dummyReviews.length - 1 && (
                      <div className="divider-h" />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
