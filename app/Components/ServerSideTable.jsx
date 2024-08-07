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
import Filter from "./Filter";
import useGlobalDebounce from "./GlobalDebounce";
import { MoonLoader } from "react-spinners";

const Spinner = ({ loading }) => (
  <div
    className={`flex justify-center items-center h-24 ${
      loading ? "" : "hidden"
    }`}
  >
    <MoonLoader color="#000" size={60} />
  </div>
);

const fetchData = async ({
  pageIndex,
  pageSize,
  sorting,
  globalFilter,
  columnFilters,
}) => {
  const sortQuery = sorting
    .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
    .join(",");

  const columnFilterParams = columnFilters
    .map(({ id, value }) => `columnFilter_${id}=${encodeURIComponent(value)}`)
    .join("&");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/my-requests`,
    {
      params: {
        page: pageIndex + 1, // Page parameter adjusted for 1-based indexing
        limit: pageSize,
        sort: sortQuery,
        globalFilter,
        ...columnFilterParams.split("&").reduce((acc, param) => {
          const [key, value] = param.split("=");
          acc[key] = value;
          return acc;
        }, {}),
      },
    }
  );

  return response.data;
};

const ServerSideTable = ({ columns }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const [renderTimes, setRenderTimes] = useState(0);

  const debouncedGlobalFilter = useGlobalDebounce(globalFilter, 500); // Debounce delay of 300ms

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [
      "data",
      { pageIndex, pageSize, sorting, debouncedGlobalFilter, columnFilters },
    ],
    queryFn: () =>
      fetchData({
        pageIndex,
        pageSize,
        sorting,
        globalFilter: debouncedGlobalFilter,
        columnFilters,
      }),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data?.items || [],
    columns,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    manualSorting: true,
    manualFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data?.totalPages || 0,
    onPaginationChange: (updater) => {
      setPageIndex(updater.pageIndex);
      setPageSize(updater.pageSize);
    },
    onGlobalFilterChange: (value) => setGlobalFilter,
  });

  // console.log("loading", isLoading);
  // console.log("fetching", isFetching);

  useEffect(() => {
    // Sync pagination state with table state when data updates
    setPageIndex(table.getState().pagination.pageIndex);
    setPageSize(table.getState().pagination.pageSize);
    setFirstRender(false);
    setRenderTimes((prev) => prev + 1);
  }, [table]);

  if (firstRender && renderTimes === 0) return <Spinner loading={isLoading} />;
  if (error) {
    console.log(error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center lg:justify-start mb-3 mt-10">
        <Input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-64"
          placeholder="Search..."
        />
      </div>
      <hr className="mb-3" />
      {/* <Spinner loading={isFetching} /> */}
      <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-5">
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
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center space-x-1">
          <span className="text-sm flex items-center">
            Page{" "}
            <strong>
              {pageIndex + 1} of {table.getPageCount()}
            </strong>
            | Go to page:
            <span className="ml-1">
              <Input
                type="number"
                value={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  setPageIndex(page);
                }}
                style={{ width: "80px" }}
              />
            </span>
          </span>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[130px]">
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
        {/* {isFetching && <span className="text-sm"> Loading...</span>} */}
      </div>
      <Card className="overflow-x-auto">
        <Table className="min-w-[500px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-700 text-white px-4"
                    onClick={(e) => {
                      if (
                        e.target.tagName !== "INPUT" &&
                        e.target.tagName !== "BUTTON"
                      ) {
                        header.column.getToggleSortingHandler()(e);
                      }
                    }}
                  >
                    <div className="my-3">
                      <>
                        <div className="flex justify-between items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* CODE FOR UP AND DOWN SORTING */}
                          {
                            {
                              asc: <ArrowUpAz />,
                              desc: <ArrowUpZA />,
                            }[header.column.getIsSorted() ?? null]
                          }
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="mt-2 w-full flex-none">
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
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
            ) : isFetching ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner loading={isLoading} />
                </TableCell>
              </TableRow>
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
    </>
  );
};

export default ServerSideTable;
