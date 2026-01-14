import { Activity, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  lastSynced: string
}

export function Header({ lastSynced }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">MediResponse</h1>
            <p className="text-xs text-muted-foreground">Patient Profile View</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Last Synced: {lastSynced}</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-semibold">
            DR
          </Badge>
        </div>
      </div>
    </header>
  )
}
