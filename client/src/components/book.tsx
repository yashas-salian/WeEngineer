const books = [
  { title: "PDF" },
  { title: "JS" },
  { title: "AI" },
  { title: "ML" },
  { title: "DS" },
  { title: "NLP" },
  { title: "DL" },
];

export default function InfiniteBookshelf() {
  return (
    <div className="flex justify-end items-center min-40 bg-black pr-20">
      <div className="relative w-[250px] h-40 rounded-lg shadow-2xl">
        {/* Book row */}
        <div className="absolute inset-0 px-2 flex items-end gap-2">
          {/* First half of static books */}
          {books.slice(0, 3).map((book, idx) => (
            <Book key={idx} title={book.title} />
          ))}

          {/* Animated book */}
          <div className="relative h-40 w-6">
            <div className="absolute h-full w-full bg-white rounded-t-sm shadow-md border border-gray-300 flex items-end justify-center animate-pullOut">
              <span className="text-[8px] text-black font-bold rotate-[-90deg] absolute bottom-1 left-[50%] translate-x-[-50%] whitespace-nowrap">
                PDF
              </span>

              {/* Spine + Page edge */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-sm" />
              <div className="absolute right-0 top-1 bottom-1 w-1 bg-yellow-100 rounded-r-sm opacity-80" />
            </div>
          </div>

          {/* Remaining books */}
          {books.slice(3).map((book, idx) => (
            <Book key={idx + 3} title={book.title} />
          ))}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes pullOut {
          0% { transform: translateX(0) translateY(0); }
          20% { transform: translateX(10px) translateY(-3px); }
          50% { transform: translateX(30px) translateY(-6px); }
          80% { transform: translateX(10px) translateY(-3px); }
          100% { transform: translateX(0) translateY(0); }
        }

        .animate-pullOut {
          animation: pullOut 3.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// 📚 Book Component
function Book({ title }: { title: string }) {
  return (
    <div className="relative h-40 w-6 bg-white rounded-t-sm shadow-md border border-gray-300 flex items-end justify-center">
      <span className="text-[8px] text-black font-bold rotate-[-90deg] absolute bottom-1 left-[50%] translate-x-[-50%] whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
