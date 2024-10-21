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
  return (
    <Select onValueChange={(value) => onChange(value)}>
      {" "}
      {/* Capture the selected value */}
      <SelectTrigger className={`min-h-[3.6rem] h-full w-full ${className}`}>
        <SelectValue
          className="*:text-text-secondary *:text-md-subtitle-secondary *:font-medium selection:text-text-secondary"
          placeholder={placeholder}
          defaultValue={defaultValue}
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
