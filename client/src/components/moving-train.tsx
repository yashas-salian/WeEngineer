"use client"

export const MovingTrain= ()=> {
  const trainCars = [
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

  return (
    <div className="fixed top-0 left-0 w-full h-16 overflow-hidden z-50 pointer-events-none">
      <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
        {/* Engine */}
        <div className="flex-shrink-0 mr-2">
          <div className="relative mt-2">
            {/* Engine body */}
            <div className="w-16 h-12 border-2 border-orange-500 rounded-lg relative bg-transparent">
              <div className="absolute top-2 left-2 w-3 h-3 border border-orange-500 rounded-full"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border border-orange-500 rounded-full"></div>
            </div>
            {/* Smokestack */}
            <div className="absolute -top-4 left-5 w-3 h-4 border-2 border-orange-500 border-b-0 rounded-t-lg bg-transparent"></div>
            {/* Wheels */}
            <div className="absolute -bottom-2 left-2 w-4 h-4 border-2 border-orange-500 rounded-full bg-transparent"></div>
            <div className="absolute -bottom-2 right-2 w-4 h-4 border-2 border-orange-500 rounded-full bg-transparent"></div>
          </div>
        </div>

        {/* Train cars */}
        {trainCars.map((symbol, index) => (
          <div key={index} className="flex-shrink-0 mr-1">
            <div className="relative mt-2">
              {/* Car body */}
              <div className="w-12 h-12 border-2 border-orange-500 rounded-lg flex items-center justify-center bg-transparent">
                <span className="text-lg font-bold text-orange-600">{symbol}</span>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-2 left-1 w-3 h-3 border-2 border-orange-500 rounded-full bg-transparent"></div>
              <div className="absolute -bottom-2 right-1 w-3 h-3 border-2 border-orange-500 rounded-full bg-transparent"></div>
              {/* Coupling */}
              <div className="absolute top-1/2 -right-1 w-2 h-0.5 bg-orange-500 -translate-y-1/2"></div>
            </div>
          </div>
        ))}

        {/* Duplicate for seamless loop */}
        <div className="flex-shrink-0 mr-2 ml-8">
          <div className="relative mt-2">
            {/* Engine body */}
            <div className="w-16 h-12 border-2 border-orange-500 rounded-lg relative bg-transparent">
              <div className="absolute top-2 left-2 w-3 h-3 border border-orange-500 rounded-full"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border border-orange-500 rounded-full"></div>
            </div>
            {/* Smokestack */}
            <div className="absolute -top-4 left-5 w-3 h-4 border-2 border-orange-500 border-b-0 rounded-t-lg bg-transparent"></div>
            {/* Wheels */}
            <div className="absolute -bottom-2 left-2 w-4 h-4 border-2 border-orange-500 rounded-full bg-transparent"></div>
            <div className="absolute -bottom-2 right-2 w-4 h-4 border-2 border-orange-500 rounded-full bg-transparent"></div>
          </div>
        </div>

        {trainCars.map((symbol, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0 mr-1">
            <div className="relative mt-2">
              {/* Car body */}
              <div className="w-12 h-12 border-2 border-orange-500 rounded-lg flex items-center justify-center bg-transparent">
                <span className="text-lg font-bold text-orange-600">{symbol}</span>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-2 left-1 w-3 h-3 border-2 border-orange-500 rounded-full bg-transparent"></div>
              <div className="absolute -bottom-2 right-1 w-3 h-3 border-2 border-orange-500 rounded-full bg-transparent"></div>
              {/* Coupling */}
              <div className="absolute top-1/2 -right-1 w-2 h-0.5 bg-orange-500 -translate-y-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
