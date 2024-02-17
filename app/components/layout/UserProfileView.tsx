import React, { useEffect, useRef } from "react";
import { useStateContext } from "@/context/ContextProvider";
import { HiX } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import MyImage from "../ui/image";
import MyButton from "../ui/button";

const UserProfileView = () => {
  const { data: session, status } = useSession();
  const { currentColor, handleClose, currentColorText } = useStateContext();
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);
  return (
    <div
      className="z-50 absolute bg-gray-100 dark:bg-[#42464D] w-full sm:w-96 sm:right-4 top-16 p-6 rounded-lg"
      ref={ref}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <div
          onClick={() => handleClose()}
          className="cursor-pointer"
          style={{ color: currentColor }}
        >
          <HiX />
        </div>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <MyImage
          src={
            session?.user?.photo
              ? session?.user?.photo
              : "/assets/images/avatar.svg"
          }
          alt="User Profile"
          className="rounded-full h-24 w-24"
        />
        <div>
          <p
            className="font-semibold text-xl dark:text-gray-200 capitalize"
            style={{ color: currentColorText }}
          >
            {session?.user?.username}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
            {session?.user?.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <MyButton
          text="Log Out"
          customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
        />
      </div>
    </div>
  );
};
export default UserProfileView;
