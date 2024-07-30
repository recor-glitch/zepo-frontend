export default function ReachOutSection() {
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center text-center gap-h py-lg md:px-huge px-sm-h mb-20 bg-primary-dark">
      <p className="text-md-title text-primary font-bold">No Spam Promise</p>
      <div className="flex flex-col gap-default">
        <p className="text-md-header text-white font-bold">
          Are you a landlord?
        </p>
        <p className="text-md-subtitle-primary text-white font-medium">
          Discover ways to increase your home's value and get listed. No Spam.
        </p>
      </div>
      <div className="hidden flex-col gap-default w-full md:flex">
        {/* SEARCH FIELD */}
        <div className="flex justify-between items-center w-full rounded-default px-sm-h bg-white">
          <input
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-v pr-h"
          />
          <button className="filledBtn">Submit</button>
        </div>
        <span className="flex justify-center items-center text-md-subtitle-secondary text-text-secondary font-medium">
          Join
          <b className="text-md-subtitle-secondary text-text-secondary-dark font-bold">
            10,000+
          </b>
          other landlords in our renting community.
        </span>
      </div>
      {/* SEARCH FIELD */}
      <div className="flex  md:hidden flex-col justify-between items-center gap-v w-full">
        <div className="flex justify-between items-center w-full rounded-default px-sm-h bg-white">
          <input
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
          />
        </div>
        <button className="filledBtn w-full">Submit</button>
        <span className="flex justify-center items-center text-md-subtitle-secondary text-text-secondary font-medium">
          Join
          <b className="text-md-subtitle-secondary text-text-secondary-dark font-bold">
            10,000+;
          </b>
          other landlords in our renting community.
        </span>
      </div>
    </div>
  );
}
