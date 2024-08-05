"use client";

import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "freq_date",
    header: "Date requested",
    // cell: ({ row }) => (
    //   <div className="capitalize">{row.getValue("first_name")}</div>
    // ),
  },
  {
    accessorKey: "req_num",
    header: "Request No.",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="space-x-1">
        <Button className="h-8 w-14 text-xs font-bold">View</Button>
        <Button className="h-8 w-14 text-xs font-bold" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
];
