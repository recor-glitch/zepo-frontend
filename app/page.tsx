import Image from "next/image";
import MapBackground from "@/public/bg-map.svg";
import RouteImg from "@/public/route.svg";
import { TabBarHome } from "@/components/tabbar-home";

export default function Home() {
  return (
    <div className="h-body flex justify-between items-center gap-h">
      <section className="p-h h-full md:w-1/2 w-full flex flex-row">
        <div className="w-1/4 md:flex hidden" />
        <div className="flex md:w-3/4 w-full gap-text-spacing flex-col">
          <p className="lgHeaderText">
            Buy, rent, or sell your property easily
          </p>
          <p className="lgSubHeaderText">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
          <div className="gap-text-spacing-stats md:flex hidden">
            <div className="gap-stat-v-divider flex justify-start items-center">
              <div className="divider-v" />
              <div className="flex flex-col gap-0 justify-start">
                <p className="font-bold text-primary text-md-primary-header">
                  50k+
                </p>
                <p className="font-medium text-text-secondary-dark text-md-subtitle-primary">
                  renters
                </p>
              </div>
            </div>
            <div className="gap-stat-v-divider flex justify-start items-center">
              <div className="divider-v" />
              <div className="flex flex-col gap-0 justify-start">
                <p className="font-bold text-primary text-md-primary-header">
                  10k+
                </p>
                <p className="font-medium text-text-secondary-dark text-md-subtitle-primary">
                  properties
                </p>
              </div>
            </div>
          </div>
          <TabBarHome />
        </div>
      </section>
      <section className="h-full w-1/2 md:block hidden">
        <Image
          src={MapBackground}
          alt="background map"
          className="flex flex-1 object-cover overflow-hidden w-full h-full"
        />
        <Image
          src={RouteImg}
          alt="route image"
          className="absolute md:visible top-[6rem] right-[6.969rem] h-route-h w-route-w"
        />
      </section>
    </div>
  );
}
