import { useState, useEffect } from "react";

import items from "@/data/items.json";
import { DataTable } from "@/components/DataTable";

import { type ProductType, columns } from "./data/columns";

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
