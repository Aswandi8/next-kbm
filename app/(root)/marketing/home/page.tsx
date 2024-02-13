"use client";
import MyButton from "@/app/components/ui/button";
import { signOut } from "next-auth/react";

const HomeMarketing = () => {
  return (
    <div>
      <MyButton
        text="Logout"
        customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
      />
      <h1>Home Keuangan</h1>
    </div>
  );
};
export default HomeMarketing;
