"use client";
import MyButton from "@/app/components/ui/button";
import { signOut } from "next-auth/react";

const AccountMarketing = () => {
  return (
    <div>
      <MyButton
        text="Logout"
        customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
      />
      <div>
        <h1>sdfhsdf</h1>
      </div>
      <h1>Home Marketing</h1>
    </div>
  );
};
export default AccountMarketing;
