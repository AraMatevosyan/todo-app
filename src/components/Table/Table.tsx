import React, { useMemo } from 'react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Styled } from "./Table.styled";
import { useTheme } from '../../theme/ThemeContext'


type TableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: {
    pageIndex: number;
    pageCount: number;
    gotoPage: (value: number) => void;
  };
};

export const Table = <T extends object>({
  columns,
  data,
  pagination,
}: TableProps<T>) => {
  const { currentTheme} = useTheme();

  const defaultColumns: ColumnDef<T, any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          {...{
            checked: row.getIsSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    ...columns,
  ];

  const table = useReactTable<T>({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const paginationComponent = useMemo(() => {
    if(!pagination) return null;
    const {pageIndex, pageCount, gotoPage} = pagination;
    return (
      <Styled.Pagination>
        <button
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={pageIndex === 1}
        >
          Previous
        </button>
        <span>
            Page <strong>{pageIndex}</strong> of {pageCount}
          </span>
        <button
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={pageIndex === pageCount}
        >
          Next
        </button>
      </Styled.Pagination>
    )
  }, [pagination])

  return (
    <Styled.TableWrapper>
      <Styled.Table theme={currentTheme}>
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                      style: {
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'auto',
                      },
                    }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Styled.Table>
      {paginationComponent}
    </Styled.TableWrapper>
  );
};
