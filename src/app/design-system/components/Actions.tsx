import * as React from "react"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/ui/loading"
import { ChevronRight, Settings, Plus, Sparkles } from "lucide-react"

export function Actions() {
  return (
    <section className="space-y-12 pt-12 border-t border-border-subtle">
      <div className="space-y-2 pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Buttons & Actions</h2>
        <p className="text-muted-foreground text-lg">Interactive states across all semantic variants.</p>
      </div>

      <div className="grid grid-cols-1 overflow-x-auto pb-4">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 font-medium text-sm text-muted-foreground w-48">Variant</th>
              <th className="py-4 font-medium text-sm text-muted-foreground">Default</th>
              <th className="py-4 font-medium text-sm text-muted-foreground">Hover / Focus-visible</th>
              <th className="py-4 font-medium text-sm text-muted-foreground">Active</th>
              <th className="py-4 font-medium text-sm text-muted-foreground">Disabled</th>
              <th className="py-4 font-medium text-sm text-muted-foreground">Loading</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            
            {/* Primary */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Primary</td>
              <td><Button>Submit</Button></td>
              <td><Button className="bg-primary/90 ring-2 ring-ring ring-offset-2 ring-offset-background">Submit</Button></td>
              <td><Button className="scale-95 transition-transform">Submit</Button></td>
              <td><Button disabled>Submit</Button></td>
              <td><Button disabled><Loading size={16} className="mr-2 p-0 text-primary-foreground" /> Wait</Button></td>
            </tr>

            {/* Secondary */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Secondary</td>
              <td><Button variant="secondary">Cancel</Button></td>
              <td><Button variant="secondary" className="bg-secondary/80 ring-2 ring-ring ring-offset-2 ring-offset-background">Cancel</Button></td>
              <td><Button variant="secondary" className="scale-95 transition-transform">Cancel</Button></td>
              <td><Button variant="secondary" disabled>Cancel</Button></td>
              <td><Button variant="secondary" disabled><Loading size={16} className="mr-2 p-0 text-secondary-foreground" /> Wait</Button></td>
            </tr>

            {/* Outline */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Outline</td>
              <td><Button variant="outline">View Details</Button></td>
              <td><Button variant="outline" className="bg-accent text-accent-foreground ring-2 ring-ring ring-offset-2 ring-offset-background">View Details</Button></td>
              <td><Button variant="outline" className="scale-95 transition-transform bg-accent">View Details</Button></td>
              <td><Button variant="outline" disabled>View Details</Button></td>
              <td><Button variant="outline" disabled><Loading size={16} className="mr-2 p-0 text-foreground" /> Wait</Button></td>
            </tr>

            {/* Ghost */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Ghost</td>
              <td><Button variant="ghost">Edit</Button></td>
              <td><Button variant="ghost" className="bg-accent text-accent-foreground ring-2 ring-ring ring-offset-2 ring-offset-background">Edit</Button></td>
              <td><Button variant="ghost" className="scale-95 transition-transform bg-accent text-accent-foreground">Edit</Button></td>
              <td><Button variant="ghost" disabled>Edit</Button></td>
              <td><Button variant="ghost" disabled><Loading size={16} className="mr-2 p-0 text-foreground" /> Wait</Button></td>
            </tr>

            {/* Semantic: Success */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Success</td>
              <td><Button className="bg-success text-success-foreground hover:bg-success/90">Approve</Button></td>
              <td><Button className="bg-success/90 text-success-foreground ring-2 ring-success/30 ring-offset-2 ring-offset-background">Approve</Button></td>
              <td><Button className="bg-success text-success-foreground scale-95 transition-transform">Approve</Button></td>
              <td><Button className="bg-success text-success-foreground opacity-50" disabled>Approve</Button></td>
              <td><Button className="bg-success text-success-foreground opacity-70" disabled><Loading size={16} className="mr-2 p-0 text-success-foreground" /> Wait</Button></td>
            </tr>

            {/* Semantic: Error / Destructive */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">Destructive</td>
              <td><Button variant="destructive">Delete</Button></td>
              <td><Button variant="destructive" className="bg-destructive/90 ring-2 ring-destructive/30 ring-offset-2 ring-offset-background">Delete</Button></td>
              <td><Button variant="destructive" className="scale-95 transition-transform">Delete</Button></td>
              <td><Button variant="destructive" disabled>Delete</Button></td>
              <td><Button variant="destructive" disabled><Loading size={16} className="mr-2 p-0 text-destructive-foreground" /> Wait</Button></td>
            </tr>

            {/* Semantic: AI */}
            <tr>
              <td className="py-6 font-mono text-sm text-muted-foreground">AI Action</td>
              <td><Button className="bg-ai text-ai-foreground hover:bg-ai/90 shadow-glow shadow-ai/20"><Sparkles className="w-4 h-4 mr-2" /> Analyze</Button></td>
              <td><Button className="bg-ai/90 text-ai-foreground ring-2 ring-ai/30 ring-offset-2 ring-offset-background shadow-glow shadow-ai/40"><Sparkles className="w-4 h-4 mr-2" /> Analyze</Button></td>
              <td><Button className="bg-ai text-ai-foreground scale-95 transition-transform"><Sparkles className="w-4 h-4 mr-2" /> Analyze</Button></td>
              <td><Button className="bg-ai text-ai-foreground opacity-50" disabled><Sparkles className="w-4 h-4 mr-2" /> Analyze</Button></td>
              <td><Button className="bg-ai text-ai-foreground opacity-70" disabled><Loading size={16} className="mr-2 p-0 text-ai-foreground" /> Wait</Button></td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className="space-y-4 pt-8">
        <h3 className="text-xl font-semibold">Icon Buttons & Sizes</h3>
        <div className="flex flex-wrap items-end gap-6">
          <Button size="lg"><Plus className="w-5 h-5 mr-2" /> Large Button</Button>
          <Button><Plus className="w-4 h-4 mr-2" /> Default Button</Button>
          <Button size="sm"><Plus className="w-3 h-3 mr-2" /> Small Button</Button>
          <Button size="icon" variant="outline" aria-label="Settings"><Settings className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost" className="rounded-full" aria-label="Next"><ChevronRight className="w-5 h-5" /></Button>
        </div>
      </div>
    </section>
  )
}
