import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useController } from "react-hook-form";
import { z } from "zod";

export default function SelectUnit({ name, control, options }) {
  const {
    field: { onChange, onBlur, value, name: fieldName },
    fieldState: { error },
  } = useController({ name, control });

  const errorBorderAndOutlineStyles = (condition) => {
    if (condition) {
      return "border border-red-500 outline-none focus-visible:ring-red-500 focus-visible:ring-offset-0";
    }
    return "";
  };

  return (
    <>
      <Select
        value={value}
        onValueChange={(selectedValue) => onChange(selectedValue)}
        onBlur={onBlur}
        name={fieldName}
      >
        <SelectTrigger className={errorBorderAndOutlineStyles(error)}>
          <SelectValue placeholder="Select a unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Units</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* {error && <p>{error.message}</p>} */}
      {error ? (
        <span className="text-xs ms-1 text-red-500">{error.message}</span>
      ) : (
        <span className="text-xs ms-1 invisible">.</span>
      )}
    </>
  );
}
