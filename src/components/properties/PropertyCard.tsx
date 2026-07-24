import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { PropertyMock } from "@/lib/mock-data/properties"

interface PropertyCardProps {
  property: PropertyMock
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-border-subtle overflow-hidden">
      <CardContent className="p-3 flex gap-4">
        {/* Thumbnail */}
        <div className="relative h-24 w-36 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <img
            src={property.image}
            alt={property.address}
            className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center py-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">{property.address}</h3>
          <p className="text-xs text-muted-foreground mb-2">{property.cityState}</p>
          <p className="text-sm font-bold text-foreground tabular-nums">
            ${property.price.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
