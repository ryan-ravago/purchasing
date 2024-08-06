import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setValue(e.target.value);
      }}
      className="text-black w-full"
    />
  );
}
