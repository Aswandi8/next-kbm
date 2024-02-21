"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
import { dataTableSparepartParams } from "@/types";
import MyImage from "@/app/components/ui/image";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import { useStateContext } from "@/context/ContextProvider";
import { useEffect, useState } from "react";
const useIconColor = () => {
  const { currentColor } = useStateContext();
  const [iconColor, setIconColor] = useState(currentColor);

  useEffect(() => {
    setIconColor(currentColor);
  }, [currentColor]);

  return iconColor;
};
export const columns: ColumnDef<dataTableSparepartParams>[] = [
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("imageUrl");
      const leny = value.length - 1;
      const myImage = value[value.length - 1];
      return (
        <>
          <div className=" h-10 w-10">
            <MyImage
              alt="hero"
              src={myImage}
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "sparepart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sparepart" />
    ),
  },
  {
    accessorKey: "produksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produksi" />
    ),
  },
  {
    accessorKey: "merek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Merek" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "spesifikasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Spesifikasi" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sparepart = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const iconColor = useIconColor();

      return (
        <div className="flex items-center gap-2">
          <Link href={`/logistic/sparepart/update-sparepart/${sparepart.id}`}>
            <FaPencil style={{ color: iconColor }} />
          </Link>
          {/* <UpdateKriteria kriteria={kriteria} />
      <DeleteKriteria kriteria={kriteria} */}
        </div>
      );
    },
  },
];
