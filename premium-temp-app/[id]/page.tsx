"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { patients, type Patient } from "@/lib/data"
import {
  Loader2,
  Activity,
  RefreshCw,
  ChevronLeft,
  Shield,
  LogOut,
  Phone,
  User,
  Check,
  ShieldAlert,
  HeartPulse,
  Pencil,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function PatientProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const agencyId = sessionStorage.getItem("agency")
    if (!agencyId) {
      router.push("/")
      return
    }

    const foundPatient = patients.find((p) => p.id === params.id)
    if (foundPatient) {
      setPatient(foundPatient)
    } else {
      router.push("/select-patient")
    }
    setIsLoading(false)
  }, [params.id, router])

  const handleLogout = () => {
    sessionStorage.removeItem("agency")
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading patient data...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-muted-foreground">Patient not found</p>
      </div>
    )
  }

  const statusConfig = {
    Stable: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" },
    Critical: { bg: "bg-red-500", text: "text-red-600", light: "bg-red-50" },
    Unstable: { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
  }
  const config = statusConfig[patient.status]
  const hasSevereAllergy = patient.allergies.some((a) => a.severity === "high")
  const hasHighCondition = patient.conditions.some((c) => c.severity === "high")

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Header */}
      <header className="shrink-0 bg-gradient-to-r from-[#1565C0] to-[#1E88E5] shadow-lg">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/select-patient")}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-white">MediResponse</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90">
              <RefreshCw className="w-3 h-3" />
              <span>Last Synced: 15 min ago</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
              DR
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - fills remaining height */}
      <main className="flex-1 p-4 flex flex-col gap-4 min-h-0 overflow-hidden">
        <div className="shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top gradient accent */}
          <div className="h-24 bg-gradient-to-b from-primary/5 to-transparent flex items-end justify-center pb-0">
            {/* Avatar overlapping */}
            <div className="relative translate-y-12">
              <div
                className={`w-24 h-24 rounded-full ${config.bg} flex items-center justify-center ring-4 ring-white shadow-xl`}
              >
                <span className="text-3xl font-bold text-white">{patient.initials}</span>
              </div>
            </div>
          </div>

          {/* Patient info */}
          <div className="pt-14 pb-4 px-4 text-center">
            <h1 className="text-xl font-bold text-slate-900">{patient.fullName}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {patient.age} years old • {patient.height} • {patient.weight}
            </p>

            {/* Status badge */}
            <div className="mt-3 flex justify-center">
              <div
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${config.light} ${config.text} text-sm font-semibold`}
              >
                {patient.status === "Critical" && <AlertTriangle className="w-4 h-4" />}
                {patient.status === "Stable" && <Check className="w-4 h-4" />}
                {patient.status === "Unstable" && <Activity className="w-4 h-4" />}
                {patient.callStatus} / {patient.status}
              </div>
            </div>

            <button className="mt-2 text-xs font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1">
              <Pencil className="w-3 h-3" />
              Edit Profile
            </button>

            {/* Vitals Row */}
            <div className="mt-4 grid grid-cols-4 gap-3 max-w-xl mx-auto">
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <p className="text-xl font-bold text-slate-900">{patient.bloodType}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Blood Type</p>
              </div>
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <p className="text-base font-bold text-slate-900">{patient.lastUpdated}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Last Updated</p>
              </div>
              <div
                className={`rounded-xl px-4 py-3 border ${patient.alertStatus.includes("No") ? "bg-slate-50 border-slate-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center justify-center gap-1">
                  {!patient.alertStatus.includes("No") && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <p
                    className={`text-sm font-bold ${patient.alertStatus.includes("No") ? "text-slate-600" : "text-red-600"}`}
                  >
                    {patient.alertStatus.includes("No") ? "Clear" : patient.alertStatus}
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Alert Status</p>
              </div>
              <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-200">
                <div className="flex items-center justify-center gap-1">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <p className="text-sm font-bold text-emerald-600">{patient.callStatus}</p>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Call Status</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
          {/* Allergies Card */}
          <div
            className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${hasSevereAllergy ? "border-red-200" : "border-slate-200"}`}
          >
            <div
              className={`h-1.5 shrink-0 ${hasSevereAllergy ? "bg-red-500" : patient.allergies.length > 0 ? "bg-amber-500" : "bg-emerald-500"}`}
            />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3 shrink-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${hasSevereAllergy ? "bg-red-100" : "bg-amber-100"}`}
                >
                  <ShieldAlert className={`w-4 h-4 ${hasSevereAllergy ? "text-red-500" : "text-amber-500"}`} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Allergies</h2>
              </div>

              {/* Content area that grows */}
              <div className="flex-1 overflow-auto">
                {patient.allergies.length > 0 ? (
                  <div className="space-y-2">
                    {patient.allergies.map((allergy, i) => {
                      const sevConfig = {
                        high: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-500", label: "SEVERE" },
                        moderate: {
                          bg: "bg-amber-50",
                          border: "border-amber-200",
                          badge: "bg-amber-500",
                          label: "MODERATE",
                        },
                        low: {
                          bg: "bg-emerald-50",
                          border: "border-emerald-200",
                          badge: "bg-emerald-500",
                          label: "MILD",
                        },
                        none: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-500", label: "NONE" },
                      }
                      const ac = sevConfig[allergy.severity]
                      return (
                        <div key={i} className={`${ac.bg} ${ac.border} border rounded-xl p-3`}>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">{allergy.name}</p>
                            <span className={`${ac.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                              {ac.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{allergy.risk}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <Check className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-emerald-700">No Known Allergies</p>
                      <p className="text-xs text-slate-500">NKDA confirmed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Conditions Card */}
          <div
            className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${hasHighCondition ? "border-primary/30" : "border-slate-200"}`}
          >
            <div className="h-1.5 shrink-0 bg-primary" />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Active Conditions</h2>
              </div>

              {/* Two column layout inside */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-4">
                  {/* Conditions */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Conditions</p>
                    <div className="space-y-1.5">
                      {patient.conditions.map((cond, i) => {
                        const dotColor =
                          cond.severity === "high"
                            ? "bg-red-500"
                            : cond.severity === "moderate"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
                            <span className="text-sm text-slate-700">{cond.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Medications
                    </p>
                    <div className="space-y-1.5">
                      {patient.medications.map((med, i) => (
                        <div key={i}>
                          <p className="text-sm font-medium text-slate-800">{med.name}</p>
                          <p className="text-xs text-slate-500">{med.dosage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 overflow-hidden flex flex-col">
            <div className="h-1.5 shrink-0 bg-emerald-500" />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Emergency Contact</h2>
              </div>

              {/* Contact info - grows to fill */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{patient.emergencyContact.name}</p>
                    <p className="text-xs text-slate-500">{patient.emergencyContact.relation}</p>
                    <p className="text-sm font-semibold text-primary mt-0.5">{patient.emergencyContact.phone}</p>
                  </div>
                </div>

                {/* Call button at bottom */}
                <div className="mt-auto pt-4">
                  <a
                    href={`tel:${patient.emergencyContact.phone.replace(/\D/g, "")}`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/25"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-medium">HIPAA Encrypted</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs">Last synced {patient.lastUpdated}</span>
        </div>
        <Link
          href="/"
          onClick={handleLogout}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </Link>
      </footer>
    </div>
  )
}
