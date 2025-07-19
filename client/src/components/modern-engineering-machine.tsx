"use client"

import { useState, useEffect } from "react"

export default function EngineeringMachine() {
  const [isRunning, setIsRunning] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [pressure, setPressure] = useState(75)

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setPressure((prev) => 70 + Math.random() * 20)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Control Panel */}
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25"
                  : "bg-green-500 hover:bg-green-600 text-white shadow-green-500/25"
              }`}
            >
              {isRunning ? "STOP" : "START"}
            </button>

            <div className="flex flex-col items-center">
              <label className="text-white/80 text-sm mb-2">Speed</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
                className="w-20 accent-blue-500"
              />
              <span className="text-white/60 text-xs mt-1">{speed}x</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
              <span className="text-white/80 text-sm">{isRunning ? "ACTIVE" : "IDLE"}</span>
            </div>
          </div>
        </div>

        {/* Main Machine Container */}
        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
          {/* Machine Frame */}
          <div className="relative w-96 h-96 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl border border-white/20 overflow-hidden backdrop-blur-sm">
            {/* Main Gear Assembly */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              {/* Large Main Gear */}
              <div className="relative w-32 h-32">
                <div
                  className={`absolute inset-0 ${isRunning ? "animate-spin" : ""} transition-all duration-500`}
                  style={{
                    animationDuration: `${3 / speed}s`,
                    filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400" fill="currentColor" stroke="none">
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
                  </svg>
                </div>
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border-2 border-blue-400/50 shadow-lg" />
              </div>

              {/* Secondary Gears */}
              <div className="absolute -top-4 -right-16 w-20 h-20">
                <div
                  className={`absolute inset-0 ${isRunning ? "animate-spin" : ""} transition-all duration-500`}
                  style={{
                    animationDuration: `${2 / speed}s`,
                    animationDirection: "reverse",
                    filter: "drop-shadow(0 0 15px rgba(34, 197, 94, 0.3))",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full text-green-400" fill="currentColor">
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border-2 border-green-400/50" />
              </div>

              <div className="absolute -top-4 -left-16 w-16 h-16">
                <div
                  className={`absolute inset-0 ${isRunning ? "animate-spin" : ""} transition-all duration-500`}
                  style={{
                    animationDuration: `${1.5 / speed}s`,
                    filter: "drop-shadow(0 0 15px rgba(249, 115, 22, 0.3))",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full text-orange-400" fill="currentColor">
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border-2 border-orange-400/50" />
              </div>
            </div>

            {/* Connecting Rod */}
            <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full border border-white/20 shadow-lg">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-2 border-white/30 shadow-lg" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white/30 shadow-lg" />
            </div>

            {/* Modern Piston Assembly */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              {/* Piston Cylinder */}
              <div className="relative w-8 h-32 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full border border-white/30 shadow-2xl overflow-hidden">
                {/* Piston Head */}
                <div
                  className={`absolute w-full transition-all duration-300 ${isRunning ? "animate-bounce" : ""}`}
                  style={{
                    animationDuration: `${1 / speed}s`,
                    height: "40%",
                    background: "linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)",
                    borderRadius: "9999px",
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.5), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                />

                {/* Pressure Indicator Lines */}
                <div className="absolute inset-0 flex flex-col justify-around px-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-px bg-white/20" />
                  ))}
                </div>
              </div>

              {/* Piston Base */}
              <div className="mt-2 w-12 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg border border-white/20 shadow-lg" />
            </div>

            {/* Hydraulic Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <path
                  d="M 50 200 Q 100 150 200 180 T 350 200"
                  stroke="url(#hydraulicGradient)"
                  strokeWidth="3"
                  fill="none"
                  className={isRunning ? "animate-pulse" : ""}
                />
                <path
                  d="M 50 250 Q 100 300 200 270 T 350 250"
                  stroke="url(#hydraulicGradient)"
                  strokeWidth="3"
                  fill="none"
                  className={isRunning ? "animate-pulse" : ""}
                  style={{ animationDelay: "0.5s" }}
                />
                <defs>
                  <linearGradient id="hydraulicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Status Indicators */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-1 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-white/80 text-xs">PWR</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-1 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-yellow-400 animate-ping" : "bg-gray-500"}`} />
                <span className="text-white/80 text-xs">OPR</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-1 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${pressure > 80 ? "bg-red-400" : "bg-blue-400"}`} />
                <span className="text-white/80 text-xs">PSI</span>
              </div>
            </div>
          </div>

          {/* Modern Info Display */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white/60 text-sm mb-1">Pressure</div>
              <div className="text-2xl font-bold text-blue-400">{Math.round(pressure)} PSI</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pressure}%` }}
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white/60 text-sm mb-1">RPM</div>
              <div className="text-2xl font-bold text-green-400">{isRunning ? Math.round(1200 * speed) : 0}</div>
              <div className="text-white/40 text-xs mt-1">{isRunning ? `${speed}x Speed` : "Stopped"}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white/60 text-sm mb-1">Temperature</div>
              <div className="text-2xl font-bold text-orange-400">{isRunning ? "78°C" : "22°C"}</div>
              <div className="text-white/40 text-xs mt-1">{isRunning ? "Operating" : "Ambient"}</div>
            </div>
          </div>
        </div>

        {/* Particle Effects */}
        {isRunning && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"
                style={{
                  left: `${i * 10 - 20}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
