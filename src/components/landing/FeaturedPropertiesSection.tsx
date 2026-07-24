"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Share2, MapPin, Bed, Bath, Car, Maximize, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featuredPropertiesData, FeaturedProperty } from "@/lib/mock-data/landing"
import { PropertyDetailModal } from "./PropertyDetailModal"
import { toast } from "sonner"

export function FeaturedPropertiesSection() {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})
  const [selectedProp, setSelectedProp] = React.useState<FeaturedProperty | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const toggleFavorite = (id: string, title: string) => {
    setFavorites((prev) => {
      const next = !prev[id]
      toast(next ? `Imóvel "${title}" adicionado aos favoritos!` : `Removido dos favoritos`)
      return { ...prev, [id]: next }
    })
  }

  const handleShare = (title: string) => {
    toast.success(`Link de "${title}" copiado para compartilhar!`)
  }

  const handleOpenDetails = (prop: FeaturedProperty) => {
    setSelectedProp(prop)
    setIsModalOpen(true)
  }

  return (
    <section id="imoveis" className="py-24 bg-slate-50/70 dark:bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-200/50 self-start">
              Portfólio Selecionado
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Imóveis de Alto Padrão em Destaque
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl">
              Confira algumas das melhores oportunidades disponíveis para compra e investimento.
            </p>
          </div>

          <Link href="/properties">
            <Button className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold rounded-2xl h-11 px-6 gap-2">
              <span>Ver Todos os Imóveis</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPropertiesData.map((prop, idx) => {
            const isFav = !!favorites[prop.id]

            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
              >
                {/* Top Image Container */}
                <div className="relative h-56 w-full overflow-hidden cursor-pointer" onClick={() => handleOpenDetails(prop)}>
                  <Image
                    src={prop.imageUrl}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  
                  {/* Overlay Tag */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20">
                    {prop.tag}
                  </div>

                  {/* Top Right Favorite & Share Action Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(prop.id, prop.title)
                      }}
                      className={`h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        isFav
                          ? "bg-red-500 text-white border-red-500"
                          : "bg-white/80 text-slate-700 hover:bg-white border-white/60"
                      }`}
                      aria-label="Favoritar"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(prop.title)
                      }}
                      className="h-9 w-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-md border border-white/60 flex items-center justify-center transition-all"
                      aria-label="Compartilhar"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price Tag Bottom Left */}
                  <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-md">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {prop.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col p-5 gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1 cursor-pointer" onClick={() => handleOpenDetails(prop)}>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      {prop.city} • {prop.neighborhood}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">
                      {prop.title}
                    </h3>
                  </div>

                  {/* Features Specs: Area, Beds, Baths, Parking */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="h-3.5 w-3.5 text-slate-400" />
                      <span>{prop.area} m²</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Bed className="h-3.5 w-3.5 text-slate-400" />
                      <span>{prop.bedrooms} Quarto{prop.bedrooms > 1 ? "s" : ""}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Car className="h-3.5 w-3.5 text-slate-400" />
                      <span>{prop.parkingSpots} Vaga{prop.parkingSpots > 1 ? "s" : ""}</span>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <Button
                    onClick={() => handleOpenDetails(prop)}
                    className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-100 font-bold rounded-xl h-10 text-xs transition-colors"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Property Detail Gallery Modal */}
      <PropertyDetailModal
        property={selectedProp}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  )
}
