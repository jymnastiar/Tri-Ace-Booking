import MainFooter from "@/components/layouts/main/footer";
import MainHeader from "@/components/layouts/main/header";

export default function MainPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
  <section>
    <MainHeader/>
    {children}
    <MainFooter/>
  </section>
  );
}
