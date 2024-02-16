"use client";
import { kostParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
// import UpdateUsers from "./updateUsers";
// import UpdateKriteria from "./updateKriteria";
// import DeleteKriteria from "./daleteKriteria";

export const columns: ColumnDef<kostParams>[] = [
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
      const dataUsers = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* <UpdateUsers dataUsers={dataUsers} /> */}
          {/* <UpdateKriteria kriteria={kriteria} />
          <DeleteKriteria kriteria={kriteria} /> */}
        </div>
      );
    },
  },
];
