import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

export const linksAdmin = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/admin/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/admin/account",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Users",
    links: [
      {
        name: "Data Users",
        path: "/admin/users",
        icon: <IoHomeOutline />,
      },
    ],
  },
];
