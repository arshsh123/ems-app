"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, LogOut, ShieldCheck, ChevronRight } from "lucide-react"

const patients = [
  { 
    id: "john-smith-72", 
    name: "John Michael Smith", 
    age: 72,
    status: "Stable",
    initials: "JS",
    color: "bg-blue-500"
  },
  { 
    id: "maria-rodriguez-58", 
    name: "Maria Elena Rodriguez", 
    age: 58,
    status: "Stable",
    initials: "MR",
    color: "bg-blue-500"
  },
  { 
    id: "robert-chen-81", 
    name: "Robert James Chen", 
    age: 81,
    status: "Critical",
    initials: "RC",
    color: "bg-red-500"
  },
  { 
    id: "patricia-johnson-65", 
    name: "Patricia Anne Johnson", 
    age: 65,
    status: "Stable",
    initials: "PJ",
    color: "bg-blue-500"
  },
  { 
    id: "michael-patel-52", 
    name: "Michael David Patel", 
    age: 52,
    status: "Unstable",
    initials: "MP",
    color: "bg-amber-500"
  },
]

export default function SelectPatientPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState("")
  const [agencyName, setAgencyName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const storedAgency = typeof window !== "undefined" ? localStorage.getItem("agencyName") : null
    if (storedAgency) {
      setAgencyName(storedAgency)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" })
    } catch (err) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("agencyName")
    }
    router.push("/")
  }

  const selectedPatientData = patients.find(p => p.id === selectedPatient)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <Plus className="w-6 h-6 text-white" strokeWidth={3} />
            </div>
            <span className="text-lg font-bold text-slate-900">MediResponse</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Logged in banner */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Logged in as</p>
              <p className="text-sm font-bold text-blue-900">{agencyName || "NYC EMS District 1"}</p>
            </div>
          </div>

          {/* Select Patient Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Select Patient</h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Patient at Location</p>

              {/* Custom Dropdown */}
              <div className="relative mb-6 z-50">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>{selectedPatientData ? selectedPatientData.name : "Select a patient..."}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-90' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
                    {patients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => {
                          setSelectedPatient(patient.id)
                          setShowDropdown(false)
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className={`w-10 h-10 rounded-full ${patient.color} flex items-center justify-center shrink-0`}>
                          <span className="text-sm font-bold text-white">{patient.initials}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.age} years old • {patient.status}</p>
                        </div>
                        {patient.id === "robert-chen-81" && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-red-500 text-white rounded-full">
                            Critical
                          </span>
                        )}
                        {patient.id === "michael-patel-52" && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-amber-500 text-white rounded-full">
                            Unstable
                          </span>
                        )}
                        {(patient.id === "john-smith-72" || patient.id === "maria-rodriguez-58" || patient.id === "patricia-johnson-65") && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500 text-white rounded-full">
                            Stable
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => selectedPatient && router.push(`/profile/${selectedPatient}`)}
                  disabled={!selectedPatient}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  View Profile
                  <ChevronRight className="w-4 h-4" />
                </button>

                {selectedPatient && (
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">Additional Actions</p>
                    <button className="w-full py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Verify Location
                    </button>
                    <button className="w-full py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Update Status
                    </button>
                  </div>
                )}
              </div>
            </div>

            {selectedPatient && (
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-3">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Coming Soon:</span> Integrated GPS location tracking
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
