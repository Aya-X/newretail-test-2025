import { useState, useEffect } from "react";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import items from "@/data/items.json";
import { DataTable } from "@/components/DataTable";

import { type ProductType, columns } from "./data/columns";
import PriceRangeFilter from "./components/PriceRangeFilter";
import StockFilter from "./components/StockFilter";

function getData(): Promise<ProductType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items);
    }, 1000);
  });
}

export default function Products() {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const renderFilters = (table: Table<ProductType>) => (
    <>
      <Input
        placeholder="Filter name..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <PriceRangeFilter table={table} />
      <StockFilter table={table} />
    </>
  );

  useEffect(() => {
    getData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} filters={renderFilters} />
    </div>
  );
}
