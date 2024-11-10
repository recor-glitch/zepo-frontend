"use client";

import { PropertyFilterForm } from "@/components/form";
import { ResponsiveDrawerDialog } from "@/components/modal/responsive-modal";
import { useSetModalAndDrawerClose } from "@/hook/use-modal-drawer-close";
import {
  IconAdjustmentsHorizontal,
  IconNotification,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import Link from "next/link";

const AdminNavbar = () => {
  const { open, toggleOpen } = useSetModalAndDrawerClose();
  return (
    <div className="flex w-full flex-col justify-between items-center gap-default">
      <div className="flex w-full justify-between items-center">
        <p className="text-text-primary font-bold text-md-title">Dashboard</p>
        <div className="flex gap-default justify-between items-center">
          <IconNotification />
          <Link href={{ pathname: "/dashboard/listing" }}>
            <IconSquareRoundedPlus />
          </Link>
          <ResponsiveDrawerDialog
            open={open}
            toggleOpen={toggleOpen}
            trigger={
              <Link href={{ pathname: "" }}>
                <IconAdjustmentsHorizontal />
              </Link>
            }
            title="Edit Filters"
            description="Apply appropriate filters to the selected properties"
            content={<PropertyFilterForm />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
