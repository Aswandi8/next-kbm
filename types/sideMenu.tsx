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

export const linksKeuangan = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/keuangan/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/keuangan/account",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Accounting",
    links: [
      {
        name: "penjualan",
        path: "/keuangan/penjualan",
        icon: <IoHomeOutline />,
      },
      {
        name: "pembelian",
        path: "/keuangan/pembelian",
        icon: <IoHomeOutline />,
      },

      {
        name: "biaya",
        path: "/keuangan/biaya",
        icon: <IoHomeOutline />,
      },
    ],
  },
  {
    title: "neraca",
    links: [
      {
        name: "laba rugi",
        path: "/keuangan/neraca",
        icon: <IoHomeOutline />,
      },
      {
        name: "neraca kas",
        path: "/keuangan/neraca/kas",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Laporan",
    links: [
      {
        name: "Laporan Pembelian ",
        path: "/keuangan/lp-pembelian",
        icon: <IoHomeOutline />,
      },
      {
        name: "Laporan Penjualan",
        path: "/keuangan/lp-penjualan",
        icon: <IoHomeOutline />,
      },
      {
        name: "Laporan Neraca",
        path: "/keuangan/lp-neraca",
        icon: <IoHomeOutline />,
      },
      {
        name: "Laporan Biaya",
        path: "/keuangan/lp-biaya",
        icon: <IoHomeOutline />,
      },
    ],
  },
];
export const linksTeknisi = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/teknisi/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/teknisi/account",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Teknisi",
    links: [
      {
        name: "Sparepart",
        path: "/teknisi/sparepart",
        icon: <IoHomeOutline />,
      },
      {
        name: "Pekerjaan",
        path: "/teknisi/pekerjaan",
        icon: <IoHomeOutline />,
      },
      {
        name: "Data Survey",
        path: "/teknisi/survey",
        icon: <IoHomeOutline />,
      },
      {
        name: "Laporan Teknisi",
        path: "/teknisi/laporan",
        icon: <IoHomeOutline />,
      },
    ],
  },
];
export const linksMarketing = [
  {
    title: "Dashboard",
    links: [
      {
        name: "home",
        path: "/marketing/home",
        icon: <IoHomeOutline />,
      },
      {
        name: "account",
        path: "/marketing/account",
        icon: <FaRegUser />,
      },
    ],
  },
  {
    title: "Marketing",
    links: [
      {
        name: "Rekanan",
        path: "/marketing/rekanan",
        icon: <IoHomeOutline />,
      },
      {
        name: "Sparepart",
        path: "/marketing/mark-sparepart",
        icon: <IoHomeOutline />,
      },
      {
        name: "Data Survey",
        path: "/marketing/mark-survey",
        icon: <IoHomeOutline />,
      },
      {
        name: "Penawaran",
        path: "/marketing/penawaran",
        icon: <IoHomeOutline />,
      },
      {
        name: "Laporan",
        path: "/marketing/mark-laporan",
        icon: <IoHomeOutline />,
      },
    ],
  },
];
