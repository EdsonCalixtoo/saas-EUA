"use client"

import * as React from "react"
import { Plus, MessageSquareMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SmsCampaign } from "@/lib/mock-data/sms"

interface CampaignsTabProps {
  campaigns: SmsCampaign[]
  onNewCampaignClick: () => void
}

export function CampaignsTab({ campaigns, onNewCampaignClick }: CampaignsTabProps) {
  const [showAll, setShowAll] = React.useState(false)

  // Default show initial 4 items matching screenshot, expand on 'View all'
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
        {visibleCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4 first:pt-1 last:pb-1"
          >
            {/* Left: Green Message Icon + Campaign Title */}
            <div className="flex items-center gap-4 min-w-[240px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/60 shrink-0">
                <MessageSquareMore className="h-5 w-5 stroke-[2.2]" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                {camp.name}
              </span>
            </div>

            {/* Center: Sent Count */}
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 sm:text-center min-w-[120px]">
              {camp.sentCount.toLocaleString()} Sent
            </div>

            {/* Right: Delivery Rate Green Progress Bar + Percentage */}
            <div className="flex items-center gap-3 sm:justify-end min-w-[200px] sm:min-w-[280px]">
              <div className="flex-1 sm:w-48 lg:w-64 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-[#00965e] transition-all duration-500"
                  style={{ width: `${camp.deliveryRate}%` }}
                />
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 w-10 text-right">
                {camp.deliveryRate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 'View all' link */}
      <div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm transition-colors"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>
    </div>
  )
}
