"use client";

import { useSaveToWaitlist } from "@/mutation/waitlistMutation";
import { IconLoader } from "@tabler/icons-react";
import { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";

export default function ReachOutSection() {
  const [email, setEmail] = useState<string>("");

  const { refetch, data, isSuccess, isLoading, error, isError } =
    useSaveToWaitlist({
      email,
      option: { queryKey: ["waitlist", email], enabled: false },
    });

  if (isError && error && !isLoading) {
    toast.error("Something went wrong");
  }

  if (!isLoading && isSuccess && data !== undefined) {
    setEmail("");
    toast.success("Thankyou for joining the team! happy coding");
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0) {
        toast.error("Please add your email address");
        return;
      }
      await refetch();
    } catch (error) {}
  };

  return (
    <div className="w-full h-fit flex flex-col justify-between items-center text-center gap-h py-lg lg:px-huge px-sm-h mb-20 bg-primary-dark">
      {/* <p className="text-md-title text-primary font-bold">Join our community</p> */}
      <div className="flex flex-col gap-default">
        <p className="text-md-header text-white font-bold">Join our waitlist</p>
        <p className="text-md-subtitle-primary text-white font-medium">
          Are you ready to get home from inovative rent owners
        </p>
      </div>
      <div className="hidden flex-col gap-default w-full lg:flex">
        {/* SEARCH FIELD */}
        <div className="flex justify-between items-center w-full rounded-default px-sm-h bg-white">
          <input
            name="email"
            value={email}
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-v pr-h"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="filledBtn flex justify-center items-center"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <IconLoader className="animate-spin text-white" />
            ) : (
              "submit"
            )}
          </button>
        </div>
        <span className="flex justify-center items-center text-md-subtitle-secondary text-text-secondary font-medium">
          Join
          <b className="text-md-subtitle-secondary text-text-secondary-dark font-bold">
            &nbsp; 10,000+ &nbsp;
          </b>
          other landlords in our renting community.
        </span>
      </div>
      {/* SEARCH FIELD */}
      <div className="flex  lg:hidden flex-col justify-between items-center gap-v w-full">
        <div className="flex justify-between items-center w-full rounded-default px-sm-h bg-white">
          <input
            name="email"
            value={email}
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="filledBtn flex w-full justify-center items-center"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <IconLoader className="animate-spin text-white" />
          ) : (
            `submit`
          )}
        </button>
        <span className="flex justify-center items-center text-md-subtitle-secondary text-text-secondary font-medium">
          Join
          <b className="text-md-subtitle-secondary text-text-secondary-dark font-bold">
            &nbsp; 10,000+ &nbsp;
          </b>
          other landlords in our renting community.
        </span>
      </div>
    </div>
  );
}
