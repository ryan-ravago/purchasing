"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpAz, ArrowUpZA } from "lucide-react";
import { Card } from "@/components/ui/card";
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

const fetchData = async ({ pageIndex, pageSize, sorting }) => {
  const sortQuery = sorting
    .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
    .join(",");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/my-requests`,
    {
      params: {
        page: pageIndex + 1, // Page parameter adjusted for 1-based indexing
        limit: pageSize,
        sort: sortQuery,
      },
    }
  );

  return response.data;
};

const ServerSideTable = ({ columns }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["data", { pageIndex, pageSize, sorting }],
    queryFn: () => fetchData({ pageIndex, pageSize, sorting }),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data?.items || [],
    columns,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
      // columnFilters,
      // columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data?.totalPages || 0,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      setPageIndex(updater.pageIndex);
      setPageSize(updater.pageSize);
    },
  });

  useEffect(() => {
    // Sync pagination state with table state when data updates
    setPageIndex(table.getState().pagination.pageIndex);
    setPageSize(table.getState().pagination.pageSize);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setPageIndex((prev) => prev - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setPageIndex((prev) => prev + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
        <div className="flex items-center space-x-1">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {table.getPageCount()}
            </strong>
            | Go to page:
          </span>
          <span>
            <Input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select size of page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={size}>
                    Show {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isFetching && <span className="text-sm"> Loading...</span>}
      </div>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex justify-between items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {/* Sorting indicators */}
                      {{
                        asc: <ArrowUpAz />,
                        desc: <ArrowUpZA />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ServerSideTable;
