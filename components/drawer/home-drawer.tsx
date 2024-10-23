"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "../ui/drawer";

export interface DrawerProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  triggerHandler: Dispatch<SetStateAction<boolean>>;
  fixed?: boolean;
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
}: DrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={() => triggerHandler((prev) => !prev)}
      fixed={fixed}
      direction="right"
      dismissible
    >
      <DrawerContent className={`${className} border-none`}>
        <DrawerHeader>{header}</DrawerHeader>
        {content}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
