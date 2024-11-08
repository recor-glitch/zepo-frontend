import React from "react";

const NoDataComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-600">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 16h6v2H9v-2zm0-4h8v2H9v-2zm-4 8h14V4H5v16zm0-18h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 8h8v2H9V10z" />
      </svg>
      <h2 className="text-xl font-semibold">No Data Available</h2>
      <p className="mt-2 text-gray-500">
        There is currently no data to display.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
};

export default NoDataComponent;
