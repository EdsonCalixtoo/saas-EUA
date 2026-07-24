"use client"

import * as React from "react"
import { Mail, X } from "lucide-react"
import {
  initialEmailCampaigns,
  initialEmailTemplates,
  EmailCampaign,
  EmailTemplate,
} from "@/lib/mock-data/email"
import { EmailCampaignsTab } from "./EmailCampaignsTab"
import { EmailTemplatesTab } from "./EmailTemplatesTab"
import { NewEmailCampaignModal } from "./NewEmailCampaignModal"
import { cn } from "@/lib/utils"

export function EmailScreen() {
  const [activeTab, setActiveTab] = React.useState<"campaigns" | "templates">("campaigns")
  const [campaigns, setCampaigns] = React.useState<EmailCampaign[]>(initialEmailCampaigns)
  const [templates] = React.useState<EmailTemplate[]>(initialEmailTemplates)
  const [isNewModalOpen, setIsNewModalOpen] = React.useState(false)

  const handleAddCampaign = (newCampaign: EmailCampaign) => {
    setCampaigns((prev) => [newCampaign, ...prev])
  }

  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* ─── Top Header: Icon + Title + Close X ─── */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/60 shadow-2xs">
            <Mail className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Email Campaign
          </h1>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-6 w-6 stroke-[2]" />
        </button>
      </div>

      {/* ─── Top Navigation Tabs ─── */}
      <div className="flex items-end gap-2 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={cn(
            "rounded-t-2xl px-6 py-3 font-bold text-sm transition-all duration-150 relative",
            activeTab === "campaigns"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200/80 dark:border-slate-800 shadow-2xs -mb-px"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
          )}
        >
          Campaigns
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "rounded-t-2xl px-6 py-3 font-semibold text-sm transition-all duration-150 relative",
            activeTab === "templates"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200/80 dark:border-slate-800 shadow-2xs -mb-px font-bold"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          Templates
        </button>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="flex-1 rounded-b-3xl rounded-tr-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs mt-0">
        {activeTab === "campaigns" ? (
          <EmailCampaignsTab
            campaigns={campaigns}
            onNewCampaignClick={() => setIsNewModalOpen(true)}
          />
        ) : (
          <EmailTemplatesTab templates={templates} />
        )}
      </div>

      {/* New Email Campaign Modal */}
      <NewEmailCampaignModal
        open={isNewModalOpen}
        onOpenChange={setIsNewModalOpen}
        onAddCampaign={handleAddCampaign}
      />
    </div>
  )
}
