"use client"

export const EngineeringMachine = () => {
  return (
    <div className="flex justify-end pr-20 min-h-44 bg-black flex items-center justify-center">
      <div className="relative">
        {/* Large Main Gear */}
        <div className="w-32 h-32">
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
            <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
              <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
            </svg>
          </div>
        </div>

        {/* Second Gear - Top Right */}
        <div className="absolute -top-4 -right-16 w-20 h-20">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
              <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
            </svg>
          </div>
        </div>

        {/* Third Gear - Top Left */}
        <div className="absolute -top-4 -left-16 w-16 h-16">
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "1.5s" }}>
            <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
              <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.03-2.56a6.96 6.96 0 0 0 0-1.88l2.11-1.65a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.63-.95l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.63.95l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.65L4.97 11.06a6.96 6.96 0 0 0 0 1.88l-2.11 1.65a.5.5 0 0 0-.12.65l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.03 7.03 0 0 0 1.63.95l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.63-.95l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.65L19.03 12.94z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
