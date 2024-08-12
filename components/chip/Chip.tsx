import React from "react";

interface chipProps {
  text: string;
  color?: string;
  className?: string;
}

const ChipComponent: React.FC<chipProps> = ({
  text,
  color,
  className,
}: chipProps) => {
  return (
    <div
      className={`p-sm border-2 flex justify-center line-clamp-1 text-ellipsis items-center rounded-full w-[8rem] bg-[${color}] ${className}`}
    >
      <p className="text-text-primary font-medium text-md-subtitle-secondary">
        {text}
      </p>
    </div>
  );
};

export default ChipComponent;
