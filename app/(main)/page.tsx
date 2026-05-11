import MainContent from "@/components/layouts/main/content";
import MainHero from "@/components/layouts/main/hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainHero />
      <Suspense>
        <MainContent />
      </Suspense>
    </>
  );
}