import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "./product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";


const ShoppingListing = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );

  const { user } = useSelector((state) => state.auth);

  //function logic
  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((result) => {
      console.log(result);
      if (result?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  //function logic

  //useEffect
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
      dispatch(fetchAllFilteredProducts());
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }),
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);
  //useEffect

  console.log("productList", productList);

  function handleGetProductDetails(id) {
    console.log("Product Id", id);
    dispatch(fetchProductDetails(id));
  }

  console.log("Product Details fetched", productDetails);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  function createSearchParamsHelper(filterParams) {
    // Defines a function that converts filter data into URL query parameters.

    // Example input:

    // {
    //   category: ["mobile", "laptop"],
    //   brand: ["apple"]
    // }
    const queryParams = [];
    //     Creates an empty array to store query strings.

    // Example later:

    // [
    //   "category=mobile,laptop",
    //   "brand=apple"
    // ]

    for (const [key, value] of Object.entries(filterParams)) {
      // Object.entries(filterParams);

      // Converts object into key-value pairs.

      // Example:

      // {
      //   category: ["mobile"],
      //   brand: ["apple"]
      // }

      // becomes:

      // [
      //   ["category", ["mobile"]],
      //   ["brand", ["apple"]]
      // ]

      if (Array.isArray(value) && value.length > 0) {
        //         Checks:

        // value is an array
        // Array is not empty

        // Example:

        // ["mobile"]

        // passes.
        const paramValue = value.join(",");
        // Converts array into comma-separated string.

        // Example:

        // ["mobile", "laptop"]

        // becomes:

        // "mobile,laptop"

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        //         Creates a query parameter string.

        // Example:

        // category=mobile%2Claptop
        // encodeURIComponent

        // Encodes special characters safely for URLs.

        // Example:

        // comma , becomes %2C
        // spaces become %20
      }
    }

    console.log(queryParams, "queryParams");

    return queryParams.join("&");
    //     Joins all query params with &.

    // Example:

    // "category=mobile%2Claptop&brand=apple"

    // This becomes the final query string.
  }

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const params = value.join(",");
        queryParams.push(`${key}= ${encodeURIComponent(params)}`);
      }
    }

    return queryParams.join("&");
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSort = (value) => {
    console.log("sort value", value);
    setSort(value);
  };

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  console.log("Filters", filters, searchParams);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //fetch list of products
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
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
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                  // handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingListing;
