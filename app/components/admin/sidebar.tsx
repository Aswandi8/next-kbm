"use client";
import { useStateContext } from "@/context/ContextProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MyImage from "../ui/image";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { linksAdmin } from "@/types/sideMenu";
import MyHeading from "../ui/heading";
const SidebarAdmin = () => {
  const { activeMenu, setActiveMenu, currentColor, currentColorText } =
    useStateContext();
  const pathname = usePathname();
  return (
    <>
      {activeMenu && (
        <>
          <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 px-8 shadow-lg z-50 bg-gray-300 dark:bg-slate-800">
            <div className="flex justify-between items-center my-3 ">
              <MyImage
                src="/assets/images/logo.png"
                alt="logo"
                className="h-9 w-fit"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveMenu(!activeMenu)}
                      className="text-xl rounded-full block md:hidden"
                    >
                      <HiX style={{ color: currentColor }} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Closed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="myScrollbar">
              {linksAdmin.map((item) => (
                <div key={item.title}>
                  <MyHeading
                    title={item.title}
                    className="uppercase font-normal text-sm my-3"
                  />
                  {item.links.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.path}
                        style={{
                          backgroundColor:
                            pathname === link.path ? currentColor : "",
                          color: pathname === link.path ? currentColorText : "",
                        }}
                        className={`${
                          pathname === link.path
                            ? "capitalize tracking-wider flex items-center rounded-lg p-2 pl-4 my-3 gap-3 text-gray-300 shadow-md text-md"
                            : `capitalize tracking-wider flex items-center rounded-lg p-2 pl-4 my-3 gap-3   hover:shadow-md hover:bg-gray-300 dark:hover:bg-slate-800 text-md`
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default SidebarAdmin;
