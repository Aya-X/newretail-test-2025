import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
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
    header: "商品名稱",
  },
  {
    accessorKey: "category",
    header: "類別",
    filterFn: (row, columnId, value: string[]) => {
      if (!value?.length) return true;
      const category = row.getValue(columnId) as string;
      return value.includes(category);
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          價格
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (value) => {
      return (
        <>
          <span className="font-medium">
            $ {new Intl.NumberFormat().format(value.getValue() as number)}
          </span>
        </>
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
    header: "有庫存",
    cell: (value) => {
      return (
        <>
          <Badge
            variant={value.getValue() ? "secondary" : "destructive"}
            className="w-20 justify-center"
          >
            {value.getValue() ? "有庫存" : "缺貨"}
          </Badge>
        </>
      );
    },
    filterFn: (row, columnId, value: boolean) => {
      if (value === undefined || value === null) return true;
      return row.getValue(columnId) === value;
    },
  },
];
