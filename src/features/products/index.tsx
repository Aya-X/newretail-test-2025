import { useState, useEffect } from "react";

import { Table } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Package2 } from "lucide-react";

import items from "@/data/items.json";
import { DataTable } from "@/components/DataTable";

import { type ProductType, columns } from "./data/columns";
import PriceRangeFilter from "./components/PriceRangeFilter";
import StockFilter from "./components/StockFilter";
import CategoryFilter from "./components/CategoryFilter";

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
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Package2 className="h-5 w-5" />
          產品篩選
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 items-start">
          <Input
            placeholder="搜尋商品名稱..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <PriceRangeFilter table={table} />
        </div>

        <Separator />

        <div className="flex flex-wrap gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">庫存狀態</h3>
            <StockFilter table={table} />
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium mb-2">商品類別</h3>
            <CategoryFilter table={table} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    getData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton className="h-[200px] w-full" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="space-y-6">
        <DataTable columns={columns} data={data} filters={renderFilters} />
      </div>
    </ScrollArea>
  );
}
