import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginVisuals } from '@/components/auth/LoginVisuals';
import { DealVantaLogo } from '@/components/crm/DealVantaLogo';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: "Sign In — DealVanta CRM" },
      { name: "description", content: "Sign in to your DealVanta CRM account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white selection:bg-[#2563EB] selection:text-white">
      {/* Left Column - Form (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col relative min-h-screen">
        {/* Logo Header */}
        <div className="p-6 md:p-8 flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <DealVantaLogo size="md" />
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
  );
}
