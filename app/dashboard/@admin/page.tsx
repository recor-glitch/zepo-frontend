"use client";

import { DashboardStatCard, RentCard } from "@/components/cards";
import { dummyReviews, dummyRoomRent } from "@/constants";
import { IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";
import DummyAvatar from "@/public/dummy-avatar.svg";
import { AdminNavbar } from "@/components/navbar";
import RentCardSkeleton from "@/components/skeletons/cards/rent-card";
import { useGetAllProperties } from "@/query/propertyQuery";

const AdminPage = () => {
  const {
    data: allProperties,
    isLoading,
    isError,
    error,
  } = useGetAllProperties({});

  console.log({ allProperties });

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
        <div className="grid md:grid-cols-3 grid-cols-1 gap-default">
          <div
            className={`md:col-span-2 grid md:grid-cols-3 gap-default ${
              !allProperties?.data &&
              `flex flex-col justify-center items-center`
            }`}
          >
            {allProperties && allProperties.data ? (
              allProperties.data?.map((rent, index) => (
                <RentCard
                  showPopular={false}
                  rent={rent}
                  key={rent.title + index}
                />
              ))
            ) : isLoading ? (
              [...new Array(6)].map((_) => <RentCardSkeleton />)
            ) : !isError ? (
              <p>No data found</p>
            ) : (
              <p>Something went wrong</p>
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
              <div className="flex col-span-4 md:flex-row flex-col w-full h-full gap-4">
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
