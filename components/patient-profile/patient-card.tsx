import { User, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PatientCardProps {
  initials: string
  fullName: string
  age: number
  height: string
  weight: string
  status: "Stable" | "Critical" | "Unstable"
}

export function PatientCard({ initials, fullName, age, height, weight, status }: PatientCardProps) {
  const statusColors = {
    Stable: "bg-success text-success-foreground",
    Critical: "bg-critical text-critical-foreground",
    Unstable: "bg-warning text-warning-foreground",
  }

  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/20">
              <span className="text-3xl font-bold text-primary-foreground tracking-tight">{initials}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success border-4 border-card flex items-center justify-center">
              <User className="w-3 h-3 text-success-foreground" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <h2 className="text-2xl font-bold text-foreground tracking-tight text-balance">{fullName}</h2>
              <Badge
                className={`${statusColors[status]} px-3 py-1 text-xs font-semibold shadow-sm w-fit mx-auto sm:mx-0`}
              >
                Ready / {status}
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{age}</span>
                <span>years old</span>
              </div>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{height}</span>
                <span>height</span>
              </div>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{weight}</span>
                <span>weight</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-primary hover:text-primary hover:bg-primary/5 border-primary/20 bg-transparent"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
