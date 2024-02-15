"use client";
// import { CreatedKriteriaParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/components/data-tabel/DataTableColumnHeader";
// import UpdateKriteria from "./updateKriteria";
// import DeleteKriteria from "./daleteKriteria";
type columsParams = {
  id: string;
  type: string;
  merek: string;
  stock: number;
  spesifikasi: string;
  product: {
    sparepart: string;
    produksi: string;
  };
};
export const columns: ColumnDef<columsParams>[] = [
  {
    accessorKey: "product.sparepart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sparepart" />
    ),
  },
  {
    accessorKey: "product.produksi",
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const kriteria = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* <UpdateKriteria kriteria={kriteria} />
          <DeleteKriteria kriteria={kriteria} /> */}
        </div>
      );
    },
  },
];
