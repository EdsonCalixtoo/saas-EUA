"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function Forms() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <section className="space-y-12 pt-12 border-t border-border-subtle">
      <div className="space-y-2 pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Forms & Inputs</h2>
        <p className="text-muted-foreground text-lg">Input fields, switches, textareas, and date selection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Text Inputs */}
        <div className="space-y-8">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Text Inputs</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Default</label>
            <Input placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hover / Focus-visible</label>
            <Input placeholder="Focused input..." className="ring-2 ring-ring ring-offset-2 ring-offset-background border-transparent" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled</label>
            <Input placeholder="Disabled input" disabled />
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-destructive flex items-center gap-1">
              Error <AlertCircle className="w-3 h-3" />
            </label>
            <Input 
              placeholder="Error input" 
              className="border-destructive focus-visible:ring-destructive pr-10" 
              defaultValue="invalid@email" 
            />
            <AlertCircle className="w-4 h-4 text-destructive absolute right-3 top-[30px]" />
            <p className="text-xs text-destructive">Please enter a valid email address.</p>
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-success flex items-center gap-1">
              Success <CheckCircle2 className="w-3 h-3" />
            </label>
            <Input 
              placeholder="Success input" 
              className="border-success focus-visible:ring-success pr-10" 
              defaultValue="valid@email.com" 
            />
            <CheckCircle2 className="w-4 h-4 text-success absolute right-3 top-[30px]" />
          </div>
        </div>

        {/* Textareas & Selects */}
        <div className="space-y-8">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Selects & Textareas</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select (Default)</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a pipeline stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Lead</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="offer">Offer Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select (Disabled)</label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Disabled selection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Textarea (Default)</label>
            <Textarea placeholder="Type your property notes here..." className="min-h-[120px] resize-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-destructive">Textarea (Error)</label>
            <Textarea placeholder="Required field" className="min-h-[80px] resize-none border-destructive focus-visible:ring-destructive" />
            <p className="text-xs text-destructive">Notes cannot be empty.</p>
          </div>
        </div>

        {/* Toggles, Checkboxes, Radios */}
        <div className="space-y-8">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Toggles & Choices</h3>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Switches</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">Receive daily summaries.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">SMS Alerts (Disabled)</label>
                  <p className="text-xs text-muted-foreground">Requires premium plan.</p>
                </div>
                <Switch disabled />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Checkboxes</h4>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" defaultChecked />
                <label htmlFor="terms" className="text-sm font-medium leading-none cursor-pointer">
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <Checkbox id="terms2" disabled />
                <label htmlFor="terms2" className="text-sm font-medium leading-none cursor-not-allowed">
                  Marketing emails (Disabled)
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Radio Groups</h4>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <label htmlFor="r1" className="text-sm font-medium cursor-pointer">Default styling</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <label htmlFor="r2" className="text-sm font-medium cursor-pointer">Comfortable styling</label>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <RadioGroupItem value="compact" id="r3" disabled />
                  <label htmlFor="r3" className="text-sm font-medium cursor-not-allowed">Compact (Disabled)</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-border-subtle pb-2">Calendar (Date Selection)</h3>
          <div className="border border-border-subtle rounded-xl p-4 inline-block bg-card shadow-sm">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
