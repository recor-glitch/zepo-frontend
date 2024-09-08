import { Skeleton } from "@/components/ui/skeleton";
import { tags } from "@/constants";
import React from "react";

const PropertyLoadingPage = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-12 gap-default px-default 2xl:px-[15rem] py-default">
      <div className="col-span-3 row-span-1 flex justify-between items-center">
        <Skeleton className="rounded-full w-14 h-14 bg-slate-200" />
        <Skeleton className="rounded-full w-14 h-14 bg-slate-200" />
      </div>
      <div className="col-span-3 h-fit row-span-1 flex flex-col gap-default md:gap-0 md:flex-row justify-between items-start md:items-center p-default">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-1/4 h-5 bg-slate-200" />
          <Skeleton className="w-1/3 h-5 bg-slate-200" />
        </div>
        <Skeleton className="w-1/3 h-10 bg-slate-200" />
      </div>
      <div className="col-span-1 row-span-5 rounded-default overflow-hidden">
        <Skeleton className="h-full w-full bg-slate-200" />
      </div>
      <div className="col-span-2 row-span-5 flex flex-col gap-default p-default">
        <div className="flex flex-col gap-default">
          <p className="font-bold text-text-primary">
            <Skeleton className="w-1/3 h-5 bg-slate-200" />
          </p>
          <p className="font-medium text-text-primary gap-2 text-md-subtitle-secondary line-clamp-4 overflow-hidden text-ellipsis">
            <Skeleton className="w-full h-14 bg-slate-200" />
          </p>
        </div>
        <div className="flex-col gap-default flex-grow">
          <Skeleton className="w-1/3 h-5 bg-slate-200" />
          <div className="flex flex-wrap gap-default py-default">
            {tags.map((tag) => (
              <div className="rounded-full flex gap-default border-2 p-sm justify-center items-center">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-text-primary text-md-subtitle-secondary font-medium">
                  <Skeleton className="w-10 rounded-full h-5 bg-slate-200" />
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-default justify-between items-center flex-wrap py-default">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 justify-start">
                <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
                <p className="text-md-subtitle-primary font-bold text-text-secondary">
                  <Skeleton className=" bg-slate-200 w-10 h-5" />
                </p>
              </div>
              <p className="text-md-subtitle-main font-bold text-primary">
                <Skeleton className=" bg-slate-200 w-full h-5" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-default">
          <div className="flex justify-between gap-default items-center">
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-text-secondary font-bold text-md-subtitle-primary">
                <Skeleton className="w-full h-5 bg-slate-200" />
              </p>
              <div className="flex flex-row justify-center items-center gap-default">
                <Skeleton className="w-full h-5 bg-slate-200" />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-default">
              {/* BED */}
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary font-bold text-md-subtitle-primary">
                  <Skeleton className="w-full h-5 bg-slate-200" />
                </p>
                <div className="flex flex-row justify-center items-center gap-default">
                  <Skeleton className="w-5 h-5 bg-slate-200" />
                  <p className="text-text-secondary-dark text-md-subtitle-secondary">
                    <Skeleton className="w-5 h-5 bg-slate-200" />
                  </p>
                </div>
              </div>
              {/* WASHROOM */}
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary font-bold text-md-subtitle-primary">
                  <Skeleton className="w-full h-5 bg-slate-200" />
                </p>
                <div className="flex flex-row justify-center items-center gap-xs">
                  <Skeleton className="w-5 h-5 bg-slate-200" />
                  <p className="text-text-secondary-dark text-md-subtitle-secondary">
                    <Skeleton className="w-5 h-5 bg-slate-200" />
                  </p>
                </div>
              </div>
              {/* DIMENSIONS */}
              <div className="flex flex-col gap-2">
                <p className="text-text-secondary font-bold text-md-subtitle-primary">
                  <Skeleton className="w-full h-5 bg-slate-200" />
                </p>
                <div className="flex flex-row justify-center items-center gap-xs">
                  <Skeleton className="w-5 h-5 bg-slate-200" />
                  <p className="text-text-secondary-dark text-md-subtitle-secondary">
                    <Skeleton className="w-5 h-5 bg-slate-200" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-4 border flex flex-col gap-default justify-between items-start p-default">
        <div className="flex flex-col gap-default w-full">
          <p className="font-bold text-text-primary">
            <Skeleton className="w-1/3 h-5 bg-slate-200" />
          </p>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-text-primary text-md-subtitle-primary">
              <Skeleton className="w-2/3 h-5 bg-slate-200" />
            </p>
            <p className="font-medium text-text-secondary text-md-subtitle-secondary">
              <Skeleton className="w-1/3 h-5 bg-slate-200" />
            </p>
          </div>
          <Skeleton className="w-2/3 h-10 bg-slate-200" />
        </div>
        <div className="flex flex-col gap-default w-full">
          <p className="font-bold text-text-primary">
            <Skeleton className="w-1/3 h-5 bg-slate-200" />
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-text-secondary text-md-subtitle-secondary">
              <Skeleton className="w-2/4 h-5 bg-slate-200" />
            </p>
            <p className="font-medium text-primary text-md-subtitle-primary">
              <Skeleton className="w-2/3 h-5 bg-slate-200" />
            </p>
          </div>
          <Skeleton className="w-3/4 h-10 bg-slate-200" />
        </div>
      </div>
      {/* MAP */}
      <div className="col-span-2 row-span-4 rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full bg-slate-200" />
      </div>
      <div className="col-span-3 row-span-2 p-default flex border flex-col gap-default">
        <Skeleton className="w-1/4 h-5 bg-slate-200" />
        <Skeleton className="w-full h-5 bg-slate-200" />
      </div>
    </div>
  );
};

export default PropertyLoadingPage;
