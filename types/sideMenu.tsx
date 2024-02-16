import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMapsHomeWork, MdOutlineAddHome } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { RiHome8Line } from "react-icons/ri";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { RiBarChartGroupedFill } from "react-icons/ri";

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

export const linksSuperAdmin = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/superadmin/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/superadmin/account",
        icon: <FaRegUser />,
      },
    ],
  },

  {
    title: "Kost",
    links: [
      {
        name: "data kost",
        path: "/superadmin/kost",
        icon: <HiOutlineHomeModern />,
      },
    ],
  },

  {
    title: "Kriteria",
    links: [
      {
        name: "data Kriteria",
        path: "/superadmin/kriteria",
        icon: <MdOutlineAddHome />,
      },
      {
        name: "data subkriteria",
        path: "/superadmin/kriteria/sub-kriteria",
        icon: <LiaLayerGroupSolid />,
      },
    ],
  },

  {
    title: "Metode moora",
    links: [
      {
        name: "penilaian kost",
        path: "/superadmin/moora/penilaian-kost",
        icon: <MdOutlineMapsHomeWork />,
      },
      {
        name: "metode moora",
        path: "/superadmin/moora",
        icon: <RiBarChartGroupedFill />,
      },
    ],
  },
];
