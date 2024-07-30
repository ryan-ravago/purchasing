import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useController } from "react-hook-form";

export default function DatePicker({ name, control, options }) {
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
      <Popover>
        <PopoverTrigger asChild className={errorBorderAndOutlineStyles(error)}>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Date needed</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value.to}
            onSelect={(selectedValue) => onChange(selectedValue.toString())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error ? (
        <span className="text-xs ms-1 text-red-500">{error.message}</span>
      ) : (
        <span className="text-xs ms-1 invisible">.</span>
      )}
    </>
  );
}
