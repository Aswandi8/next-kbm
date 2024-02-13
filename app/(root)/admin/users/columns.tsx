"use client";
import { usersParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
import UpdateUsers from "./updateUsers";
// import UpdateKriteria from "./updateKriteria";
// import DeleteKriteria from "./daleteKriteria";

export const columns: ColumnDef<usersParams>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("type");
      if (value === null) {
        return "Credential";
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dataUsers = row.original;

      return (
        <div className="flex items-center gap-2">
          <UpdateUsers dataUsers={dataUsers} />
          {/* <UpdateKriteria kriteria={kriteria} />
          <DeleteKriteria kriteria={kriteria} /> */}
        </div>
      );
    },
  },
];
