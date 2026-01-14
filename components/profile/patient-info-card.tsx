import { Check, AlertTriangle, Activity, Pencil, Droplets, Clock, Bell, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Patient } from "@/lib/data"

interface PatientInfoCardProps {
  patient: Patient
}

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  const statusConfig = {
    Stable: {
      bg: "bg-success",
      text: "text-success",
      bgLight: "bg-success/10",
      icon: Check,
    },
    Critical: {
      bg: "bg-critical",
      text: "text-critical",
      bgLight: "bg-critical/10",
      icon: AlertTriangle,
    },
    Unstable: {
      bg: "bg-warning",
      text: "text-warning",
      bgLight: "bg-warning/10",
      icon: Activity,
    },
  }

  const config = statusConfig[patient.status]
  const StatusIcon = config.icon

  return (
    <Card className="bg-card border-0 card-elevated-lg overflow-hidden">
      {/* Header gradient */}
      <div className="h-32 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,127,216,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.06),transparent_50%)]" />
      </div>

      <CardContent className="px-6 pb-6 -mt-16 relative">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with ring */}
          <div className="relative mb-4">
            <div
              className={`w-28 h-28 rounded-full ${config.bg} flex items-center justify-center ring-4 ring-card`}
              style={{
                boxShadow: `0 8px 24px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.2)`,
              }}
            >
              <span className="text-4xl font-bold text-white">{patient.initials}</span>
            </div>
            {/* Status indicator */}
            <div
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full ${config.bg} text-white text-xs font-semibold flex items-center gap-1`}
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <StatusIcon className="w-3 h-3" />
              {patient.status}
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-foreground tracking-tight mt-2 text-balance">{patient.fullName}</h2>

          {/* Details */}
          <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
            <span>{patient.age} years</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>{patient.height}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>{patient.weight}</span>
          </p>

          {/* Edit button */}
          <button className="mt-3 text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors">
            <Pencil className="w-3 h-3" />
            Edit Profile
          </button>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {/* Blood Type */}
          <div className="bg-muted/40 rounded-xl p-4 text-center border border-border/30">
            <div className="w-8 h-8 rounded-lg bg-critical/10 flex items-center justify-center mx-auto mb-2">
              <Droplets className="w-4 h-4 text-critical" />
            </div>
            <p className="text-xl font-bold text-foreground">{patient.bloodType}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">Blood Type</p>
          </div>

          {/* Last Updated */}
          <div className="bg-muted/40 rounded-xl p-4 text-center border border-border/30">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground">{patient.lastUpdated}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">Updated</p>
          </div>

          {/* Alert Status */}
          <div
            className={`rounded-xl p-4 text-center border ${
              patient.alertStatus.includes("No") ? "bg-success/5 border-success/20" : "bg-critical/5 border-critical/20"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                patient.alertStatus.includes("No") ? "bg-success/10" : "bg-critical/10"
              }`}
            >
              <Bell className={`w-4 h-4 ${patient.alertStatus.includes("No") ? "text-success" : "text-critical"}`} />
            </div>
            <p className={`text-sm font-bold ${patient.alertStatus.includes("No") ? "text-success" : "text-critical"}`}>
              {patient.alertStatus.includes("No") ? "Clear" : patient.alertStatus}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">Alerts</p>
          </div>

          {/* Call Status */}
          <div className="bg-success/5 rounded-xl p-4 text-center border border-success/20">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Phone className="w-4 h-4 text-success" />
            </div>
            <p className="text-sm font-bold text-success">{patient.callStatus}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">Call Status</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
