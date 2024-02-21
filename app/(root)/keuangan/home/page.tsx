"use client";
import MyButton from "@/app/components/ui/button";
import { signOut } from "next-auth/react";

const HomeKeuangan = () => {
  return (
    <div>
      <MyButton
        text="Logout"
        customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
      />
      <div>
        <h1>sdfhsdf</h1>
      </div>
      <h1>Home Keuangan</h1>
    </div>
  );
};
export default HomeKeuangan;
