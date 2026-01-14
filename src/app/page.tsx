"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Shield } from "lucide-react"

const agencies = [
  { id: "nyc-ems-district-1", name: "NYC EMS District 1", pin: "1234" },
  { id: "nyc-ems-district-2", name: "NYC EMS District 2", pin: "2345" },
  { id: "st-marys-hospital", name: "St. Mary's Hospital", pin: "3456" },
  { id: "sunset-nursing-home", name: "Sunset Nursing Home", pin: "4567" },
]

export default function LoginPage() {
  const router = useRouter()
  const [selectedAgency, setSelectedAgency] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setPin(value)
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAgency) {
      setError("Please select an agency")
      return
    }

    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    const validCredentials: Record<string, string> = {
      "NYC EMS District 1": "1234",
      "NYC EMS District 2": "2345",
      "St. Mary's Hospital": "3456",
      "Sunset Nursing Home": "4567",
    }

    if (validCredentials[selectedAgency] !== pin) {
      setError("Invalid PIN. Try again.")
      setPin("")
      return
    }

    const agency = agencies.find((a) => a.name === selectedAgency)
    if (!agency) {
      setError("Agency not found")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agencyId: agency.id,
          pin,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("agencyName", selectedAgency)
        }
        router.push("/select-patient")
      } else {
        setError(data.error || "Invalid PIN. Try again.")
        setPin("")
      }
    } catch (err) {
      setError("Connection error. Please try again.")
      setPin("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
            <Plus className="w-9 h-9 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">MediResponse</h1>
          <p className="text-sm text-slate-500">Emergency Patient Access System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="agency" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Agency
              </label>
              <select
                id="agency"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">Select your agency</option>
                {agencies.map((agency) => (
                  <option key={agency.id} value={agency.name}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pin" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Access PIN
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={handlePinChange}
                maxLength={4}
                inputMode="numeric"
                placeholder="Enter 4-digit PIN"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-wider"
              />
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || pin.length !== 4 || !selectedAgency}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {loading ? "Accessing..." : "Access Patient Records"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5" />
            <span>HIPAA Compliant Secure Access</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">For authorized emergency personnel only</p>
        </div>
      </div>
    </div>
  )
}
