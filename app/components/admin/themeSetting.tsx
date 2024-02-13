"use client";
import { useStateContext } from "@/context/ContextProvider";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { themeColors } from "@/types/themeColor";
import { themeColorsText } from "@/types/themeColorText";
import { HiX } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import MyHeading from "../ui/heading";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import MySeparator from "../ui/separator";
const ThemeSetting = () => {
  const { theme, setTheme } = useTheme();
  const ref: any = useRef();
  const {
    setColor,
    currentColor,
    setColorText,
    currentColorText,
    setThemeSettings,
  } = useStateContext();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setThemeSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setThemeSettings]);
  return (
    <>
      <div
        className="w-screen h-full sm:w-[375px] fixed top-0 right-0 bg-gray-300 dark:bg-slate-800 p-4 shadow-lg z-50 overflow-y-scroll"
        ref={ref}
      >
        <div className="flex flex-col w-full gap-4 ">
          <div>
            <div className="flex justify-between items-center">
              <MyHeading title="Settings" />
              <button
                type="button"
                onClick={() => setThemeSettings(false)}
                style={{ color: currentColor }}
                className=""
              >
                <HiX />
              </button>
            </div>
            <MySeparator label="horizontal" />
          </div>
          <div className="">
            <MyHeading title="Theme Option" />

            <div className="mt-4 text-md text-slate-800 dark:text-gray-200">
              {theme === "dark" ? (
                <>
                  <h1
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setTheme("light")}
                  >
                    <BsMoonStarsFill /> Dark
                  </h1>
                </>
              ) : (
                <>
                  <h1
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => setTheme("dark")}
                  >
                    <IoSunny />
                    Light
                  </h1>
                </>
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <MyHeading title=" Theme Colors" />
            <div className="grid grid-cols-6 gap-3 mt-3">
              {themeColors.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck
                    className={`ml-2 text-2xl font-bold text-white ${
                      item.color === currentColor ? "block" : "hidden"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <MyHeading title=" Text Colors" />
            <div className="grid grid-cols-6 gap-3 mt-3">
              {themeColorsText.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer hover:shadow-md"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColorText(item.color)}
                >
                  <BsCheck
                    className={`ml-2 text-2xl font-bold text-white ${
                      item.color === currentColorText ? "block" : "hidden"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThemeSetting;
