import { IconExclamationCircle, IconReload } from "@tabler/icons-react";
import React from "react";

const ErrorComponent = () => {
  return (
    <div className="h-fit rounded-default w-full lg:w-2/3 flex flex-col justify-center items-center text-center border p-default gap-default">
      <IconExclamationCircle className="text-red-500" />
      <div className="flex flex-col">
        <p className="text-md-subtitle-main font-bold">Something went wrong!</p>
        <p className="text-md-subtitle-secondary font-medium">
          We are working on fixing the problem. Please try again.
        </p>
      </div>
      <button
        className="outlinedBtn gap-default inline-flex items-center text-primary"
        onClick={() => window.location.reload()}
      >
        <IconReload className="text-primary" />
        Refresh&nbsp;Page
      </button>
    </div>
  );
};

export default ErrorComponent;
