import React, { useEffect, useRef } from "react";
import { useStateContext } from "@/context/ContextProvider";
import { HiX } from "react-icons/hi";

const CartView = () => {
  const { currentColor, handleClose } = useStateContext();
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
      className="z-50 absolute bg-gray-100 dark:bg-[#42464D] w-full sm:w-96 sm:right-40 top-16 p-6 rounded-lg shadow-lg"
      ref={ref}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p
            className="font-semibold text-lg dark:text-gray-200"
            style={{ color: currentColor }}
          >
            Chart
          </p>
        </div>
        <div
          onClick={() => handleClose()}
          className="cursor-pointer"
          style={{ color: currentColor }}
        >
          <HiX />
        </div>
      </div>
    </div>
  );
};
export default CartView;
