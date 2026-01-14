"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, MapPin, LogOut, Loader2, ChevronRight, Building2 } from "lucide-react"
import { patients, agencies } from "@/lib/data"

export default function SelectPatientPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState("")
  const [agencyName, setAgencyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const agencyId = sessionStorage.getItem("agency")
    if (!agencyId) {
      router.push("/")
      return
    }
    const agency = agencies.find((a) => a.id === agencyId)
    setAgencyName(agency?.name || "Unknown Agency")
  }, [router])

  const handleViewProfile = async () => {
    if (!selectedPatient) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.push(`/profile/${selectedPatient}`)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("agency")
    router.push("/")
  }

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-card border-b border-border/50 card-elevated sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppLogo size="sm" />
            <span className="text-lg font-bold text-foreground">MediResponse</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-8">
        <div className="max-w-lg mx-auto">
          {/* Agency info card */}
          <div className="bg-primary/5 rounded-xl px-4 py-3 mb-6 flex items-center gap-3 border border-primary/10">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="text-sm font-semibold text-foreground">{agencyName}</p>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-card rounded-2xl p-6 card-elevated-lg">
            <h1 className="text-xl font-bold text-foreground mb-6">Select Patient</h1>

            {/* Patient Selector */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="patient" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Patient at Location
              </Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger
                  id="patient"
                  className="h-12 bg-muted/50 border-0 text-foreground rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-muted transition-colors"
                >
                  <SelectValue placeholder="Select a patient..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="rounded-lg py-2.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            p.status === "Critical"
                              ? "bg-critical"
                              : p.status === "Unstable"
                                ? "bg-warning"
                                : "bg-primary"
                          }`}
                        >
                          {p.initials}
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{p.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.age} years old • {p.status}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected patient preview */}
            {selectedPatientData && (
              <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border/50">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                      selectedPatientData.status === "Critical"
                        ? "bg-critical"
                        : selectedPatientData.status === "Unstable"
                          ? "bg-warning"
                          : "bg-primary"
                    }`}
                  >
                    {selectedPatientData.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{selectedPatientData.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatientData.age} yrs • {selectedPatientData.bloodType} •{" "}
                      {selectedPatientData.allergies.length} allergies
                    </p>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      selectedPatientData.status === "Critical"
                        ? "bg-critical/10 text-critical"
                        : selectedPatientData.status === "Unstable"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                    }`}
                  >
                    {selectedPatientData.status}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleViewProfile}
                disabled={!selectedPatient || isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl disabled:opacity-50 btn-press shadow-lg shadow-primary/25 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    View Patient Profile
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>

              <div className="relative">
                <Button
                  variant="secondary"
                  disabled
                  className="w-full h-12 bg-muted/50 text-muted-foreground font-semibold text-base rounded-xl border-0"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Use My Location
                </Button>
                <span className="absolute -top-2 right-3 text-[10px] font-medium text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          {/* Security badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">HIPAA Encrypted Connection</span>
          </div>
        </div>
      </main>
    </div>
  )
}
