import { Metadata } from "next";
import NavbarHome from "../components/home/navbra";
import FooterHome from "../components/home/footer";

export const metadata: Metadata = {
  title: "KBM",
  description: "PT KHALIFAH BORNEO MANDIRI",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gray-200 dark:bg-slate-900">
        <NavbarHome />
        {children}
        <FooterHome />
      </div>
    </>
  );
}
