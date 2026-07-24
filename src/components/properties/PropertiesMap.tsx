import * as React from "react"
import { Navigation } from "lucide-react"
import type { PropertyMock } from "@/lib/mock-data/properties"
import { Button } from "@/components/ui/button"

interface PropertiesMapProps {
  properties: PropertyMock[]
}

export function PropertiesMap({ properties }: PropertiesMapProps) {
  return (
    <div className="relative w-full h-full bg-slate-100 rounded-xl overflow-hidden border border-border shadow-inner">
      {/* High-fidelity Map Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
        alt="Map view" 
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
      />
      {/* Light overlay to ensure marker contrast */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />

      {/* Property Markers */}
      {properties.map((property) => (
        <div
          key={property.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ top: property.top, left: property.left }}
        >
          {/* Outer glow/pulse for interaction */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* The Marker */}
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white shadow-md border-2 border-white text-[11px] font-bold transition-transform group-hover:scale-110 z-10">
            {property.mapIndex}
          </div>
        </div>
      ))}

      {/* Current Location Button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 h-10 w-10 rounded-full shadow-lg bg-white hover:bg-gray-50 border border-border"
        aria-label="Current Location"
      >
        <Navigation className="h-4 w-4 text-slate-700" />
      </Button>
    </div>
  )
}
