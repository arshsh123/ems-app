"use client"

import { Activity, RefreshCw, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileHeaderProps {
  lastSynced: string
}

export function ProfileHeader({ lastSynced }: ProfileHeaderProps) {
  const router = useRouter()

  return (
    <header
      className="sticky top-0 z-50 bg-gradient-to-r from-[#1a6fc2] via-[#1E7FD8] to-[#2a8ae5]"
      style={{
        boxShadow: "0 4px 20px rgba(30, 127, 216, 0.3)",
      }}
    >
      {/* Top bar */}
      <div className="h-0.5 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />

      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/select-patient")}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">MediResponse</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs text-white/90">
            <RefreshCw className="w-3 h-3" />
            <span>Synced {lastSynced}</span>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            DR
          </div>
        </div>
      </div>
    </header>
  )
}
