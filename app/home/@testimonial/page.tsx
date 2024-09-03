import { ProfileAvatar } from "@/components/avatar";

export default function TestimonialSection() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center gap-md lg:py-lg lg:px-huge px-sm-h mb-20">
      <div className="flex flex-col justify-center items-center gap-default text-center">
        <p className="text-md-header text-text-primary font-bold">
          Testimonials
        </p>
        <p className="text-lg-subtitle text-text-primary font-medium">
          See what our property managers, landlords, and tenants have to say
        </p>
      </div>
      <div className="flex flex-col text-center items-center gap-default">
        <p className="text-lg-subtitle text-text-primary font-medium">
          “Estatery is the platform I go to on almost a daily basis for 2nd home
          and vacation condo shopping, or to just look at dream homes in new
          areas. Thanks for fun home shopping and comparative analyzing,
          Estatery!”
        </p>
        <span className="flex">
          <p className="text-lg-subtitle font-bold">Mira Culos,</p>
          <p className="text-lg-subtitle font-bold text-text-secondary">
            {" "}
            Renter{" "}
          </p>
        </span>
      </div>
      <div className="flex gap-8 justify-around items-center">
        <ProfileAvatar image="/profile-1.svg" bgColor="#DBC0DD" showOutline />
        <ProfileAvatar image="/profile-2.svg" bgColor="#C3C7DF" />
        <ProfileAvatar image="/profile-3.svg" bgColor="#CFC3A7" />
      </div>
    </div>
  );
}
