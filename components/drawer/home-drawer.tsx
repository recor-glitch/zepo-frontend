"use client";

import React, { Dispatch, SetStateAction } from "react";
import { IconX } from "@tabler/icons-react";

type DrawerPosition = "left" | "right";

interface DrawerProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  triggerHandler: Dispatch<SetStateAction<boolean>>;
  fixed?: boolean;
  position?: DrawerPosition;
  className?: string;
}

export function HomeDrawer({
  content,
  isOpen,
  triggerHandler,
  footer,
  header,
  fixed = false,
  className,
  position = "right",
}: DrawerProps) {
  const drawerStyle = `${
    isOpen && position === "right"
      ? "translate-x-0 right-0 backdrop-blur-md"
      : "translate-x-[100%]"
  } ${className} ${
    isOpen && position === "left"
      ? "translate-x-0 left-0 backdrop-blur-md"
      : "-translate-x-[100%]"
  }`;

  return (
    <div
      className={`absolute flex flex-col h-[100vh] w-1/2 py-v px-h transform duration-300 ease-in-out z-50 bg-white shadow-lg ${
        fixed ? `${className}` : `${className} ${drawerStyle}`
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        {header}
        <IconX
          className="cursor-pointer"
          onClick={() => triggerHandler((prev) => !prev)}
        />
      </div>
      {/* CONTENT */}
      <div className="flex flex-1">{content}</div>
      {/* FOOTER */}
      <div className="flex">{footer}</div>
    </div>
  );
}
