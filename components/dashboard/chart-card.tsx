"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ChartDatum {
  label: string
  value: number
}

interface ChartCardProps {
  title: string
  description?: string
  data: ChartDatum[]
  className?: string
}

export function ChartCard({
  title,
  description,
  data,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("flex h-full flex-col p-5 sm:p-6", className)}>
      <div>
        <h2 className="type-h3">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-muted-ink">{description}</p>
        ) : null}
      </div>

      <div
        aria-label={`${title} bar chart`}
        className="mt-5 min-h-52 min-w-0 flex-1"
        role="img"
      >
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 8 }}>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="label"
              dy={8}
              tick={{ fill: "var(--muted-ink)", fontSize: 11 }}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "0.75rem",
                color: "var(--ink)",
                fontSize: "12px",
              }}
              cursor={{ fill: "var(--sage)", opacity: 0.6 }}
            />
            <Bar
              dataKey="value"
              fill="var(--fern)"
              isAnimationActive={false}
              maxBarSize={34}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted-ink">
        <span aria-hidden className="size-2 rounded-full bg-fern" />
        Sample weekly requests
      </div>
    </Card>
  )
}
