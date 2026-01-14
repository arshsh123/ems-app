interface FooterProps {
  timestamp: string
}

export function Footer({ timestamp }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <p className="text-xs text-muted-foreground text-center">Profile data retrieved: {timestamp}</p>
      </div>
    </footer>
  )
}
