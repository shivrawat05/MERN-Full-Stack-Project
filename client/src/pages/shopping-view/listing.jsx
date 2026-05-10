import React, { useEffect } from "react";
import ProductFilter from "./filter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const useSelec = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  //fetch list of products
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">10 Products</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-50">
              <DropdownMenuRadioGroup>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productList && productList.length > 0}
      </div>
    </div>
  );
};

export default ShoppingListing;
