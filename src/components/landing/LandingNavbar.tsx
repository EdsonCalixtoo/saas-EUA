"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Sparkles, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function LandingNavbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Comprar", href: "#imoveis" },
    { label: "Alugar", href: "#imoveis" },
    { label: "Anunciar", href: "#diferenciais" },
    { label: "Corretores", href: "#personas" },
    { label: "Imobiliárias", href: "#personas" },
    { label: "Recursos", href: "#diferenciais" },
    { label: "Preços", href: "#estatisticas" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              PropFlow
              <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Sparkles className="h-2.5 w-2.5" /> PRO
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-4"
            >
              Entrar
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm px-5 h-11 rounded-2xl shadow-md shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <span>Começar Gratuitamente</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Drawer */}
        <div className="flex lg:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger>
              <div
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">PropFlow</span>
                </div>

                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 py-2 border-b border-slate-100 dark:border-slate-800"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link href="/dashboard" className="w-full">
                  <Button variant="outline" className="w-full h-11 rounded-xl font-bold">
                    Entrar
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full h-11 rounded-xl bg-indigo-600 text-white font-bold">
                    Começar Gratuitamente
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
