import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type ProductType = {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, value: { min: string; max: string }) => {
      const price = row.getValue(columnId) as number;
      const min = value.min === "" ? -Infinity : Number(value.min);
      const max = value.max === "" ? Infinity : Number(value.max);
      return price >= min && price <= max;
    },
  },
  {
    accessorKey: "inStock",
    header: "InStock",
    filterFn: (row, columnId, value: boolean) => {
      if (value === undefined || value === null) return true;
      return row.getValue(columnId) === value;
    },
  },
];
