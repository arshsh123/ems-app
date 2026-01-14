import { AlertTriangle, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Allergy {
  name: string
  severity: "high" | "moderate" | "low" | "none"
}

interface AllergiesCardProps {
  allergies: Allergy[]
}

export function AllergiesCard({ allergies }: AllergiesCardProps) {
  const severityColors = {
    high: "bg-critical/10 text-critical border-critical/20",
    moderate: "bg-warning/10 text-warning-foreground border-warning/30",
    low: "bg-primary/10 text-primary border-primary/20",
    none: "bg-success/10 text-success border-success/20",
  }

  const hasAllergies = allergies.some((a) => a.severity !== "none")

  return (
    <Card className="bg-card border-border shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <div className={`p-2 rounded-lg ${hasAllergies ? "bg-warning/10" : "bg-success/10"}`}>
            {hasAllergies ? (
              <AlertTriangle className="w-4 h-4 text-warning" />
            ) : (
              <Check className="w-4 h-4 text-success" />
            )}
          </div>
          Allergies
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2.5">
          {allergies.map((allergy, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium text-foreground">{allergy.name}</span>
              <Badge variant="outline" className={`${severityColors[allergy.severity]} text-xs font-medium`}>
                {allergy.severity === "none" ? "NKDA" : allergy.severity.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
