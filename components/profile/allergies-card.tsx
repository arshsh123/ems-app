import { Check, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Allergy {
  name: string
  severity: "high" | "moderate" | "low" | "none"
  risk: string
}

interface AllergiesCardProps {
  allergies: Allergy[]
}

export function AllergiesCard({ allergies }: AllergiesCardProps) {
  const severityConfig = {
    high: {
      label: "SEVERE",
      bg: "bg-critical",
      bgLight: "bg-critical/10",
      text: "text-critical",
      border: "border-critical/20",
    },
    moderate: {
      label: "MODERATE",
      bg: "bg-warning",
      bgLight: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
    },
    low: {
      label: "MILD",
      bg: "bg-success",
      bgLight: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
    },
    none: {
      label: "NKDA",
      bg: "bg-success",
      bgLight: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
    },
  }

  const hasAllergies = allergies.length > 0
  const hasSevere = allergies.some((a) => a.severity === "high")

  return (
    <Card className={`border-0 card-elevated h-full overflow-hidden ${hasSevere ? "ring-1 ring-critical/20" : ""}`}>
      {/* Top accent bar */}
      <div className={`h-1 ${hasSevere ? "bg-critical" : hasAllergies ? "bg-warning" : "bg-success"}`} />

      <CardHeader className="pb-3 pt-5">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${hasSevere ? "bg-critical/10" : "bg-warning/10"}`}
          >
            <ShieldAlert className={`w-4 h-4 ${hasSevere ? "text-critical" : "text-warning"}`} />
          </div>
          Allergies
          {hasAllergies && (
            <span
              className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                hasSevere ? "bg-critical/10 text-critical" : "bg-warning/10 text-warning"
              }`}
            >
              {allergies.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-5">
        {hasAllergies ? (
          <div className="space-y-3">
            {allergies.map((allergy, index) => {
              const config = severityConfig[allergy.severity]
              return (
                <div key={index} className={`${config.bgLight} rounded-xl p-3 border ${config.border}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{allergy.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{allergy.risk}</p>
                    </div>
                    <span className={`${config.bg} text-white text-[10px] font-bold px-2 py-1 rounded-md shrink-0`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-success/5 rounded-xl border border-success/20">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-success">No Known Allergies</p>
              <p className="text-xs text-muted-foreground">NKDA confirmed</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
