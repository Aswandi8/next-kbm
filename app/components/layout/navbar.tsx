"use client";
import { useStateContext } from "@/context/ContextProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ButtonIcon from "../ui/buttonIcon";
import {
  MdKeyboardArrowDown,
  MdNotificationsNone,
  MdOutlineChatBubbleOutline,
  MdOutlineDehaze,
  MdOutlineShoppingCart,
} from "react-icons/md";
import MyImage from "../ui/image";
import { signOut, useSession } from "next-auth/react";
import MyHeading from "../ui/heading";
const NavbarAdmin = () => {
  const session = useSession();
  const {
    activeMenu,
    setActiveMenu,
    currentColor,
    currentColorText,
    isClicked,
    handleClick,
  } = useStateContext();
  return (
    <>
      <div className="flex justify-between items-center relative py-2 mb-5">
        <ButtonIcon
          title="Menu"
          customFunc={() => setActiveMenu(!activeMenu)}
          color={currentColor}
          dotColor=""
          icon={<MdOutlineDehaze />}
        />
        <div className="flex gap-4">
          <ButtonIcon
            title="Cart"
            customFunc={() => signOut({ callbackUrl: "/auth/sign-in" })}
            color={currentColor}
            dotColor=""
            icon={<MdOutlineShoppingCart />}
          />
          <ButtonIcon
            title="Chat"
            customFunc={() => handleClick("chat")}
            color={currentColor}
            dotColor="#EEF327"
            icon={<MdOutlineChatBubbleOutline />}
          />
          <ButtonIcon
            title="Notification"
            customFunc={() => handleClick("notification")}
            color={currentColor}
            dotColor="#EEF327"
            icon={<MdNotificationsNone />}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                  onClick={() => handleClick("userProfile")}
                >
                  <MyImage
                    src={
                      session?.data?.user?.photo
                        ? session?.data?.user?.photo
                        : "/assets/images/avatar.svg"
                    }
                    alt="avatar"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <MyHeading
                    title={
                      session?.data?.user?.username
                        ? session?.data?.user?.username
                        : ""
                    }
                    className="capitalize overflow-ellipsis overflow-hidden whitespace-nowrap "
                  />
                  <MdKeyboardArrowDown
                    className="text-xl dark:text-white dark:hover:text-kbm-hover"
                    style={{ color: currentColor }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* {isClicked.cart && <CartView />}
        {isClicked.chat && <ChatView />}
        {isClicked.notification && <NotificationView />}
        {isClicked.userProfile && <UserProfileView />} */}
      </div>
    </>
  );
};
export default NavbarAdmin;
