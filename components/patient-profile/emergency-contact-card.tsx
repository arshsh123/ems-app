import { Phone, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmergencyContactCardProps {
  name: string
  relation: string
  phone: string
}

export function EmergencyContactCard({ name, relation, phone }: EmergencyContactCardProps) {
  return (
    <Card className="bg-card border-border shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <div className="p-2 rounded-lg bg-primary/10">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          Emergency Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{name}</p>
              <p className="text-xs text-muted-foreground">{relation}</p>
              <p className="text-sm font-mono text-foreground mt-1">{phone}</p>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm gap-2">
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
