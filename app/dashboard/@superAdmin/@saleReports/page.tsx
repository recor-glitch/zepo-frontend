import { colorPalette, dollar, salesData } from "@/constants";
import Image from "next/image";
import React from "react";
import DummyAvatar from "@/public/dummy-avatar.svg";

const SaleReportsSection = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-text-secondary font-bold px-sm-h pb-sm-h">
        Sale Reports
      </p>
      <table className="h-full w-full py-sm-v">
        <thead>
          <tr>
            <th>Sales by</th>
            <th>Property name</th>
            <th>Sales type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr
              key={sale.id}
              className={`${
                index !== salesData.length - 1 ? `border-b-2 border` : ``
              }py-sm-h`}
            >
              <td className="flex justify-start pl-h items-center">
                <div className="flex justify-start gap-4 items-center">
                  <div className="circle-div h-12 w-12">
                    <Image
                      src={DummyAvatar}
                      alt="Profile Avatar"
                      height={50}
                      width={50}
                    />
                  </div>
                  <p className="text-md-subtitle-secondary font-medium">
                    {sale.salesBy}
                  </p>
                </div>
              </td>
              <td className="text-left pl-h text-md-subtitle-secondary font-medium">
                {sale.propertyName}
              </td>
              <td className="text-left pl-h text-md-subtitle-secondary font-medium">
                {sale.salesType}
              </td>
              <td className="text-left pl-h text-md-subtitle-secondary font-medium">
                {dollar}
                {sale.price.toLocaleString()}
              </td>
              <td className="text-left pl-h text-md-subtitle-secondary font-medium">
                <div
                  className="filledBtn w-fit text-text-secondary"
                  style={{
                    backgroundColor:
                      colorPalette[index % (colorPalette.length - 1)],
                  }}
                >
                  {sale.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleReportsSection;
