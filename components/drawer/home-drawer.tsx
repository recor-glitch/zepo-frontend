import React from "react";
import { IconX } from "@tabler/icons-react";

interface DrawerProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  triggerHandler: () => void;
}

const HomeDrawer = ({
  content,
  isOpen,
  triggerHandler,
  footer,
  header,
}: DrawerProps) => {
  return (
    <div
      className={`h-[100vh] w-1/2 py-v px-h transform ${
        isOpen ? "translate-x-0 backdrop-blur-md" : "translate-x-full"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        {header}
        <IconX onClick={triggerHandler} />
      </div>
      {/* CONTENT */}
      {content}
      {/* FOOTER */}
      {footer}
    </div>
  );
};

export default HomeDrawer;
