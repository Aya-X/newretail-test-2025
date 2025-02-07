import { Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { type ProductType } from "@/features/products/data/columns";

type StockFilterPropsType = {
  table: Table<ProductType>;
};

export default function StockFilter(props: StockFilterPropsType) {
  const { table } = props;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="stock-filter"
        checked={
          (table.getColumn("inStock")?.getFilterValue() as boolean) ?? false
        }
        onCheckedChange={(checked: boolean) => {
          table.getColumn("inStock")?.setFilterValue(checked);
        }}
      />
      <Label htmlFor="stock-filter">只顯示「有庫存」</Label>
    </div>
  );
}
