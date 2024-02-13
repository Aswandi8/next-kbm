"use client";
import { useEffect, useState } from "react";
import MyButton from "../ui/button";
import MyImage from "../ui/image";
import { signOut } from "next-auth/react";

const NavbarMember = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);
  return (
    <nav
      className={`fixed w-full left-0 top-0 z-[999] py-4 ${
        sticky ? "bg-slate-900/60  text-gray-900" : "bg-slate-900 text-gray-100"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div>
          <h4 className="text-4xl uppercase font-bold">
            <MyImage
              alt="logo"
              src="/assets/images/logo.png"
              className="w-32"
            />
          </h4>
        </div>
        <div
          className={` ${
            sticky ? "md:bg-white/0 " : "bg-slate-900 text-gray-100"
          } text-gray-900 font-medium rounded-bl-full`}
        >
          <MyButton
            text="Logout"
            customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
          />
        </div>
      </div>
    </nav>
  );
};
export default NavbarMember;
