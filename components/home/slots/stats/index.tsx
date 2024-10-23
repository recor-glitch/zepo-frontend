import { StatCard } from "@/components/cards";
import { dummyStatsData } from "@/constants";
import DummyImg from "@/public/dummy-rent-4.svg";
import Image from "next/image";

export function StatSection() {
  return (
    <div className="lg:h-body-stats w-full h-fit flex flex-col lg:flex-row justify-between items-center gap-h relative lg:px-40 py-20">
      <div className="flex w-full h-full flex-col lg:flex-row rounded-default bg-ascent">
        {/* LEFT SIDE SECTION */}
        <section className="px-lg h-full lg:w-1/2 w-full flex flex-col gap-h">
          <p className="text-md-header text-text-primary font-bold lg:w-3/5 w-full">
            The new way to find your new home
          </p>
          <p className="text-subtitle-primary text-text-secondary-dark font-medium lg:w-3/5 w-full">
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>
          <div className="flex lg:flex-row flex-col flex-1 gap-text-spacing">
            {dummyStatsData.map((stat, index) => (
              <StatCard {...stat} key={stat.title + index} />
            ))}
          </div>
        </section>
        {/* RIGHT SIDE SECTION */}
        <section className="h-full lg:w-1/2 w-full flex flex-col justify-center lg:items-end items-center gap-sm px-sm-h lg:p-0 text-center lg:text-left">
          <Image src={DummyImg} alt="Dummy rent room image" />
        </section>
      </div>
    </div>
  );
}
