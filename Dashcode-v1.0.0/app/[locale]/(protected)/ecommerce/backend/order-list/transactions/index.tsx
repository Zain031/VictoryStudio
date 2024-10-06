"use client";

import * as React from "react";
import {
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
import { columns } from "./columns";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { data } from "./data";
import TablePagination from "./table-pagination";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Plus } from "lucide-react";
import { Link } from '@/i18n/routing';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import BasicCalendar from "@/app/[locale]/(protected)/components/calendar/basic-calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-5">
        <div className="flex-1 text-xl flex gap-4 font-medium text-default-900">
          <div className="inline-flex items-center border border-solid divide-x divide-default-200 divide-solid rounded-md overflow-hidden">
            <Button
              size="md"
              variant="ghost"
              color="default"
              className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none"
            >
              All
            </Button>
            <Button
              size="md"
              variant="ghost"
              color="default"
              className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none"
            >
              Pending
            </Button>
            <Button
              size="md"
              variant="ghost"
              color="default"
              className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none"
            >
              Confirm
            </Button>
            <Button
              size="md"
              variant="ghost"
              color="default"
              className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none"
            >
              Processing
            </Button>
            <Button
              size="md"
              variant="ghost"
              color="default"
              className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none"
            >
              Delivered
            </Button>
          </div>

          <Select>
            <SelectTrigger className=" w-[80px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-none">
          <div className="flex items-center gap-4 flex-wrap">
            <Select>
              <SelectTrigger className=" w-[80px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Date</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search..."
              value={
                (table.getColumn("status")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue(event.target.value)
              }
              className="w-full "
            />
          </div>
        </div>
      </div>

      <CardContent>
        <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
          <Table>
            <TableHeader className="bg-default-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="last:text-start" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-[75px]">
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
        </div>
      </CardContent>
      <TablePagination table={table} />
    </div>
  );
};
export default TransactionsTable;
