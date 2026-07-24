"use client"

import * as React from "react"
import { Plus, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmailCampaign } from "@/lib/mock-data/email"

interface EmailCampaignsTabProps {
  campaigns: EmailCampaign[]
  onNewCampaignClick: () => void
}

export function EmailCampaignsTab({ campaigns, onNewCampaignClick }: EmailCampaignsTabProps) {
  const [showAll, setShowAll] = React.useState(false)

  // Default show initial 4 items matching screenshot
  const visibleCampaigns = showAll ? campaigns : campaigns.slice(0, 4)

  return (
    <div className="flex flex-col gap-6">
      {/* Sub Header: All Campaigns Title + New Campaign Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          All Campaigns
        </h2>

        <Button
          onClick={onNewCampaignClick}
          className="bg-[#00965e] hover:bg-[#008050] text-white font-semibold h-11 px-5 rounded-xl shadow-2xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="h-5 w-5 stroke-[2.5]" />
          New Campaign
        </Button>
      </div>

      {/* Main List Container */}
      <div className="flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/60 p-4 sm:p-6 shadow-2xs divide-y divide-slate-200/70 dark:divide-slate-800">
        {visibleCampaigns.map((camp) => {
          const unopenedRate = Math.max(0, 100 - camp.openRate - camp.clickRate)

          return (
            <div
              key={camp.id}
              className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4 first:pt-1 last:pb-1"
            >
              {/* Left: Green Email Icon + Campaign Title */}
              <div className="flex items-center gap-4 min-w-[260px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/60 shrink-0">
                  <Mail className="h-5 w-5 stroke-[2.2]" />
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  {camp.name}
                </span>
              </div>

              {/* Center: Sent Count */}
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 md:text-center min-w-[120px]">
                {camp.sentCount.toLocaleString()} Sent
              </div>

              {/* Right: Multi-Segmented Progress Bar & Percentages */}
              <div className="flex items-center gap-4 md:justify-end min-w-[240px] md:min-w-[320px]">
                <div className="flex flex-col gap-1.5 flex-1 md:w-56 lg:w-72">
                  {/* Multi-color Segmented Bar */}
                  <div className="flex h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    {/* Opened (Green) */}
                    <div
                      className="h-full bg-[#00965e] transition-all duration-500"
                      style={{ width: `${camp.openRate}%` }}
                    />
                    {/* Clicked (Purple) */}
                    <div
                      className="h-full bg-[#7C3AED] transition-all duration-500"
                      style={{ width: `${camp.clickRate}%` }}
                    />
                    {/* Unopened (Light Grey) */}
                    <div
                      className="h-full bg-slate-300 dark:bg-slate-700 transition-all duration-500"
                      style={{ width: `${unopenedRate}%` }}
                    />
                  </div>

                  {/* Sub-badge under progress bar: Dot + 81% */}
                  <div className="flex items-center justify-end gap-1 text-[13px] font-bold text-[#7C3AED] dark:text-purple-400">
                    <span className="h-2 w-2 rounded-full bg-[#00965e]" />
                    <span>{camp.openRate}%</span>
                  </div>
                </div>

                {/* Click Rate (e.g. 8%, 6%, 9%, 5%) on far right */}
                <span className="font-bold text-base text-slate-900 dark:text-slate-100 w-10 text-right shrink-0">
                  {camp.clickRate}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Legend & View All Link Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        {/* Left Legend Indicators */}
        <div className="flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00965e]" />
            <span>Opened</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
            <span>Clicked</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Unopened</span>
          </div>
        </div>

        {/* Right Green Link 'View all' */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#00965e] hover:text-[#008050] font-bold text-sm transition-colors cursor-pointer"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>
    </div>
  )
}
