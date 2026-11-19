import { MapPin } from "lucide-react"

import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import type { TechnicianSummary } from "@/types"

export function TechnicianCard({
  technician,
}: {
  technician: TechnicianSummary
}) {
  return (
    <Card className="mt-8 p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar
          className="size-14"
          name={technician.name}
          size="lg"
          src={technician.image}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="type-h3">{technician.name}</h2>
            <Badge dot tone="green">
              Verified
            </Badge>
            {technician.plan === "pro" ? (
              <Badge tone="accent">Pro</Badge>
            ) : null}
          </div>
          {technician.area ? (
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-ink">
              <MapPin aria-hidden className="size-3.5" />
              {technician.area}
            </p>
          ) : null}
          {technician.bio ? (
            <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted-ink">
              {technician.bio}
            </p>
          ) : null}
          {technician.skills?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {technician.skills.map((skill) => (
                <Badge key={skill} tone="neutral">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
