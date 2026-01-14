import { Phone, User, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmergencyContactCardProps {
  name: string
  relation: string
  phone: string
}

export function EmergencyContactCard({ name, relation, phone }: EmergencyContactCardProps) {
  return (
    <Card className="border-0 card-elevated h-full overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-success" />

      <CardHeader className="pb-3 pt-5">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-success" />
          </div>
          Emergency Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-5 space-y-4">
        {/* Contact info */}
        <div className="bg-muted/40 rounded-xl p-4 border border-border/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground mb-2">{relation}</p>
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                {phone}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Call button */}
        <Button
          asChild
          className="w-full h-14 bg-success hover:bg-success/90 text-white font-semibold text-base rounded-xl btn-press group"
          style={{
            boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <a href={`tel:${phone.replace(/\D/g, "")}`}>
            <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Call Now
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
