import NavbarMember from "@/app/components/member/navbar";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-900">
      <NavbarMember />
      {children}
    </div>
  );
}
