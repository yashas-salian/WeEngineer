"use client"

import { useState } from "react"

export default function Component() {
  const [isRunning, setIsRunning] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="relative">
        {/* Control Panel */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-colors"
          >
            {isRunning ? "STOP" : "START"}
          </button>
        </div>

        {/* Main Equipment Frame - Oscillating Movement */}
        <div className={`relative ${isRunning ? "animate-pulse" : ""}`}>
          <div className={`transform transition-transform duration-1000 ${isRunning ? "animate-bounce" : ""}`}>
            {/* Main Machine Body */}
            <div className="relative bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-2xl p-8 border-4 border-gray-500">
              {/* Machine Frame */}
              <div className="w-96 h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border-2 border-gray-600 relative overflow-hidden">
                {/* Large Main Cog - Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={`w-24 h-24 ${isRunning ? "animate-spin" : ""} transition-all duration-300`}
                    style={{ animationDuration: "3s" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500">
                      <g fill="currentColor" stroke="#374151" strokeWidth="2">
                        <circle cx="50" cy="50" r="35" />
                        {/* Cog teeth */}
                        {Array.from({ length: 12 }).map((_, i) => {
                          const angle = (i * 30 * Math.PI) / 180
                          const x1 = 50 + 35 * Math.cos(angle)
                          const y1 = 50 + 35 * Math.sin(angle)
                          const x2 = 50 + 45 * Math.cos(angle)
                          const y2 = 50 + 45 * Math.sin(angle)
                          return (
                            <rect
                              key={i}
                              x={x2 - 2}
                              y={y2 - 4}
                              width="4"
                              height="8"
                              transform={`rotate(${i * 30} ${x2} ${y2})`}
                            />
                          )
                        })}
                        <circle cx="50" cy="50" r="8" fill="#374151" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Small Cog - Top Left */}
                <div className="absolute top-4 left-8">
                  <div
                    className={`w-16 h-16 ${isRunning ? "animate-spin" : ""} transition-all duration-300`}
                    style={{ animationDuration: "2s", animationDirection: "reverse" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500">
                      <g fill="currentColor" stroke="#374151" strokeWidth="2">
                        <circle cx="50" cy="50" r="30" />
                        {Array.from({ length: 8 }).map((_, i) => {
                          const angle = (i * 45 * Math.PI) / 180
                          const x1 = 50 + 30 * Math.cos(angle)
                          const y1 = 50 + 30 * Math.sin(angle)
                          const x2 = 50 + 38 * Math.cos(angle)
                          const y2 = 50 + 38 * Math.sin(angle)
                          return (
                            <rect
                              key={i}
                              x={x2 - 1.5}
                              y={y2 - 3}
                              width="3"
                              height="6"
                              transform={`rotate(${i * 45} ${x2} ${y2})`}
                            />
                          )
                        })}
                        <circle cx="50" cy="50" r="6" fill="#374151" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Medium Cog - Top Right */}
                <div className="absolute top-8 right-12">
                  <div
                    className={`w-20 h-20 ${isRunning ? "animate-spin" : ""} transition-all duration-300`}
                    style={{ animationDuration: "4s" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
                      <g fill="currentColor" stroke="#374151" strokeWidth="2">
                        <circle cx="50" cy="50" r="32" />
                        {Array.from({ length: 10 }).map((_, i) => {
                          const angle = (i * 36 * Math.PI) / 180
                          const x1 = 50 + 32 * Math.cos(angle)
                          const y1 = 50 + 32 * Math.sin(angle)
                          const x2 = 50 + 42 * Math.cos(angle)
                          const y2 = 50 + 42 * Math.sin(angle)
                          return (
                            <rect
                              key={i}
                              x={x2 - 2}
                              y={y2 - 3.5}
                              width="4"
                              height="7"
                              transform={`rotate(${i * 36} ${x2} ${y2})`}
                            />
                          )
                        })}
                        <circle cx="50" cy="50" r="7" fill="#374151" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Small Cog - Bottom Left */}
                <div className="absolute bottom-6 left-12">
                  <div
                    className={`w-14 h-14 ${isRunning ? "animate-spin" : ""} transition-all duration-300`}
                    style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
                      <g fill="currentColor" stroke="#374151" strokeWidth="2">
                        <circle cx="50" cy="50" r="28" />
                        {Array.from({ length: 6 }).map((_, i) => {
                          const angle = (i * 60 * Math.PI) / 180
                          const x1 = 50 + 28 * Math.cos(angle)
                          const y1 = 50 + 28 * Math.sin(angle)
                          const x2 = 50 + 36 * Math.cos(angle)
                          const y2 = 50 + 36 * Math.sin(angle)
                          return (
                            <rect
                              key={i}
                              x={x2 - 1.5}
                              y={y2 - 3}
                              width="3"
                              height="6"
                              transform={`rotate(${i * 60} ${x2} ${y2})`}
                            />
                          )
                        })}
                        <circle cx="50" cy="50" r="5" fill="#374151" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Medium Cog - Bottom Right */}
                <div className="absolute bottom-4 right-8">
                  <div
                    className={`w-18 h-18 ${isRunning ? "animate-spin" : ""} transition-all duration-300`}
                    style={{ animationDuration: "2.5s" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                      <g fill="currentColor" stroke="#374151" strokeWidth="2">
                        <circle cx="50" cy="50" r="30" />
                        {Array.from({ length: 8 }).map((_, i) => {
                          const angle = (i * 45 * Math.PI) / 180
                          const x1 = 50 + 30 * Math.cos(angle)
                          const y1 = 50 + 30 * Math.sin(angle)
                          const x2 = 50 + 38 * Math.cos(angle)
                          const y2 = 50 + 38 * Math.sin(angle)
                          return (
                            <rect
                              key={i}
                              x={x2 - 1.5}
                              y={y2 - 3}
                              width="3"
                              height="6"
                              transform={`rotate(${i * 45} ${x2} ${y2})`}
                            />
                          )
                        })}
                        <circle cx="50" cy="50" r="6" fill="#374151" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Connecting Rods/Pistons */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Horizontal connecting rod */}
                  <div
                    className={`absolute top-1/2 left-4 w-32 h-2 bg-gray-400 rounded transform -translate-y-1/2 ${isRunning ? "animate-pulse" : ""}`}
                  ></div>

                  {/* Vertical connecting rod */}
                  <div
                    className={`absolute left-1/2 top-4 w-2 h-24 bg-gray-400 rounded transform -translate-x-1/2 ${isRunning ? "animate-pulse" : ""}`}
                  ></div>

                  {/* Diagonal connecting rod */}
                  <div
                    className={`absolute top-8 right-16 w-20 h-2 bg-gray-400 rounded transform rotate-45 ${isRunning ? "animate-pulse" : ""}`}
                  ></div>
                </div>

                {/* Status Lights */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <div
                    className={`w-3 h-3 rounded-full ${isRunning ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                  ></div>
                  <div
                    className={`w-3 h-3 rounded-full ${isRunning ? "bg-yellow-400 animate-ping" : "bg-gray-500"}`}
                  ></div>
                  <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-red-400" : "bg-gray-500"}`}></div>
                </div>
              </div>

              {/* Machine Base */}
              <div className="mt-4 w-full h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg border-t-2 border-gray-600">
                <div className="flex justify-center items-center h-full">
                  <div className="text-gray-400 text-xs font-mono">INDUSTRIAL PRESS v2.1</div>
                </div>
              </div>

              {/* Side Panels */}
              <div className="absolute -left-4 top-4 w-8 h-48 bg-gradient-to-r from-gray-600 to-gray-700 rounded-l-lg border-2 border-gray-500"></div>
              <div className="absolute -right-4 top-4 w-8 h-48 bg-gradient-to-l from-gray-600 to-gray-700 rounded-r-lg border-2 border-gray-500"></div>
            </div>
          </div>
        </div>

        {/* Steam/Smoke Effect */}
        {isRunning && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce opacity-60"
                  style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Ground Vibration Effect */}
        {isRunning && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full">
            <div className="h-1 bg-gray-600 rounded animate-pulse opacity-50"></div>
          </div>
        )}
      </div>

      {/* Equipment Info Panel */}
      <div className="absolute bottom-8 left-8 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 shadow-lg">
        <h3 className="font-bold text-lg mb-2">Equipment Status</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={isRunning ? "text-green-400" : "text-red-400"}>{isRunning ? "RUNNING" : "STOPPED"}</span>
          </div>
          <div className="flex justify-between">
            <span>RPM:</span>
            <span className="text-yellow-400">{isRunning ? "1,250" : "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Pressure:</span>
            <span className="text-blue-400">{isRunning ? "85 PSI" : "0 PSI"}</span>
          </div>
          <div className="flex justify-between">
            <span>Temperature:</span>
            <span className="text-orange-400">{isRunning ? "78°C" : "22°C"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
