"use client"

import { Shield, LogOut } from "lucide-react"
import Link from "next/link"

interface ProfileFooterProps {
  lastSynced: string
}

export function ProfileFooter({ lastSynced }: ProfileFooterProps) {
  const handleLogout = () => {
    sessionStorage.removeItem("agency")
  }

  return (
    <footer className="sticky bottom-0 bg-card/80 backdrop-blur-lg border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-3.5 h-3.5 text-success" />
          <span className="text-xs font-medium">HIPAA Encrypted</span>
          <span className="text-xs text-muted-foreground/50">•</span>
          <span className="text-xs text-muted-foreground/80">Synced {lastSynced}</span>
        </div>
        <Link
          href="/"
          onClick={handleLogout}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3 h-3" />
          Logout
        </Link>
      </div>
    </footer>
  )
}
