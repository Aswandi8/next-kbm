"use client";
import Link from "next/link";
import MyImage from "../ui/image";
import MyButton from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavbarHome = () => {
  const session: any = useSession();
  const router = useRouter();
  return (
    <>
      <header className="bg-gray-300/50 dark:bg-slate-800/50 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="">
            <Link href={"/"} className="flex justify-center items-end gap-2">
              <MyImage
                src="/assets/images/bg-10.svg"
                alt="logo"
                className="h-9 w-fit"
              />
              <span className="text-xl font-bold uppercase">SANTAI</span>
            </Link>
          </div>
          <div>
            {session.status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="h-10 w-10">
                  <MyImage
                    src={session.data.user.photo}
                    alt="profile"
                    className="h-full w-full rounded-full object-cover object-center"
                  />
                </div>
                <MyButton
                  text="Sign Out"
                  customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
                />
              </div>
            ) : (
              <MyButton
                text="Sign In"
                customFunc={() => router.push("/auth/sign-in")}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default NavbarHome;
