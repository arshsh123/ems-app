import { HeartPulse, Pill } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Condition {
  name: string
  severity: "high" | "moderate" | "low"
}

interface Medication {
  name: string
  dosage: string
}

interface ConditionsCardProps {
  conditions: Condition[]
  medications: Medication[]
}

export function ConditionsCard({ conditions, medications }: ConditionsCardProps) {
  const severityConfig = {
    high: { dot: "bg-critical", ring: "ring-critical/30" },
    moderate: { dot: "bg-warning", ring: "ring-warning/30" },
    low: { dot: "bg-success", ring: "ring-success/30" },
  }

  return (
    <Card className="border-0 card-elevated h-full overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-primary" />

      <CardHeader className="pb-3 pt-5">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <HeartPulse className="w-4 h-4 text-primary" />
          </div>
          Conditions & Meds
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-5">
        <div className="space-y-5">
          {/* Conditions */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <HeartPulse className="w-3 h-3" />
              Active Conditions
            </p>
            <div className="space-y-2">
              {conditions.map((condition, index) => {
                const config = severityConfig[condition.severity]
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 bg-muted/40 rounded-lg px-3 py-2 border border-border/30"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${config.dot} ring-2 ${config.ring}`} />
                    <span className="text-sm font-medium text-foreground">{condition.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/50" />

          {/* Medications */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Pill className="w-3 h-3" />
              Medications
            </p>
            <div className="space-y-2">
              {medications.map((medication, index) => (
                <div key={index} className="bg-muted/40 rounded-lg px-3 py-2 border border-border/30">
                  <p className="text-sm font-medium text-foreground">{medication.name}</p>
                  <p className="text-xs text-muted-foreground">{medication.dosage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
