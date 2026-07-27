"use client"

import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Building2, Mail, ArrowRight, Globe, Share2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function LandingFooter() {
  const [email, setEmail] = React.useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("Obrigado por se inscrever na nossa newsletter!")
    setEmail("")
  }

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">PropFlow</span>
            </div>

            <p className="text-sm font-normal text-slate-400 leading-relaxed max-w-sm">
              A plataforma imobiliária de alto padrão que conecta compradores, proprietários, corretores e imobiliárias com inteligência artificial.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mt-2">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white rounded-xl h-10 text-xs"
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-10 px-4">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Quick Links 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegação</h4>
            <a href="#imoveis" className="text-xs hover:text-white transition-colors">Comprar Imóveis</a>
            <a href="#imoveis" className="text-xs hover:text-white transition-colors">Alugar Imóveis</a>
            <a href="#diferenciais" className="text-xs hover:text-white transition-colors">Anunciar Imóvel</a>
            <a href="#personas" className="text-xs hover:text-white transition-colors">Para Corretores</a>
            <a href="#personas" className="text-xs hover:text-white transition-colors">Para Imobiliárias</a>
          </div>

          {/* Quick Links 2 */}
          <div className="flex flex-col gap-3">
            <Link to="/pipeline" className="text-xs hover:text-white transition-colors">CRM de Vendas</Link>
            <Link to="/calls" className="text-xs hover:text-white transition-colors">Power Dialer</Link>
            <Link to="/sms" className="text-xs hover:text-white transition-colors">SMS Marketing</Link>
            <Link to="/email" className="text-xs hover:text-white transition-colors">Email Marketing</Link>
            <Link to="/" className="text-xs hover:text-white transition-colors">Analytics & Relatórios</Link>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contato & Suporte</h4>
            <span className="text-xs flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-indigo-400" /> suporte@propflow.com.br</span>
            <span className="text-xs flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-indigo-400" /> +55 (11) 4003-8920</span>
            
            <div className="flex items-center gap-3 pt-3">
              <span className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"><Globe className="h-4 w-4" /></span>
              <span className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"><Share2 className="h-4 w-4" /></span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <span>© 2026 PropFlow Real Estate SaaS Inc. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-slate-400 cursor-pointer">Segurança</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
