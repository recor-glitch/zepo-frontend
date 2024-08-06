import { AdminNavbar } from "@/components/navbar";
import { IconNotification, IconSearch } from "@tabler/icons-react";
import React from "react";

const AdminLayout = () => {
  return (
    <div className="w-full h-full  flex flex-col flex-1">
      <div className="flex flex-row justify-between px-h items-center h-1/6 w-full">
        <AdminNavbar />
      </div>
    </div>
  );
};

export default AdminLayout;
