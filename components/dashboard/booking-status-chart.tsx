"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface BookingStatusDatum {
  label: string
  value: number
  color: string
}

interface BookingStatusChartProps {
  data: BookingStatusDatum[]
  total: number
  title?: string
  description?: string
  className?: string
}

export function BookingStatusChart({
  data,
  total,
  title = "Booking status",
  description = "A sample breakdown of all your repair requests.",
  className,
}: BookingStatusChartProps) {
  const summary = data
    .map((item) => `${item.label}: ${item.value}`)
    .join(", ")

  return (
    <Card className={cn("flex h-full flex-col p-5 sm:p-6", className)}>
      <div>
        <h2 className="type-h3">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-ink">{description}</p>
      </div>

      <div
        aria-label={`Booking status distribution. ${summary}`}
        className="relative mt-4 min-h-48 flex-1"
        role="img"
      >
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="64%"
              isAnimationActive={false}
              nameKey="label"
              outerRadius="88%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item) => (
                <Cell fill={item.color} key={item.label} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "0.75rem",
                color: "var(--ink)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-[-0.03em] text-ink tabular">
              {total}
            </p>
            <p className="text-xs text-muted-ink">bookings</p>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-line pt-4">
        {data.map((item) => (
          <li
            className="flex min-w-0 items-center justify-between gap-2 text-xs"
            key={item.label}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-muted-ink">{item.label}</span>
            </span>
            <span className="shrink-0 font-semibold text-ink tabular">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
