"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  speed: number
  element: string
}

export const AnimatedBackground = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const studyElements = [
    "📚",
    "📖",
    "✏️",
    "📝",
    "🔬",
    "⚗️",
    "📐",
    "📏",
    "🧮",
    "💡",
    "∫",
    "∑",
    "π",
    "α",
    "β",
    "γ",
    "∆",
    "∞",
    "√",
    "±",
    "{}",
    "[]",
    "()",
    "</>",
    "fn",
    "var",
    "if",
    "for",
    "class",
    "cpp",
    "py",
    "js",
    "ts",
    "react",
  ]

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 25; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          speed: 0.2 + Math.random() * 0.8,
          element: studyElements[Math.floor(Math.random() * studyElements.length)],
        })
      }
      setElements(newElements)
    }

    generateElements()
    window.addEventListener("resize", generateElements)
    return () => window.removeEventListener("resize", generateElements)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const animateElements = () => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
         y: element.y < -50 ? window.innerHeight + 50 : element.y - element.speed,
          rotation: element.rotation + element.speed * 0.5,
        })),
      )
    }

    const interval = setInterval(animateElements, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed z-0 inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background" />
      </div>

      {/* Floating Elements */}
      {elements.map((element) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(element.x - mousePosition.x, 2) + Math.pow(element.y - mousePosition.y, 2),
        )
        const mouseEffect = Math.max(0, 1 - distanceFromMouse / 200)

        return (
          <div
            key={element.id}
            className="absolute text-white/20 select-none transition-all duration-300 hover:text-white/40"
            style={{
              left: element.x + mouseEffect * 20,
              top: element.y + mouseEffect * 20,
              transform: `rotate(${element.rotation + mouseEffect * 10}deg) scale(${element.scale + mouseEffect * 0.3})`,
              fontSize: `${16 + mouseEffect * 8}px`,
              filter: `blur(${Math.max(0, 1 - mouseEffect)}px)`,
            }}
          >
            {element.element}
          </div>
        )
      })}

      {/* Pulsing Circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/5 rounded-full animate-pulse delay-2000" />

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border border-white/10 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/10 animate-bounce-slow" />

      {/* Mathematical Formulas */}
      <div className="absolute top-1/3 right-1/3 text-white/10 text-2xl font-mono animate-fade-in-out">E = mc²</div>
      <div className="absolute bottom-1/3 left-1/3 text-white/10 text-xl font-mono animate-fade-in-out delay-3000">
        ∫f(x)dx
      </div>

      <style>{`
        .grid-background {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
