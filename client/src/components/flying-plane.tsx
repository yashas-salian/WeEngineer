"use client"

interface FlyingPlaneProps {
  message?: string
}

export default function FlyingPlane({ message = "“Sharing knowledge is the most fundamental act of friendship. Because it is a way you can give something without losing anything.”" }: FlyingPlaneProps) {
  return (
    <div className="absolute top-194 left-0 w-full h-20 overflow-hidden z-50 pointer-events-none">
      <div className="flex animate-[fly_15s_linear_infinite] whitespace-nowrap">
        {/* Plane */}
        <div className="flex-shrink-0 relative">
          {/* Plane body */}
          <div className="relative">
            {/* Main fuselage (body) */}
            <div className="w-20 h-6 bg-white rounded-full relative">
              {/* Cockpit windows */}
              <div className="absolute top-1 left-2 w-3 h-2 bg-white rounded-full"></div>
              <div className="absolute top-1 left-6 w-2 h-1 bg-white rounded-full"></div>
              <div className="absolute top-1 left-9 w-2 h-1 bg-white rounded-full"></div>
              <div className="absolute top-1 left-12 w-2 h-1 bg-white rounded-full"></div>
            </div>

            {/* Main wings */}
            <div className="absolute top-2 left-6 w-16 h-3 bg-white rounded-full"></div>

            {/* Wing tips */}
            <div className="absolute top-1.5 left-4 w-3 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1.5 right-2 w-3 h-1 bg-white rounded-full"></div>

            {/* Tail section */}
            <div className="absolute top-0 right-1 w-6 h-8 bg-white rounded-r-lg"></div>

            {/* Horizontal stabilizer */}
            <div className="absolute top-1 right-0 w-8 h-2 bg-white rounded-full"></div>

            {/* Vertical stabilizer */}
            <div className="absolute -top-1 right-2 w-3 h-4 bg-white rounded-t-lg"></div>

            {/* Engine under wing */}
            <div className="absolute top-4 left-8 w-4 h-2 bg-white rounded-full"></div>
            <div className="absolute top-4 left-14 w-4 h-2 bg-white rounded-full"></div>

            {/* Nose cone */}
            <div className="absolute top-2 -left-2 w-4 h-2 bg-white rounded-l-full"></div>
          </div>

          {/* Banner rope */}
          <div className="absolute top-8 left-10 w-0.5 h-4 bg-white"></div>

          {/* Banner flag */}
          <div className="absolute top-10 right-0 min-w-max">
            <div className="relative">
              {/* Flag background */}
              <div className="bg-tranparent border-2 border-b-2 border-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-white font-semibold text-sm whitespace-nowrap">{message}</span>
              </div>
              {/* Flag tail */}
              <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                <div className="absolute top-0 left-0 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent transform translate-x-0.5"></div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  )
}
