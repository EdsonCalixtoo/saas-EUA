"use client"
import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Info } from "lucide-react"

export function Overlays() {
  return (
    <section className="space-y-12 pt-12 border-t border-border-subtle">
      <div className="space-y-2 pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Overlays & Navigation</h2>
        <p className="text-muted-foreground text-lg">Contextual menus, dialogs, tabs, breadcrumbs and tooltips.</p>
      </div>

      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/leads">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Robert Johnson</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Tabs */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Tabs</h3>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b border-border-subtle rounded-none bg-transparent p-0">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2">Properties</TabsTrigger>
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2">Activity</TabsTrigger>
              <TabsTrigger value="disabled" disabled className="rounded-none border-b-2 border-transparent px-4 py-2">Disabled</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">
              Overview content for the selected lead. Smooth transition on switch.
            </TabsContent>
            <TabsContent value="properties" className="pt-4 text-sm text-muted-foreground">
              Property listings associated with this lead.
            </TabsContent>
            <TabsContent value="activity" className="pt-4 text-sm text-muted-foreground">
              Recent calls, SMS, and emails.
            </TabsContent>
          </Tabs>
        </div>

        {/* Tooltips & Menus */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Menus & Tooltips</h3>
          
          <div className="flex gap-6 items-center">
            {/* Tooltip */}
            <Tooltip>
              <TooltipTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="glass">
                <p>This is a helpful tooltip.</p>
              </TooltipContent>
            </Tooltip>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Actions <MoreHorizontal className="ml-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass w-56">
                <DropdownMenuLabel>Lead Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Send Email</DropdownMenuItem>
                <DropdownMenuItem>Send SMS</DropdownMenuItem>
                <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete Lead</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Context Menu Area */}
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-border-strong text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="glass w-64">
              <ContextMenuItem>View Details</ContextMenuItem>
              <ContextMenuItem>Edit Property</ContextMenuItem>
              <ContextMenuItem>Assign to Teammate</ContextMenuItem>
              <DropdownMenuSeparator />
              <ContextMenuItem className="text-destructive">Archive</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        {/* Dialogs & Drawers */}
        <div className="space-y-6 md:col-span-2">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Modals & Drawers</h3>
          <div className="flex gap-4">
            
            {/* Dialog */}
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open Dialog
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <p className="text-sm text-muted-foreground">This dialog uses the elevated surface color.</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary">Cancel</Button>
                  <Button>Save changes</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Drawer */}
            <Drawer>
              <DrawerTrigger render={<Button variant="outline" />}>
                Open Drawer
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 h-[200px] flex items-center justify-center border-t border-border-subtle">
                  <p className="text-sm text-muted-foreground">Drawer content goes here. Excellent for mobile views.</p>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose render={<Button variant="outline" />}>
                    Cancel
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            
          </div>
        </div>

      </div>
    </section>
  )
}
