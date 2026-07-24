"use client"

import * as React from "react"
import { Search, MapPin, Home, DollarSign, Bed, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cityOptions, propertyTypeOptions, priceRangeOptions } from "@/lib/mock-data/landing"
import { toast } from "sonner"

export function SearchBarSection() {
  const [selectedCity, setSelectedCity] = React.useState<string>(cityOptions[0])
  const [selectedType, setSelectedType] = React.useState<string>(propertyTypeOptions[0])
  const [selectedPrice, setSelectedPrice] = React.useState<string>(priceRangeOptions[0])
  const [selectedBedrooms, setSelectedBedrooms] = React.useState<string>("3+")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Buscando imóveis em ${selectedCity} (${selectedType})...`)
  }

  return (
    <section id="buscar" className="relative -mt-10 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
          
          {/* Cidade */}
          <div className="lg:col-span-3 flex flex-col gap-1 px-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Cidade
            </label>
            <Select value={selectedCity} onValueChange={(val) => val && setSelectedCity(val)}>
              <SelectTrigger className="border-0 p-0 h-8 shadow-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-white bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {cityOptions.map((c) => (
                  <SelectItem key={c} value={c} className="font-medium text-sm">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo do Imóvel */}
          <div className="lg:col-span-3 flex flex-col gap-1 px-2 border-b sm:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Home className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Tipo do Imóvel
            </label>
            <Select value={selectedType} onValueChange={(val) => val && setSelectedType(val)}>
              <SelectTrigger className="border-0 p-0 h-8 shadow-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-white bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {propertyTypeOptions.map((t) => (
                  <SelectItem key={t} value={t} className="font-medium text-sm">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Faixa de Preço */}
          <div className="lg:col-span-3 flex flex-col gap-1 px-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <DollarSign className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Faixa de Preço
            </label>
            <Select value={selectedPrice} onValueChange={(val) => val && setSelectedPrice(val)}>
              <SelectTrigger className="border-0 p-0 h-8 shadow-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-white bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {priceRangeOptions.map((p) => (
                  <SelectItem key={p} value={p} className="font-medium text-sm">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quartos */}
          <div className="lg:col-span-1 flex flex-col gap-1 px-2 pb-3 sm:pb-0">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Bed className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Quartos
            </label>
            <Select value={selectedBedrooms} onValueChange={(val) => val && setSelectedBedrooms(val)}>
              <SelectTrigger className="border-0 p-0 h-8 shadow-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-white bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {['1+', '2+', '3+', '4+', '5+'].map((b) => (
                  <SelectItem key={b} value={b} className="font-medium text-sm">
                    {b} Quartos
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botão Buscar */}
          <div className="lg:col-span-2">
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[#00965e] hover:bg-[#008050] text-white font-bold text-sm shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              <span>Buscar</span>
            </Button>
          </div>

        </form>
      </div>
    </section>
  )
}
