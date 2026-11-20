import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
  align?: "left" | "right"
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  caption?: string
  tableFrom?: "md" | "xl"
  className?: string
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  caption = "Data table",
  tableFrom = "md",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) return null

  const visibility =
    tableFrom === "xl"
      ? { desktop: "hidden xl:block", mobile: "xl:hidden" }
      : { desktop: "hidden md:block", mobile: "md:hidden" }

  const primaryColumn = columns[0]
  const metaColumns = columns.slice(1)

  return (
    <div className={className}>
      <div className={cn("overflow-x-auto", visibility.desktop)}>
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-t-2 border-ember bg-spruce">
              {columns.map((column) => (
                <th
                  className={cn(
                    "border-b border-paper/10 bg-spruce px-4 py-3.5 text-[0.6875rem] font-semibold text-paper/70 first:pl-5 last:pr-5 min-[1440px]:px-5",
                    column.align === "right" && "text-right",
                    column.className
                  )}
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className="border-b border-line/80 transition-colors last:border-b-0 hover:bg-sage/25"
                key={getRowKey(row)}
              >
                {columns.map((column) => (
                  <td
                    className={cn(
                      "px-4 py-4 align-middle text-sm text-ink first:pl-5 last:pr-5 min-[1440px]:px-5",
                      column.align === "right" && "tabular text-right",
                      column.className
                    )}
                    key={column.key}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          "border-t-2 border-ember bg-spruce text-paper",
          visibility.mobile
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <p
            className="min-w-0 truncate text-[0.6875rem] font-semibold text-paper/70"
            title={caption}
          >
            {caption}
          </p>
          <p className="tabular shrink-0 text-[0.625rem] font-medium tracking-[0.12em] text-paper/45 uppercase">
            {rows.length} {rows.length === 1 ? "record" : "records"}
          </p>
        </div>
      </div>

      <ul className={cn("divide-y divide-line", visibility.mobile)}>
        {rows.map((row) => (
          <li className="px-4 py-4" key={getRowKey(row)}>
            <div className="min-w-0">
              <p className="text-[0.625rem] font-medium tracking-[0.12em] text-muted-ink uppercase">
                {primaryColumn.header}
              </p>
              <div className="mt-1.5 text-sm text-ink">
                {primaryColumn.cell(row)}
              </div>
            </div>

            {metaColumns.length > 0 ? (
              <dl className="mt-3 grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-4 gap-y-2.5 border-t border-line/70 pt-3">
                {metaColumns.map((column) => (
                  <div className="contents" key={column.key}>
                    <dt className="text-xs font-medium text-muted-ink">
                      {column.header}
                    </dt>
                    <dd
                      className={cn(
                        "min-w-0 text-right text-sm text-ink",
                        column.align === "right" && "tabular"
                      )}
                    >
                      {column.cell(row)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
