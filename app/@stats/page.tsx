import { StatCard } from "@/components/cards";
import { dummyStatsData } from "@/constants";
import DummyImg from "@/public/dummy-rent-4.svg";
import Image from "next/image";

export default function StatSection() {
  return (
    <div className="md:h-body-stats w-full h-fit flex flex-col md:flex-row justify-between items-center gap-h relative md:px-40 py-20 mb-20">
      <div className="flex w-full h-full flex-col md:flex-row rounded-default bg-primary-lighter">
        {/* LEFT SIDE SECTION */}
        <section className="pl-lg py-lg h-full md:w-1/2 w-full flex flex-col gap-h">
          <p className="text-md-header text-text-primary font-bold md:w-3/5 w-full">
            The new way to find your new home
          </p>
          <p className="text-subtitle-primary text-text-secondary-dark font-medium md:w-3/5 w-full">
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>
          <div className="flex md:flex-row flex-col flex-1 gap-text-spacing">
            {dummyStatsData.map((stat) => (
              <StatCard {...stat} />
            ))}
          </div>
        </section>
        {/* RIGHT SIDE SECTION */}
        <section className="h-full md:w-1/2 w-full flex flex-col justify-center md:items-end items-center gap-sm px-sm-h md:p-0 text-center md:text-left">
          <Image src={DummyImg} alt="Dummy rent room image" />
        </section>
      </div>
    </div>
  );
}
