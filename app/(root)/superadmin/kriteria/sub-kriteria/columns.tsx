"use client";
import { subkriteriaParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
import DeleteSubkriteria from "./deleteSubkriteria";
// import UpdateKriteria from "./updateKriteria";
// import DeleteKriteria from "./deleteKriteria";

export const columns: ColumnDef<subkriteriaParams>[] = [
  {
    accessorKey: "kriterias.kriteria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kriteria" />
    ),
  },
  {
    accessorKey: "subkriteria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subkriteria" />
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
      const dataSubkriteria = row.original;

      return (
        <div className="flex items-center gap-2">
          <DeleteSubkriteria deleteSubkriteria={dataSubkriteria} />
          {/* <UpdateKriteria />
          <DeleteKriteria deleteKriteria={dataKriteria} /> */}
          {/* <DeleteKost deleteKost={dataKost} /> */}
        </div>
      );
    },
  },
];
