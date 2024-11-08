import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  onChange: (selectedValues: string[]) => void;
}

export function MultiSelect({ options, onChange }: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newValues);
    onChange(newValues);
  };

  return (
    <Select>
      <SelectTrigger asChild>
        <Button className="w-full">
          <SelectValue placeholder="Select options" />
        </Button>
      </SelectTrigger>
      <SelectContent className="max-h-48 overflow-y-auto">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value} // Add this line to provide the required 'value' prop
            onClick={() => toggleSelect(option.value)}
          >
            <div className="flex items-center">
              <Check
                className={`mr-2 h-4 w-4 ${
                  selectedValues.includes(option.value)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
