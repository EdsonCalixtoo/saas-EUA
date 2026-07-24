"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FeaturedProperty } from "@/lib/mock-data/landing"
import { MapPin, Bed, Bath, Car, Maximize, MessageSquare, Calendar, Phone } from "lucide-react"
import { toast } from "sonner"

interface PropertyDetailModalProps {
  property: FeaturedProperty | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertyDetailModal({
  property,
  open,
  onOpenChange,
}: PropertyDetailModalProps) {
  const [selectedImg, setSelectedImg] = React.useState<string>("")

  React.useEffect(() => {
    if (property) {
      setSelectedImg(property.imageUrl)
    }
  }, [property])

  if (!property) return null

  const handleContactWhatsApp = () => {
    toast.success(`Redirecionando para o WhatsApp do corretor ${property.brokerName || "responsável"}...`)
  }

  const handleScheduleTour = () => {
    toast.success(`Visita solicitada para "${property.title}". Entraremos em contato para confirmar a data!`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] rounded-3xl p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        
        {/* Main Photo Gallery View */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
          <Image
            src={selectedImg || property.imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-all duration-300"
            unoptimized
          />
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20">
            {property.tag}
          </div>
          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {property.price}
            </span>
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        {property.gallery && property.gallery.length > 1 && (
          <div className="flex items-center gap-2 px-6 pt-3 overflow-x-auto">
            {property.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(img)}
                className={`relative h-14 w-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImg === img ? "border-indigo-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="Thumb" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}

        {/* Body Info */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              {property.city} • {property.neighborhood}
            </span>
            <DialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {property.title}
            </DialogTitle>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center">
            <div className="flex flex-col items-center gap-1">
              <Maximize className="h-4 w-4 text-indigo-600" />
              <span>{property.area} m²</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bed className="h-4 w-4 text-indigo-600" />
              <span>{property.bedrooms} Quartos</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath className="h-4 w-4 text-indigo-600" />
              <span>{property.bathrooms} Banheiros</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Car className="h-4 w-4 text-indigo-600" />
              <span>{property.parkingSpots} Vagas</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {property.description}
          </p>

          {/* Broker Card & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {property.brokerName && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image src={property.brokerAvatar || ""} alt="Broker" fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{property.brokerName}</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Corretor Credenciado</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                onClick={handleContactWhatsApp}
                variant="outline"
                className="rounded-xl h-11 text-xs font-bold gap-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
              >
                <MessageSquare className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                WhatsApp
              </Button>

              <Button
                onClick={handleScheduleTour}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 text-xs font-bold gap-2 px-5"
              >
                <Calendar className="h-4 w-4" />
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
