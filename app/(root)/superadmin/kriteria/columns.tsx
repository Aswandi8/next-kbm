"use client";
import { kriteriaParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
import UpdateKriteria from "./updateKriteria";
import DeleteKriteria from "./deleteKriteria";

export const columns: ColumnDef<kriteriaParams>[] = [
  {
    accessorKey: "kriteria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kriteria" />
    ),
  },
  {
    accessorKey: "bobot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bobot" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dataKriteria = row.original;

      return (
        <div className="flex items-center gap-2">
          <UpdateKriteria />
          <DeleteKriteria deleteKriteria={dataKriteria} />
          {/* <DeleteKost deleteKost={dataKost} /> */}
        </div>
      );
    },
  },
];
