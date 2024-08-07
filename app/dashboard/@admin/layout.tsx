import { AdminNavbar } from "@/components/navbar";
import React, { Children } from "react";

const AdminLayout = ({
  children,
  review,
  listing,
}: {
  children: React.ReactNode;
  review: React.ReactNode;
  listing: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full  flex flex-col flex-1 gap-default">
      <div className="flex flex-row justify-between items-center h-1/6 w-full">
        <AdminNavbar />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
