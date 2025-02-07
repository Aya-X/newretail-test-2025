import { useState } from "react";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import { type ProductType } from "@/features/products/data/columns";

type PriceRangeFilterPropsType = {
  table: Table<ProductType>;
};

export default function PriceRangeFilter(props: PriceRangeFilterPropsType) {
  const { table } = props;

  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  const handlePriceRangeChange = (type: "min" | "max", value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");
    setPriceRange((prev) => {
      const updated = { ...prev, [type]: newValue };
      table.getColumn("price")?.setFilterValue({
        min: updated.min,
        max: updated.max,
      });
      return updated;
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Min price"
        value={priceRange.min}
        onChange={(e) => handlePriceRangeChange("min", e.target.value)}
        className="max-w-[100px]"
      />
      <span>-</span>
      <Input
        placeholder="Max price"
        value={priceRange.max}
        onChange={(e) => handlePriceRangeChange("max", e.target.value)}
        className="max-w-[100px]"
      />
    </div>
  );
}
