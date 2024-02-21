"use client";
import FooterAdmin from "@/app/components/layout/footer";
import NavbarAdmin from "@/app/components/layout/navbar";
import SidebarTeknisi from "@/app/components/teknisi/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineSettings } from "react-icons/md";
import ThemeSetting from "@/app/components/layout/themeSetting";
import { useStateContext } from "@/context/ContextProvider";
import { useEffect } from "react";

export default function TeknisiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentColorText,
  } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);
  return (
    <>
      <div className="flex relative bg-gray-200 dark:bg-slate-900">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          {themeSettings ? (
            ""
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setThemeSettings(!themeSettings)}
                    style={{
                      background: currentColor,
                      color: currentColorText,
                      borderRadius: "50%",
                    }}
                    className="text-2xl p-2 hover:drop-shadow-xl text-white"
                  >
                    <MdOutlineSettings />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Setting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {activeMenu ? (
          <>
            <div className="w-72 sidebar fixed z-10 bg-gray-200 dark:bg-slate-800">
              <SidebarTeknisi />
            </div>
          </>
        ) : (
          <>
            <div className="w-0">
              <SidebarTeknisi />
            </div>
          </>
        )}
        <div
          className={
            activeMenu
              ? "min-h-screen md:ml-72 w-full"
              : "w-full min-h-screen flex-2"
          }
        >
          <div className="px-4">
            <div className="md:static w-full ">
              <NavbarAdmin />
            </div>
            <div className="">{children}</div>
            <div className="my-4">
              <FooterAdmin />
            </div>
          </div>
          {themeSettings && <ThemeSetting />}
        </div>
      </div>
    </>
  );
}
