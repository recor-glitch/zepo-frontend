import { IconX } from "@tabler/icons-react";
import React from "react";

interface chipProps {
  text: string;
  color?: string;
  className?: string;
  handleUnselected: () => void;
}

const ChipComponent: React.FC<chipProps> = ({
  text,
  color,
  handleUnselected,
  className,
}: chipProps) => {
  return (
    <div
      className={`p-sm border-2 flex justify-between line-clamp-1 text-ellipsis items-center rounded-full w-[8rem] bg-[${color}] ${className}`}
    >
      <p className="text-text-primary font-medium text-md-subtitle-secondary line-clamp-1 text-ellipsis">
        {text}
      </p>
      <div className="flex justify-center items-center p-sm rounded-full border">
        <IconX
          className="h-4 w-4 text-text-primary cursor-pointer"
          onClick={handleUnselected}
        />
      </div>
    </div>
  );
};

export default ChipComponent;