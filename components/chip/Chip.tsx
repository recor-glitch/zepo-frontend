import { IconX } from "@tabler/icons-react";
import React from "react";

interface chipProps {
  text?: string;
  children?: React.ReactNode;
  color?: string;
  className?: string;
  isSelected?: boolean;
  handleUnselected: () => void;
  onClick?: () => void;
  prefix?: React.ReactNode;
}

const ChipComponent: React.FC<chipProps> = ({
  text,
  color,
  handleUnselected,
  children,
  className,
  isSelected = false,
  onClick = () => {},
  prefix,
}: chipProps) => {
  return (
    <div
      className={`p-sm gap-default border-2 cursor-pointer ${
        isSelected && "border-blue-400"
      } flex justify-between line-clamp-1 text-ellipsis items-center gap-default rounded-full bg-[${color}] ${className}`}
      onClick={onClick}
    >
      {prefix && prefix}
      {children || (
        <p className="text-text-primary font-medium text-md-subtitle-secondary line-clamp-1 overflow-hidden text-ellipsis">
          {text}
        </p>
      )}
      {isSelected && (
        <div className="flex justify-center items-center p-sm rounded-full border">
          <IconX
            className="h-4 w-4 text-text-primary cursor-pointer"
            onClick={handleUnselected}
          />
        </div>
      )}
    </div>
  );
};

export default ChipComponent;
