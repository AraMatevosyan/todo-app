import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Styled } from "./Table.styled";
import { useTheme } from "../../theme/ThemeContext";
import { Button } from "../Button";

interface TableData {
  id: number;
}

type TableProps<T extends TableData> = {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: {
    pageIndex: number;
    pageCount: number;
    gotoPage: (value: number) => void;
  };
  setSelectedRowKeys?: Dispatch<SetStateAction<number[]>>;
  withCheckbox?: boolean;
};

export const Table = <T extends TableData>({
  columns,
  data,
  pagination,
  setSelectedRowKeys,
  withCheckbox = false,
}: TableProps<T>) => {
  const { currentTheme } = useTheme();

  const checkboxColumn: ColumnDef<T, any> = {
    id: "select",
    size: 10,
    header: ({ table }) => (
      <Styled.Checkbox
        type="checkbox"
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Styled.Checkbox
        type="checkbox"
        {...{
          checked: row.getIsSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  };

  const defaultColumns: ColumnDef<T, any>[] = [
    ...(withCheckbox ? [checkboxColumn] : []),
    ...columns,
  ];

  const table = useReactTable<T>({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (setSelectedRowKeys) {
      const selectedIds: number[] = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);
      setSelectedRowKeys(selectedIds);
    }
  }, [table.getSelectedRowModel().rows, setSelectedRowKeys]);

  useEffect(() => {
    table.resetRowSelection();
  }, [data]);

  const paginationComponent = useMemo(() => {
    if (!pagination) return null;
    const { pageIndex, pageCount, gotoPage } = pagination;
    return (
      <Styled.Pagination>
        <Button
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={pageIndex === 1}
        >
          Previous
        </Button>
        <span>
          Page <strong>{pageIndex}</strong> of {pageCount}
        </span>
        <Button
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={pageIndex === pageCount}
        >
          Next
        </Button>
      </Styled.Pagination>
    );
  }, [pagination]);

  return (
    <Styled.TableWrapper>
      <Styled.Table theme={currentTheme}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{ width: header.column.getSize() + "%" }}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={defaultColumns.length}
                style={{ textAlign: "center" }}
              >
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Styled.Table>
      {paginationComponent}
    </Styled.TableWrapper>
  );
};
