import React, { useEffect, useRef } from "react";
import { useStateContext } from "@/context/ContextProvider";
import { HiX } from "react-icons/hi";
import MyImage from "../ui/image";

const NotificationView = () => {
  const { currentColor, currentColorText, handleClose } = useStateContext();
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
      className="z-50 absolute bg-gray-100 dark:bg-[#42464D] w-full sm:w-96 sm:right-24 top-16 p-6 rounded-lg"
      ref={ref}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p
            className="font-semibold text-lg dark:text-gray-200"
            style={{ color: currentColor }}
          >
            Notifications
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
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y dark:divide-gray-500"
          style={{ color: currentColor }}
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MyImage
                  src="/assets/images/avatar.svg"
                  className="w-8 h-8 rounded-full"
                  alt="image notification"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div
                className="inline-flex items-center  font-semibold"
                style={{ color: currentColorText }}
              >
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MyImage
                  src="/assets/images/avatar.svg"
                  className="w-8 h-8 rounded-full"
                  alt="image notification"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div
                className="inline-flex items-center  font-semibold"
                style={{ color: currentColorText }}
              >
                $320
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NotificationView;
