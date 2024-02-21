"use client";
import MyButton from "@/app/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const HomeLogistic = () => {
  const session = useSession();
  console.log(session);
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
export default HomeLogistic;
