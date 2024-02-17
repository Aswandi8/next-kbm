"use client";
import { kostParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
import DeleteKost from "./add-kost/deleteKost";
import MyImage from "@/app/components/ui/image";

export const columns: ColumnDef<kostParams>[] = [
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
    accessorKey: "kost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kost" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("room") + " room";
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dataKost = row.original;

      return (
        <div className="flex items-center gap-2">
          <DeleteKost deleteKost={dataKost} />
        </div>
      );
    },
  },
];
