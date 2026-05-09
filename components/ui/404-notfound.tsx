import { BigShuttlecockIcon } from "@/src/icons"

export default function NotFoundLogo() {
  return (
    <div className="relative mb-8 select-none">

      {/* 404 text */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <span className="notfound-number font-extrabold text-[120px] sm:text-[160px] lg:text-[200px] leading-none tracking-tighter">
          4
        </span>

        <BigShuttlecockIcon/>

        <span className="notfound-number font-extrabold text-[120px] sm:text-[160px] lg:text-[200px] leading-none tracking-tighter">
          4
        </span>
      </div>

      <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#BAE6FD] opacity-80"/>
      <div className="absolute top-10 right-6 w-2 h-2 rounded-full bg-[#7DD3FC]"/>
      <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-[#38BDF8]"/>
      <div className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-[#BAE6FD] opacity-70"/>
    </div>
  );
}