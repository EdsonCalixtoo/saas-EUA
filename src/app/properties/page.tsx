"use client"

import * as React from "react"
import { PropertiesHeader } from "@/components/properties/PropertiesHeader"
import { PropertiesMap } from "@/components/properties/PropertiesMap"
import { PropertyCard } from "@/components/properties/PropertyCard"
import { propertiesData } from "@/lib/mock-data/properties"

export default function PropertiesPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-57px)] w-full max-w-[1600px] mx-auto p-4 lg:p-6 pb-0 overflow-hidden bg-background">
      {/* Top Header & Filters */}
      <div className="flex-shrink-0">
        <PropertiesHeader />
      </div>

      {/* Split Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 pb-6 min-h-0 mt-2">
        
        {/* Left: Scrollable List */}
        <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto pr-2 pb-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
          {propertiesData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          {/* Duplicate list to show scrolling if needed */}
          {propertiesData.map((property) => (
            <PropertyCard key={`${property.id}-dup`} property={{...property, id: `${property.id}-dup`}} />
          ))}
        </div>

        {/* Right: Map Area */}
        <div className="flex-1 rounded-xl overflow-hidden shadow-sm border border-border min-h-[400px] lg:min-h-0 bg-slate-50 relative">
          <PropertiesMap properties={propertiesData} />
        </div>

      </div>
    </div>
  )
}
