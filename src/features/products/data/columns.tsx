import { ColumnDef } from "@tanstack/react-table";

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
    header: "Price",
  },
  {
    accessorKey: "inStock",
    header: "InStock",
  },
];
