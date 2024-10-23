import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface ISelectProps {
  selectList: string[];
  label?: string;
  placeholder: string;
  className?: string;
  defaultValue?: string;
  onChange: (value: string) => void; // Add an onChange prop to handle value changes
}

export function SelectInput({
  label,
  placeholder,
  selectList,
  className,
  defaultValue,
  onChange, // Get the onChange function passed from the parent component
}: ISelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  // Initialize the selected value to the default value if provided
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Select
      value={selectedValue}
      defaultValue={defaultValue} // Set the default value for the Select component
      onValueChange={(value) => {
        setSelectedValue(value);
        onChange(value); // Call the parent onChange function
      }}
    >
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
              key={item} // Add key prop to avoid React warnings
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
