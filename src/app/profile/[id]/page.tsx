"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
  AlertTriangle,
  Edit3,
} from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  bloodType: string
  address: string
  allergies: string[]
  conditions: string[]
  medications: string[]
  emergencyContact: {
    name: string
    phone: string
  }
}

export default function PatientProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPatient = async () => {
      if (!params?.id) {
        router.push("/select-patient")
        return
      }
      try {
        const res = await fetch(`/api/profile/${params.id}`)
        if (res.status === 401) {
          router.push("/")
          return
        }
        if (!res.ok) {
          router.push("/select-patient")
          return
        }
        const data = await res.json()
        setPatient(data)
      } catch (err) {
        router.push("/select-patient")
      } finally {
        setIsLoading(false)
      }
    }
    fetchPatient()
  }, [params?.id, router])

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" })
    } catch (err) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("agencyName")
    }
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm text-slate-500">Loading patient data...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Patient not found</p>
      </div>
    )
  }

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  // Determine severity colors for allergies
  const getAllergySeverity = (allergy: string) => {
    if (allergy.toLowerCase().includes("penicillin")) return { badge: "SEVERE", color: "bg-red-50 border-red-200", badgeColor: "bg-red-500" }
    if (allergy.toLowerCase().includes("aspirin")) return { badge: "MODERATE", color: "bg-orange-50 border-orange-200", badgeColor: "bg-orange-500" }
    return { badge: "MILD", color: "bg-yellow-50 border-yellow-200", badgeColor: "bg-yellow-500" }
  }

  // Map medications to conditions
  const medicationInfo: Record<string, { dosage: string; frequency: string }> = {
    "Metformin": { dosage: "500mg", frequency: "2x daily" },
    "Lisinopril": { dosage: "10mg", frequency: "daily" },
    "Warfarin": { dosage: "5mg", frequency: "daily" },
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/select-patient")}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-white" />
              <span className="text-base font-bold text-white">MediResponse</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
              <RefreshCw className="w-3 h-3 text-white" />
              <span className="text-xs text-white">Last Synced: 15 min ago</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
              <span className="text-xs font-bold text-white">DR</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Patient Header Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
            {/* Top gradient */}
            <div className="h-20 bg-gradient-to-b from-slate-50 to-transparent" />
            
            {/* Avatar and Info */}
            <div className="px-6 pb-6 -mt-12">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-white shadow-xl mb-3">
                  <span className="text-3xl font-bold text-white">{initials}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
                <p className="text-sm text-slate-500 mt-1">{patient.age} years old • 5'10" • 185 lbs</p>
                
                {/* Status Badge */}
                <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">Ready / Stable</span>
                </div>

                {/* Edit Profile Link */}
                <button className="mt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <p className="text-2xl font-bold text-slate-900">{patient.bloodType}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Blood Type</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <p className="text-sm font-bold text-slate-900">2 min ago</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Last Updated</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <p className="text-sm font-bold text-slate-600">Clear</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Alert Status</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-bold text-emerald-600">Ready</p>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Call Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Allergies */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="h-1 bg-red-500" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Allergies</h2>
                </div>

                <div className="space-y-3">
                  {patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, i) => {
                      const { badge, color, badgeColor } = getAllergySeverity(allergy)
                      return (
                        <div key={i} className={`${color} border rounded-xl p-3`}>
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-bold text-slate-900">{allergy}</p>
                            <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
                              {badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">
                            {badge === "SEVERE" ? "Anaphylaxis risk - do NOT administer" : 
                             badge === "MODERATE" ? "Skin rash, hives" : 
                             "Contact dermatitis"}
                          </p>
                        </div>
                      )
                    })
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <p className="font-bold text-emerald-700">No Known Allergies</p>
                      </div>
                      <p className="text-xs text-slate-600">NKDA confirmed</p>
                    </div>
                  )}

                  {patient.allergies.some(a => a.toLowerCase().includes("sulfa")) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-bold text-slate-900">Sulfa Drugs</p>
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          MODERATE
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">Skin rash, hives</p>
                    </div>
                  )}

                  {patient.allergies.some(a => a.toLowerCase().includes("latex")) && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-bold text-slate-900">Latex</p>
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          MILD
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">Contact dermatitis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Conditions */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="h-1 bg-blue-600" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Active Conditions</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Conditions Column */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Conditions</p>
                    <div className="space-y-2">
                      {patient.conditions.map((condition, i) => {
                        const color = i === 0 ? "bg-red-500" : i === 1 ? "bg-orange-500" : i === 2 ? "bg-red-500" : "bg-orange-500"
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${color}`} />
                            <span className="text-sm text-slate-800">{condition}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Medications Column */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Medications</p>
                    <div className="space-y-2.5">
                      {patient.medications.map((med, i) => {
                        const info = medicationInfo[med] || { dosage: "", frequency: "" }
                        return (
                          <div key={i}>
                            <p className="text-sm font-semibold text-slate-900">{med}</p>
                            <p className="text-xs text-slate-500">{info.dosage} {info.frequency}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="h-1 bg-emerald-500" />
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Emergency Contact</h2>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{patient.emergencyContact.name}</p>
                        <p className="text-xs text-slate-500">Spouse</p>
                      </div>
                    </div>
                    <div className="pl-15">
                      <p className="text-sm font-semibold text-blue-600">{patient.emergencyContact.phone}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={`tel:${patient.emergencyContact.phone.replace(/\D/g, "")}`}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
