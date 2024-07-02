'use client';

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import { DataTablePagination } from '~/components/data-table-pagination';
import { DataTableToolbar } from '~/components/data-table-toolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRowCount: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRowCount,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useAtom(tableAtom);

  const pagination = useMemo(
    () => ({
      pageIndex: tableData.page - 1,
      pageSize: tableData.pageSize,
    }),
    [tableData.page, tableData.pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRowCount / tableData.pageSize),
    state: {
      pagination,
      columnFilters: tableData.columnFilters,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater !== 'function') {
        return;
      }

      const newPageInfo = updater(pagination);
      setTableData((prev) => ({
        ...prev,
        page: newPageInfo.pageIndex + 1,
        pageSize: newPageInfo.pageSize,
      }));
    },
    manualFiltering: true,
    onColumnFiltersChange: (updater) => {
      if (typeof updater !== 'function') {
        return;
      }

      const filters = updater(tableData.columnFilters);

      console.log({ filters });

      setTableData((prev) => ({
        ...prev,
        columnFilters: updater(filters),
      }));
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <TableContainer>
      <DataTableToolbar table={table} />
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} paddingX={0}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length}>No results.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <DataTablePagination table={table} />
    </TableContainer>
  );
}

type TableData = {
  page: number;
  pageSize: number;
  columnFilters: ColumnFiltersState;
};

export const tableAtom = atom<TableData>({
  page: 1,
  pageSize: 10,
  columnFilters: [],
});
