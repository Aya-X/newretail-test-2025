import { useState, useMemo } from "react";

import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

import { type ProductType } from "@/features/products/data/columns";

type CategoryFilterPropsType = {
  table: Table<ProductType>;
};

export default function CategoryFilter(props: CategoryFilterPropsType) {
  const { table } = props;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = useMemo(() => {
    const allCategories = new Set(
      table.getCoreRowModel().rows.map((row) => row.getValue("category"))
    );
    return Array.from(allCategories) as string[];
  }, [table]);

  const handleCategorySelect = (category: string) => {
    if (!selectedCategories.includes(category)) {
      const newCategories = [...selectedCategories, category];
      setSelectedCategories(newCategories);
      table.getColumn("category")?.setFilterValue(newCategories);
    }
  };

  // 移除單一類別
  const handleRemoveCategory = (categoryToRemove: string) => {
    const newCategories = selectedCategories.filter(
      (category) => category !== categoryToRemove
    );
    setSelectedCategories(newCategories);
    table
      .getColumn("category")
      ?.setFilterValue(newCategories.length ? newCategories : undefined);
  };

  // 清除所有選擇的類別
  const handleClearCategories = () => {
    setSelectedCategories([]);
    table.getColumn("category")?.setFilterValue(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Select onValueChange={handleCategorySelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="選擇類別" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategories.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCategories}
            className="h-8 px-2 lg:px-3"
          >
            清空
          </Button>
        )}
      </div>
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 px-1 hover:bg-transparent"
                onClick={() => handleRemoveCategory(category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
