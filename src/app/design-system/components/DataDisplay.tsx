"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataGrid, Column } from "@/components/ui/data-grid"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TrendingUp, Users, DollarSign, Building, Phone } from "lucide-react"

const leadsData = [
  { id: "1", name: "Robert Johnson", property: "123 Oak St", status: "New", value: "$245,000" },
  { id: "2", name: "Sarah Williams", property: "456 Elm St", status: "Contacted", value: "$310,000" },
  { id: "3", name: "Michael Brown", property: "789 Pine Ave", status: "Offer Sent", value: "$185,000" },
]

const columns: Column<typeof leadsData[0]>[] = [
  { header: "Lead Name", accessorKey: "name", cell: (item) => <span className="font-medium">{item.name}</span> },
  { header: "Property", accessorKey: "property" },
  { header: "Status", accessorKey: "status", cell: (item) => (
    <Badge variant={item.status === "New" ? "default" : item.status === "Contacted" ? "secondary" : "outline"} className={item.status === "New" ? "bg-info text-info-foreground hover:bg-info/90" : ""}>
      {item.status}
    </Badge>
  ) },
  { header: "Est. Value", accessorKey: "value", cell: (item) => <span className="font-mono text-muted-foreground">{item.value}</span> },
]

export function DataDisplay() {
  return (
    <section className="space-y-12 pt-12 border-t border-border-subtle">
      <div className="space-y-2 pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Data Display & Cards</h2>
        <p className="text-muted-foreground text-lg">Presenting complex real estate data elegantly.</p>
      </div>

      {/* Metric Cards */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Metric Cards & Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">$185,500</div>
              <p className="text-xs text-success flex items-center mt-1 font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">128</div>
              <p className="text-xs text-success flex items-center mt-1 font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> +14.5% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Campaign Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">SMS Campaign (Memphis)</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Email Sequence (Buyers)</span>
                  <span className="text-muted-foreground">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Property Cards & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        <div className="space-y-6 col-span-2">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Data Grid & Tables</h3>
          <DataGrid data={leadsData} columns={columns} onRowClick={(item) => console.log(item)} />
          
          <div className="pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2 mt-12">Accordions</h3>
          <Accordion className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the estimated ROI for this property?</AccordionTrigger>
              <AccordionContent>
                The estimated ROI is between 12% and 15% depending on renovation costs and timeline.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long has it been off-market?</AccordionTrigger>
              <AccordionContent>
                This property has not been listed on the MLS for over 12 years.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-8">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Badges, Avatars & Chips</h3>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Semantic Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-success text-success-foreground hover:bg-success/90">Success</Badge>
              <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Warning</Badge>
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Error</Badge>
              <Badge className="bg-info text-info-foreground hover:bg-info/90">Info</Badge>
              <Badge className="bg-ai text-ai-foreground hover:bg-ai/90 shadow-glow shadow-ai/20">AI Insight</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Avatars & Groups</h4>
            <div className="flex items-center gap-6">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="flex -space-x-4">
                <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?u=2" /></Avatar>
                <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?u=3" /></Avatar>
                <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?u=4" /></Avatar>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">+3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
