import {
  AirVent,
  Laptop,
  Refrigerator,
  Smartphone,
  Tv,
  WashingMachine,
  Zap,
  type LucideIcon,
} from "lucide-react"

import type { ServiceCategory } from "@/types"

export const CATEGORY_ICONS: Record<ServiceCategory, LucideIcon> = {
  Smartphone,
  "Laptop & PC": Laptop,
  AC: AirVent,
  Refrigerator,
  TV: Tv,
  "Washing Machine": WashingMachine,
  Electrical: Zap,
}
