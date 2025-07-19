"use client"

import { useState } from "react"
import robot from "./images/robot-image.png"
export default function WavingBotImage() {
  const [isWaving, setIsWaving] = useState(true)

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {/* Static Robot Image */}
      <img
        src={robot}
        alt="White Robot Waving"
        className="floating-robot"
        width="400"
      />

      {/* Overlay Hand (waving) */}
      {isWaving && (
        <div
          className="absolute z-10 w-20 h-6 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full border border-blue-700 shadow-lg origin-left animate-wave"
          style={{
            top: "46%",  // adjust these for perfect positioning
            left: "28%", // tweak based on image placement
            transform: "rotate(0deg)",
          }}
        ></div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsWaving(!isWaving)}
        className="absolute bottom-10 px-5 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        {isWaving ? "Stop Waving" : "Wave Hello!"}
      </button>
    </div>
  )
}
