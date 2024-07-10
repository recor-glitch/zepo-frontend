import { useDrawerContext } from "@/context";
import { useEffect } from "react";

export function useDisableScroll() {
  const { isOpen } = useDrawerContext();

  useEffect(() => {
    if (isOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [isOpen]);
}
