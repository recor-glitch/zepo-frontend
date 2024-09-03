import React from "react";

const PropertyDetailPage = () => {
  return (
    <div className="flex flex-col md:grid grid-cols-5 grid-rows-12 gap-default h-body w-full">
      <div className="col-span-5 row-span-1 border"></div>
      <div className="col-span-2 row-span-5 border"></div>
      <div className="col-span-3 row-span-5 border"></div>
      <div className="col-span-2 row-span-5 border"></div>
      <div className="col-span-3 row-span-5 border"></div>
      <div className="col-span-5 row-span-1 border"></div>
    </div>
  );
};

export default PropertyDetailPage;
