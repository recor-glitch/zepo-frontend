import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full  flex flex-col flex-1 gap-default">
      {children}
    </div>
  );
};

export default AdminLayout;
