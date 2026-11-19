import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
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

  return (
    <div className={className}>
      <div className={cn("overflow-x-auto", visibility.desktop)}>
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className={cn(
                    "border-b border-line bg-sage/40 px-3 py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase min-[1440px]:px-4",
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
                className="border-b border-line last:border-b-0 hover:bg-sage/15"
                key={getRowKey(row)}
              >
                {columns.map((column) => (
                  <td
                    className={cn(
                      "px-3 py-3.5 align-middle text-ink min-[1440px]:px-4",
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

      <ul className={cn("divide-y divide-line", visibility.mobile)}>
        {rows.map((row) => (
          <li className="py-4" key={getRowKey(row)}>
            <dl className="space-y-2">
              {columns.map((column) => (
                <div
                  className="flex items-start justify-between gap-4"
                  key={column.key}
                >
                  <dt className="text-xs font-medium text-muted-ink">
                    {column.header}
                  </dt>
                  <dd className="text-right text-sm text-ink">
                    {column.cell(row)}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
