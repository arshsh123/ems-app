interface AppLogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
}

export function AppLogo({ size = "md", variant = "default" }: AppLogoProps) {
  const sizeConfig = {
    sm: { container: "w-9 h-9", cross: "w-4 h-4" },
    md: { container: "w-12 h-12", cross: "w-5 h-5" },
    lg: { container: "w-16 h-16", cross: "w-7 h-7" },
  }

  const isWhite = variant === "white"

  return (
    <div
      className={`${sizeConfig[size].container} rounded-xl flex items-center justify-center relative overflow-hidden ${
        isWhite ? "bg-white/20 backdrop-blur-sm" : "bg-gradient-to-br from-primary to-blue-600"
      }`}
      style={{
        boxShadow: isWhite
          ? "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "0 4px 12px rgba(30, 127, 216, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {/* Cross icon */}
      <svg
        className={`${sizeConfig[size].cross} ${isWhite ? "text-white" : "text-white"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      {/* Subtle shine overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
        style={{ borderRadius: "inherit" }}
      />
    </div>
  )
}
