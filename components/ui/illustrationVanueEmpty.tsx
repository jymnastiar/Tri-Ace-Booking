import Badge from "./badge"

export default function IllustrationVanueEmpty(){
  return(
    <div className="relative mb-8 select-none">

      {/* glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle,#E0F2FE_0%,transparent_70%)]"/>

      {/* orbit ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 scale-[1.28] opacity-50" />

      {/* circle */}
      <div className="relative w-44 h-44 rounded-full flex items-center justify-center border border-sky-200 bg-[linear-gradient(145deg,#F0F9FF_0%,#E0F2FE_100%)]">
        <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="42" cy="48" rx="28" ry="18" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="42" y1="30" x2="42" y2="66" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="14" y1="48" x2="70" y2="48" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="38" cy="36" r="15" stroke="#38BDF8" strokeWidth="3" />
          <line x1="49" y1="47" x2="60" y2="58" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="33" y1="31" x2="43" y2="41" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="43" y1="31" x2="33" y2="41" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <Badge className="absolute -top-1.5 -right-1.5" variant="category">0 <span className="text-[10px] text-body">hasil</span></Badge>
      <Badge className="absolute -left-7 top-7" variant="category" icon="/icons/badminton.svg"></Badge>
      <Badge className="absolute -right-6 top-10" variant="category" icon="/icons/football.svg"></Badge>
      <Badge className="absolute -left-4 bottom-3" variant="category" icon="/icons/basket.svg"></Badge>
      <Badge className="absolute -right-4 bottom-6" variant="category" icon="/icons/tennis.svg"></Badge>
    </div>
  )
}