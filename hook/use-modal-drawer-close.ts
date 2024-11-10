import React from "react";

export function useSetModalAndDrawerClose() {
  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = (open: boolean) => {
    setOpen(open);
  };
  return { open, setOpen, toggleOpen };
}
