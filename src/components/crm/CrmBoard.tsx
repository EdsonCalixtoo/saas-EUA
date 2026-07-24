"use client"

import * as React from "react"
import { crmColumns, ColumnData, initialLeads, Lead } from "@/lib/mock-data/crm"
import { CrmHeader } from "./CrmHeader"
import { CrmColumn } from "./CrmColumn"
import { AddLeadDialog } from "./AddLeadDialog"
import { LeadDetailDialog } from "./LeadDetailDialog"

export function CrmBoard() {
  const [leads, setLeads] = React.useState<Lead[]>(initialLeads)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [targetColumnForAdd, setTargetColumnForAdd] = React.useState<Lead["status"]>("new")
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  // Filter leads based on search query
  const filteredLeads = React.useMemo(() => {
    if (!searchQuery.trim()) return leads
    const query = searchQuery.toLowerCase().trim()
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
    )
  }, [leads, searchQuery])

  // Group leads by column
  const leadsByColumn = React.useMemo(() => {
    const map: Record<Lead["status"], Lead[]> = {
      new: [],
      contacted: [],
      interested: [],
      offer_sent: [],
      negotiation: [],
    }

    filteredLeads.forEach((lead) => {
      if (map[lead.status]) {
        map[lead.status].push(lead)
      }
    })

    return map
  }, [filteredLeads])

  const handleOpenAddForColumn = (columnId: ColumnData["id"]) => {
    setTargetColumnForAdd(columnId)
    setIsAddOpen(true)
  }

  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev])
  }

  const handleCardClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  const handleUpdateStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    )
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId))
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null)
    }
  }

  return (
    <div className="flex flex-col h-full w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Header & Toolbar */}
      <CrmHeader
        onAddLeadClick={() => handleOpenAddForColumn("new")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main 5-Column Pipeline Kanban View */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1250px] items-stretch min-h-[640px]">
          {crmColumns.map((col) => {
            const colLeads = leadsByColumn[col.id] || []
            return (
              <CrmColumn
                key={col.id}
                column={{
                  ...col,
                  leadsCount: colLeads.length,
                }}
                leads={colLeads}
                onCardClick={handleCardClick}
                onAddLeadToColumn={handleOpenAddForColumn}
              />
            )
          })}
        </div>
      </div>

      {/* Modals */}
      <AddLeadDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onAddLead={handleAddLead}
        defaultStatus={targetColumnForAdd}
      />

      <LeadDetailDialog
        lead={selectedLead}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
      />
    </div>
  )
}
