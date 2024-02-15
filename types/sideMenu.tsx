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

export const linksLogistic = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/logistic/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/logistic/account",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Sparepart",
    links: [
      {
        name: "sparepart",
        path: "/logistic/sparepart",
        icon: <IoHomeOutline />,
      },
    ],
  },
  {
    title: "Barang Keluar",
    links: [
      {
        name: "PR Marketing",
        path: "/logistic/pr-marketing",
        icon: <IoHomeOutline />,
      },
      {
        name: "Garansi",
        path: "/logistic/garansi",
        icon: <IoHomeOutline />,
      },
      {
        name: "Peminjaman",
        path: "/logistic/peminjaman",
        icon: <IoHomeOutline />,
      },
    ],
  },
];
