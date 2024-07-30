"use client";

import { useContext, useState } from "react";
import { SegmentsContext } from "../../DashboardLayoutContext";
import BreadCrumbs from "@/app/Components/BreadCrumbs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, CirclePlus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectUnit from "./SelectUnit";
import DatePicker from "./DatePicker";
import { format, isAfter } from "date-fns";

const options = [
  { label: "Kilogram", value: "kg" },
  { label: "Meter", value: "m" },
  { label: "Pieces", value: "pcs" },
  { label: "L", value: "liter" },
];

// Define a Zod schema for the form
const schema = z.object({
  items: z.array(
    z.object({
      itemName: z.string().min(1, "Item name is required"),
      qty: z
        .string()
        .transform((val) => {
          if (val.trim() === "") {
            return "";
          } else if (!isNaN(val)) {
            return Number(val);
          }
        })
        .refine((val) => val !== "", { message: "Quantity is required" })
        .pipe(z.number().min(1, "Must be greater than 0")),
      unit: z
        .string()
        .refine((value) => value !== "", { message: "Unit is required" })
        .refine((value) => ["kg", "pcs", "m"].includes(value), {
          message: "Invalid unit selected",
        }),
      dateNeeded: z
        .string()
        .min(1, "Date needed is required")
        .transform((val) => format(val, "yyyy-MM-dd"), {
          message: "Invalid date format",
        })
        // .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
        .refine((val) => isAfter(val, format(new Date(), "yyyy-MM-dd")), {
          message: "At least tomorrow",
        }),
      itemNote: z.string().optional(),
    })
  ),
  reqNote: z.string().optional(),
});

export default function RequestItems() {
  const [date, setDate] = useState();
  const segments = useContext(SegmentsContext);

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [
        {
          itemName: "",
          qty: "1",
          unit: "",
          dateNeeded: "",
          itemNote: "",
        },
      ],
      reqNote: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const errorBorderAndOutlineStyles = (condition) => {
    if (condition) {
      return "border border-red-500 outline-none focus-visible:ring-red-500 focus-visible:ring-offset-0";
    }
    return "";
  };

  const addItem = () =>
    append({ itemName: "", qty: "1", unit: "", dateNeeded: "", itemNote: "" });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <BreadCrumbs segments={segments} />
        <Button onClick={addItem}>
          <CirclePlus className="me-1 h-4 w-4 md:h-5 md:w-5" />
          Add Item
        </Button>
      </div>
      <div
        className="flex flex-1 px-3 py-5 md:p-6 rounded-lg border border-dashed shadow-sm w-full"
        x-chunk="dashboard-02-chunk-1"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-8">
            {/* START EACH ITEM */}
            <Textarea
              className="mt-2"
              placeholder="Request note here..."
              {...register(`reqNote`)}
            />
            {fields.map((field, index) => (
              <div
                className={`gap-2 w-full rounded-xl ${
                  fields.length === 1 ? "" : "border-2 border-gray-300 p-4"
                }`}
                key={field.id}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center">
                  <div className="flex flex-col gap-1 items-start">
                    <Input
                      placeholder="Item name..."
                      {...register(`items.${index}.itemName`)}
                      defaultValue={field.itemName}
                      className={errorBorderAndOutlineStyles(
                        errors.items?.[index]?.itemName
                      )}
                    />
                    {errors.items?.[index]?.itemName ? (
                      <span className="text-xs ms-1 text-red-500">
                        {errors.items?.[index]?.itemName.message}
                      </span>
                    ) : (
                      <span className="text-xs ms-1 invisible">.</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <Input
                      type="number"
                      placeholder="Quantity..."
                      onKeyDown={(e) => {
                        if (e.keyCode === 69) {
                          e.preventDefault();
                          return;
                        } else if (e.keyCode === 190) {
                          e.preventDefault();
                          return;
                        }
                      }}
                      onPaste={(e) => e.preventDefault()}
                      onDrop={(e) => e.preventDefault()}
                      onDragOver={(e) => e.preventDefault()}
                      {...register(`items.${index}.qty`)}
                      defaultValue={field.qty}
                      className={errorBorderAndOutlineStyles(
                        errors.items?.[index]?.qty
                      )}
                    />
                    {errors.items?.[index]?.qty ? (
                      <span className="text-xs ms-1 text-red-500">
                        {errors.items?.[index]?.qty.message}
                      </span>
                    ) : (
                      <span className="text-xs ms-1 invisible">.</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <SelectUnit
                      name={`items.${index}.unit`}
                      control={control}
                      options={options}
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <DatePicker
                      name={`items.${index}.dateNeeded`}
                      control={control}
                      options={options}
                    />
                  </div>
                </div>
                <Textarea
                  className="mt-2"
                  placeholder="Item note here..."
                  {...register(`items.${index}.itemNote`)}
                />
                {fields.length > 1 && (
                  <Button
                    variant="destructive"
                    type="button"
                    className="mx-auto mt-2"
                    onClick={() => remove(index)}
                  >
                    <X size={20} className="me-1" /> Remove Item
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full mt-6">
            Submit Request
          </Button>
        </form>
      </div>
    </>
  );
}
