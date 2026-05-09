const BigShuttlecockIcon = () => {
  return (
    <div className="relative flex items-center justify-center animate-float">
      <svg
        width="110" height="110"
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sm:w-[145px] sm:h-[145px] lg:w-[180px] lg:h-[180px]"
        style={{ filter: "drop-shadow(0 8px 32px rgba(14,165,233,0.18))" }}
      >
        <circle cx="55" cy="55" r="50" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2.5"/>
        <circle cx="55" cy="55" r="42" fill="white" stroke="#E0F2FE" strokeWidth="1.5"/>

        <ellipse cx="55" cy="76" rx="10" ry="5.5" fill="#BAE6FD"/>
        <ellipse cx="55" cy="74" rx="8" ry="4" fill="#7DD3FC"/>

        <path d="M55 72 Q40 56 36 36" stroke="#93C5FD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q43 54 42 32" stroke="#7DD3FC" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q48 52 48 28" stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q55 50 55 26" stroke="#0EA5E9" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q62 50 62 28" stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q67 52 68 32" stroke="#7DD3FC" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M55 72 Q70 54 74 36" stroke="#93C5FD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

        <ellipse cx="55" cy="29" rx="20" ry="5" stroke="#38BDF8" strokeWidth="1.8" fill="#E0F2FE" fillOpacity="0.5"/>
      </svg>
    </div>
  );
}
export default BigShuttlecockIcon;