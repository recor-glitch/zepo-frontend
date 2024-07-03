import DummyRoomImage from "@/public/dummy-rent-3.svg";
import Image from "next/image";

export default function TourSection() {
  return (
    <div className="h-body flex justify-between items-center gap-h">
      {/* LEFT SIDE SECTION */}
      <section className="p-h h-full md:w-1/2 w-full flex flex-row">
        <div className="w-[10rem] md:flex hidden" />
        <div className="flex md:w-3/4 w-full gap-text-spacing flex-col">
          <Image
            src={DummyRoomImage}
            alt="Dummy room image 3"
            className="flex h-full w-full"
          />
        </div>
      </section>
      {/* RIGHT SIDE SECTION */}
      <section className="h-full w-1/2 md:block hidden"></section>
    </div>
  );
}
