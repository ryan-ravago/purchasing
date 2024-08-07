"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

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
  // {
  //   header: "Actions",
  //   cell: ({ row }) => (
  //     <div className="space-x-1">
  //       <Button className="h-8 w-14 text-xs font-bold">View</Button>
  //       <Button className="h-8 w-14 text-xs font-bold" variant="destructive">
  //         Delete
  //       </Button>
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
