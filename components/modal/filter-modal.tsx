import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hook/use-media-query";

interface FilterProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export function FilterDrawerDialog({ trigger, content }: FilterProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Filters</DialogTitle>
            <DialogDescription>
              Apply appropriate filters to the selected properties
            </DialogDescription>
          </DialogHeader>
          {content}
          <div className="flex gap-default w-full">
            <DrawerClose asChild>
              <button className="outlinedBtn flex-1">Cancel</button>
            </DrawerClose>
            <button className="filledBtn flex-1">Apply</button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-white p-default gap-default">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Filters</DrawerTitle>
          <DrawerDescription>
            Apply appropriate filters to the selected properties
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <div className="flex gap-default w-full">
          <DrawerClose asChild>
            <button className="outlinedBtn flex-1">Cancel</button>
          </DrawerClose>
          <button className="filledBtn flex-1">Apply</button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
