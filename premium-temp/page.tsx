"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Loader2 } from "lucide-react"
import { agencies } from "@/lib/data"

export default function LoginPage() {
  const router = useRouter()
  const [agency, setAgency] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!agency) {
      setError("Please select an agency")
      return
    }

    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (pin.length === 4) {
      sessionStorage.setItem("agency", agency)
      router.push("/select-patient")
    } else {
      setError("Invalid PIN. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Premium header bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" />

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-[400px]">
          {/* Logo and header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <AppLogo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">MediResponse</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Emergency Patient Access System</p>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl p-6 card-elevated-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="agency"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Agency
                </Label>
                <Select value={agency} onValueChange={setAgency}>
                  <SelectTrigger
                    id="agency"
                    className="h-12 bg-muted/50 border-0 text-foreground rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-muted transition-colors"
                  >
                    <SelectValue placeholder="Select your agency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {agencies.map((a) => (
                      <SelectItem key={a.id} value={a.id} className="rounded-lg">
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Access PIN
                </Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 4-digit PIN"
                  className="h-12 bg-muted/50 border-0 text-foreground text-center text-lg tracking-[0.3em] rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-muted transition-colors placeholder:tracking-normal placeholder:text-sm"
                />
              </div>

              {error && (
                <div className="bg-critical/10 text-critical text-sm font-medium px-4 py-2.5 rounded-xl">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl btn-press shadow-lg shadow-primary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Patient Records"}
              </Button>
            </form>
          </div>

          {/* Security badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">HIPAA Compliant Secure Access</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-4">
        <p className="text-[11px] text-muted-foreground/60 text-center">For authorized emergency personnel only</p>
      </footer>
    </div>
  )
}
