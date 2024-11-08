import * as React from "react";

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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hook/use-media-query";

interface FilterProps {
  title?: string;
  description?: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export function useSetModalAndDrawerClose() {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = (open: boolean) => {
    setOpen(open);
  };
  return { open, setOpen, toggleOpen };
}

export function ResponsiveDrawerDialog({
  trigger,
  content,
  title = "Responsive Dialog",
  description = "Description of the dialog",
}: FilterProps) {
  const { open, setOpen } = useSetModalAndDrawerClose();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {}, [open]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-white p-default gap-default">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
