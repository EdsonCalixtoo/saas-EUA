"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFFFF]/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0F172A] dark:text-white">
            PropFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#home" className="text-sm font-medium text-muted-foreground hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <Link href="#products" className="text-sm font-medium text-muted-foreground hover:text-[#2563EB] transition-colors">
            Products
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-[#2563EB] transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-[#2563EB] transition-colors">
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 text-[#0F172A] dark:text-white hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] hover:bg-[#2563EB] dark:hover:bg-[#2563EB] dark:hover:text-white transition-all shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
