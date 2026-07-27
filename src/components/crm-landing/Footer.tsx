import Link from "next/link"
import { Building2, Globe, Mail, MessageSquare, Share2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-transparent pt-20 pb-10 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#0F172A] dark:text-white">
                PropFlow
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              The smartest CRM for modern real estate teams. Manage leads, automate follow-ups, and close more deals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-[#E1306C] hover:border-[#E1306C] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:border-[#1877F2] transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-[#FF0000] hover:border-[#FF0000] transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0F172A] dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#products" className="hover:text-[#2563EB] transition-colors">Products</Link></li>
              <li><Link href="#pricing" className="hover:text-[#2563EB] transition-colors">Pricing</Link></li>
              <li><Link href="#about" className="hover:text-[#2563EB] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#2563EB] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PropFlow Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
