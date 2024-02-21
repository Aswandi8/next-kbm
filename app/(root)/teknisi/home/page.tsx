"use client";
import MyButton from "@/app/components/ui/button";
import { signOut } from "next-auth/react";

const HomeTeknisi = () => {
  return (
    <div>
      <MyButton
        text="Logout"
        customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
      />
      <h1>Home Teknisi</h1>
    </div>
  );
};
export default HomeTeknisi;
