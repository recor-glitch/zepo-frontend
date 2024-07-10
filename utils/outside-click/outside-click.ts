import { useEffect } from "react";

export function useOutsideClick(ref: any, cb: () => void) {
  useEffect(() => {
    function handleMouseDown({ target }: MouseEvent): void {
      if (ref?.current && !ref?.current.contains(target)) {
        cb();
      }
    }

    document.body.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref]);
}
