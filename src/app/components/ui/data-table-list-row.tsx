import { flexRender, Row } from '@tanstack/react-table'
import clsx from 'clsx'
import { MouseEvent, TouchEvent } from 'react'
import { ContextMenuProvider } from '@/app/components/table/context-menu'
import { ColumnDefType } from '@/types/react-table/columnDef'

interface TableRowProps<TData> {
  row: Row<TData>
  virtualRow: { index: number; size: number; start: number }
  index: number
  handleClicks: (e: MouseEvent<HTMLDivElement>, row: Row<TData>) => void
  handleRowDbClick: (e: MouseEvent<HTMLDivElement>, row: Row<TData>) => void
  handleRowTap: (e: TouchEvent<HTMLDivElement>, row: Row<TData>) => void
  getContextMenuOptions: (row: Row<TData>) => JSX.Element | undefined
}

let isTap = false
let tapTimeout: NodeJS.Timeout

export function TableListRow<TData>({
  row,
  virtualRow,
  index,
  handleClicks,
  handleRowDbClick,
  handleRowTap,
  getContextMenuOptions,
}: TableRowProps<TData>) {
  function handleTouchStart() {
    isTap = true
    tapTimeout = setTimeout(() => {
      isTap = false
    }, 500)
  }

  function handleTouchMove() {
    isTap = false
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    clearTimeout(tapTimeout)
    if (isTap) handleRowTap(e, row)
  }

  function handleTouchCancel() {
    clearTimeout(tapTimeout)
    isTap = false
  }

  return (
    <ContextMenuProvider options={getContextMenuOptions(row)}>
      <div
        role="row"
        data-row-index={virtualRow.index}
        data-state={row.getIsSelected() && 'selected'}
        onClick={(e) => handleClicks(e, row)}
        onDoubleClick={(e) => handleRowDbClick(e, row)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onContextMenu={(e) => handleClicks(e, row)}
        className={clsx(
          'group/tablerow w-full flex flex-row transition-colors',
          'hover:bg-foreground/20 data-[state=selected]:bg-foreground/30',
        )}
        style={{
          height: `${virtualRow.size}px`,
          transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
        }}
      >
        {row.getVisibleCells().map((cell) => {
          const columnDef = cell.column.columnDef as ColumnDefType<TData>

          return (
            <div
              key={cell.id}
              className={clsx(
                'p-2 flex flex-row items-center justify-start [&:has([role=checkbox])]:pr-4',
                columnDef.className,
              )}
              style={columnDef.style}
              role="cell"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )
        })}
      </div>
    </ContextMenuProvider>
  )
}
