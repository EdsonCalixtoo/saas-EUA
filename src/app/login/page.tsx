import { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"
import { LoginVisuals } from "@/components/auth/LoginVisuals"
import { Building2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In - PropFlow CRM",
  description: "Sign in to your PropFlow CRM account to manage your real estate business.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white selection:bg-[#2563EB] selection:text-white">
      {/* Left Column - Form (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col relative min-h-screen">
        {/* Logo Header */}
        <div className="p-6 md:p-8 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0F172A]">
              PropFlow
            </span>
          </Link>
        </div>

        {/* Centered Form Area */}
        <div className="flex-1 flex flex-col justify-center pb-12">
          <LoginForm />
        </div>
      </div>

      {/* Right Column - Premium Visuals (55%) */}
      <div className="hidden lg:block lg:w-[55%] border-l border-border/50 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-10">
        <LoginVisuals />
      </div>
    </div>
  )
}
