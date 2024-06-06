import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  RowData
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import clsx from "clsx/lite"
import { ColumnFilter } from "@/types/columnFilter"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    handlePlaySong: ((row: Row<TData>) => void) | undefined
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: Row<TData>) => void
  handlePlaySong?: (row: Row<TData>) => void
  columnFilter?: ColumnFilter[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  handlePlaySong,
  columnFilter
}: DataTableProps<TData, TValue>) {
  const newColumns = columns.filter(column => {
    return columnFilter?.includes(column.id as ColumnFilter)
  })

  const table = useReactTable({
    data,
    columns: columnFilter ? newColumns : columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      handlePlaySong
    }
  })

  return (
    <div className="rounded-md border">
      <Table className="cursor-default">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const smallerHeaders = ['index', 'starred', 'actions']
                return (
                  <TableHead key={header.id} className={clsx('p-2', smallerHeaders.includes(header.id) && 'w-8')}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
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
                onClick={() => onRowClick?.(row)}
                className="group/tablerow"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2 max-w-[600px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center p-2">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
