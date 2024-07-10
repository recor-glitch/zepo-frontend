"use client";

import React, { Dispatch, SetStateAction } from "react";
import { IconX } from "@tabler/icons-react";

type DrawerPosition = "left" | "right";

export interface DrawerProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  triggerHandler: Dispatch<SetStateAction<boolean>>;
  fixed?: boolean;
  position?: DrawerPosition;
  className?: string;
  ref?: any;
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
  ref,
}: DrawerProps) {
  let drawerStyle = `${
    isOpen && position === "right"
      ? "translate-x-full right-0"
      : "right-full translate-x-[200%]"
  } ${className} ${
    isOpen && position === "left"
      ? "translate-x-0 left-0"
      : "left-0 -translate-x-[100%]"
  }`;

  return (
    <div
      ref={ref}
      className={`absolute flex flex-col h-[100vh] w-1/2 py-v px-sm-h transform transition-all duration-500 ease-in-out z-50 bg-white shadow-lg ${
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
