import * as React from "react"
import { Users, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PropertiesHeader() {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Title Area */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center text-slate-700">
          <Users className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Property Search</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Side: Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Main Filters Button */}
          <Button variant="outline" className="h-9 gap-2 font-medium bg-white text-slate-700 border-slate-200">
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          {/* All States */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium gap-2 text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              All States
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Texas (TX)</DropdownMenuItem>
              <DropdownMenuItem>Tennessee (TN)</DropdownMenuItem>
              <DropdownMenuItem>Florida (FL)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium gap-2 text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Price
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>$100k - $250k</DropdownMenuItem>
              <DropdownMenuItem>$250k - $500k</DropdownMenuItem>
              <DropdownMenuItem>$500k+</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Property Type */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium gap-2 text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Property Type
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Single Family</DropdownMenuItem>
              <DropdownMenuItem>Multi Family</DropdownMenuItem>
              <DropdownMenuItem>Condo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium gap-2 text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              More
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Beds / Baths</DropdownMenuItem>
              <DropdownMenuItem>Square Feet</DropdownMenuItem>
              <DropdownMenuItem>Year Built</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {/* Right Side: Save Search */}
        <Button variant="outline" className="h-9 font-medium border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 hover:text-purple-700">
          Save Search
        </Button>
      </div>
    </div>
  )
}
