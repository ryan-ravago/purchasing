import { useMemo } from "react";
import DebouncedInput from "./Debounce";

function isValidDate(dateString) {
  // Check if the input string is a valid date format (e.g., "7/11/2023")
  const datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateString.match(datePattern)) {
    return false;
  }

  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Check if the date is valid
  const isValid = date instanceof Date && !isNaN(date);

  // Additional check to ensure the input string matches the date object values
  if (isValid) {
    const [month, day, year] = dateString.split("/").map(Number);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  return false;
}

export default function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div>
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder="min"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder="max"
        />
      </div>
    </div>
  ) : typeof firstValue === "date" ? (
    <>
      <DebouncedInput
        type="date"
        min={column.getFacetedMinMaxValues()?.[0] ?? ""}
        max={column.getFacetedMinMaxValues()?.[1] ?? ""}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) => column.setFilterValue((old) => [value, old?.[1]])}
        placeholder="min"
      />

      <DebouncedInput
        type="date"
        min={column.getFacetedMinMaxValues()?.[0] ?? ""}
        max={column.getFacetedMinMaxValues()?.[1] ?? ""}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) => column.setFilterValue((old) => [old?.[0], value])}
        placeholder="max"
      />
    </>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... `}
        list={column.id + "list"}
      />
    </>
  );
}
