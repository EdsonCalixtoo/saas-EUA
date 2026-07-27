"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { SocialButtons } from "./SocialButtons"
import { toast } from "sonner" // Assuming sonner is installed based on standard Shadcn projects

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    setGlobalError(null)

    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate Authentication Logic for Demo
      if (data.email === "error@server.com") {
        throw new Error("SERVER_ERROR")
      }
      
      if (data.password !== "password123" && data.password !== "123456") {
        // Just for demo, let's say password123 is the only valid one
        setGlobalError("Incorrect email or password.")
        setIsSubmitting(false)
        return
      }

      // Success
      localStorage.setItem("propflow_jwt", "dummy_jwt_token_123abc")
      localStorage.setItem("propflow_refresh", "dummy_refresh_token_456def")
      localStorage.setItem("propflow_user", JSON.stringify({ email: data.email, role: "admin" }))
      localStorage.setItem("propflow_permissions", JSON.stringify(["read", "write", "delete"]))

      router.push("/dashboard")
    } catch (error: any) {
      if (error.message === "SERVER_ERROR") {
        toast.error("Unable to connect to the server. Please try again.")
      }
      setIsSubmitting(false)
    }
  }

  // Animation variants for the Shake effect on error
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8"
    >
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Access your Real Estate CRM and manage leads, properties, clients and sales from anywhere.
        </p>
      </div>

      <motion.div 
        variants={shakeVariants}
        animate={globalError ? "shake" : ""}
      >
        <AnimatePresence>
          {globalError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-start gap-3 text-[#EF4444]"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm font-medium">{globalError}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#2563EB] transition-colors" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#2563EB]/20 ${
                  errors.email || globalError 
                    ? "border-[#EF4444] focus:border-[#EF4444]" 
                    : "border-border focus:border-[#2563EB]"
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-[#EF4444] text-xs font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#2563EB] transition-colors" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full h-11 pl-10 pr-10 rounded-lg border bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#2563EB]/20 ${
                  errors.password || globalError 
                    ? "border-[#EF4444] focus:border-[#EF4444]" 
                    : "border-border focus:border-[#2563EB]"
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0F172A] transition-colors"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[#EF4444] text-xs font-medium">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  {...register("remember")}
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-border checked:bg-[#2563EB] checked:border-[#2563EB] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                <svg
                  className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-[#0F172A] transition-colors">
                Remember me
              </span>
            </label>
            
            <a href="#" className="text-sm font-semibold text-[#2563EB] hover:text-[#7C3AED] transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="relative w-full h-11 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing you in...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
            
            {/* Subtle glow effect on the button itself */}
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>
        </form>
      </motion.div>

      <div className="my-8 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative px-4 bg-white text-xs font-semibold text-muted-foreground tracking-widest">
          OR
        </div>
      </div>

      <SocialButtons />

      <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
        Don't have an account?{" "}
        <a href="#" className="text-[#2563EB] font-semibold hover:text-[#7C3AED] transition-colors">
          Create your account
        </a>
      </p>
    </motion.div>
  )
}
