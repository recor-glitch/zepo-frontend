"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
}

// Mock data for properties available at different price ranges
const priceDistribution = [
  { range: "500-2000", count: 15 },
  { range: "2000-4000", count: 30 },
  { range: "4000-6000", count: 25 },
  { range: "6000-8000", count: 10 },
  { range: "8000-10000", count: 5 },
];

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, labelPosition = "top", ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];

  return (
    <>
      {/* Price Distribution Bar Graph */}
      <div className="w-full mb-4 flex space-x-1 items-end">
        {priceDistribution.map((item, index) => (
          <div key={index} className="flex-1">
            <div
              style={{
                height: `${item.count * 3}px`,
                backgroundColor: "#F0EFFB",
              }}
              className="w-full rounded-t"
            ></div>
          </div>
        ))}
      </div>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center mt-4",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {initialValue.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border-2 border-primary bg-primary ring-offset-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              {label && (
                <span
                  className={cn(
                    `absolute flex w-full text-text-secondary ${
                      index === 0 ? `justify-start` : `justify-end`
                    }`,
                    labelPosition === "top" && "-top-7",
                    labelPosition === "bottom" && "top-4"
                  )}
                >
                  {label(value)?.toLocaleString()}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    </>
  );
});
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
