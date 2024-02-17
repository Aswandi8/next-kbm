import React, { useEffect, useRef } from "react";
import { useStateContext } from "@/context/ContextProvider";
import { HiX } from "react-icons/hi";
import MyImage from "../ui/image";

const ChatView = () => {
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
      className="z-50 absolute w-full bg-gray-100 dark:bg-[#42464D]  sm:w-96 sm:right-32 top-16 p-6 rounded-lg"
      ref={ref}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p
            className="font-semibold text-lg dark:text-gray-200"
            style={{ color: currentColor }}
          >
            Chat
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
            style={{ color: currentColorText }}
          >
            5 New
          </button>
        </div>
        <div
          onClick={() => handleClose()}
          className="cursor-pointer"
          style={{ color: currentColor }}
        >
          <HiX />
        </div>
      </div>

      <ul
        role="list"
        className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
      >
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <MyImage
                src="/assets/images/avatar.svg"
                className="w-8 h-8 rounded-full"
                alt="image chat"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span
              className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: currentColor }}
            >
              <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
              Available
            </span>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <MyImage
                src="/assets/images/avatar.svg"
                className="w-8 h-8 rounded-full"
                alt="image chat"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
              Unavailable
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default ChatView;
