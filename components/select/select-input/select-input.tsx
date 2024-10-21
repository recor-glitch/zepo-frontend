import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelectProps {
  selectList: string[];
  label?: string;
  placeholder: string;
  className?: string;
}

export function SelectInput({
  label,
  placeholder,
  selectList,
  className,
}: ISelectProps) {
  return (
    <Select>
      <SelectTrigger className={`min-h-[3.6rem] h-full w-full ${className}`}>
        <SelectValue
          className="*:text-text-secondary *:text-md-subtitle-secondary *:font-medium selection:text-text-secondary"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {label && (
            <SelectLabel className="text-text-secondary text-md-subtitle-secondary font-medium">
              {label}
            </SelectLabel>
          )}
          {selectList?.map((item) => (
            <SelectItem
              className="*:text-text-secondary text-md-subtitle-secondary font-medium"
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
