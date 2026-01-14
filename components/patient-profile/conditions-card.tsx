import { HeartPulse } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Condition {
  name: string
  severity: "high" | "moderate" | "low"
}

interface ConditionsCardProps {
  conditions: Condition[]
}

export function ConditionsCard({ conditions }: ConditionsCardProps) {
  const severityDotColors = {
    high: "bg-critical",
    moderate: "bg-warning",
    low: "bg-primary",
  }

  return (
    <Card className="bg-card border-border shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <div className="p-2 rounded-lg bg-critical/10">
            <HeartPulse className="w-4 h-4 text-critical" />
          </div>
          Active Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-secondary/50">
              <div
                className={`w-2.5 h-2.5 rounded-full ${severityDotColors[condition.severity]} shadow-sm ring-2 ring-offset-1 ring-offset-card ${condition.severity === "high" ? "ring-critical/30" : condition.severity === "moderate" ? "ring-warning/30" : "ring-primary/30"}`}
              />
              <span className="text-sm font-medium text-foreground">{condition.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
