import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/icons/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  logoSide?: "left" | "right";
}

export default function AuthLayout({
  children,
  imageSrc,
  imageAlt,
  imageSide = "left",
  logoSide = "left",
}: AuthLayoutProps) {
  const logoPosition = logoSide === "left" ? "left-6" : "right-6";
  const contentOrder = imageSide === "left" ? "order-2 lg:order-2" : "order-2 lg:order-1";
  const imagePanelOrder = imageSide === "left" ? "order-1 lg:order-1" : "order-1 lg:order-2";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* IMAGE PANEL */}
      <div className={`relative lg:w-1/2 h-52 lg:h-auto shrink-0 overflow-hidden ${imagePanelOrder}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-bottom lg:object-center"
          priority
        />
        <div className={`absolute top-5 ${logoPosition} z-10`}>
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-extrabold text-body text-base tracking-tight drop-shadow">
              TRI-ACE <span className="text-primary">BOOKING</span>
            </span>
          </Link>
        </div>
      </div>

      {/* CONTENT PANEL */}
      <div className={`flex-1 flex items-center justify-center bg-white px-6 py-10 ${contentOrder}`}>
        <div className="w-full max-w-md animate-fade-up">
          {children}
        </div>
      </div>
    </div>
  );
}
