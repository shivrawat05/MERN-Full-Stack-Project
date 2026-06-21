import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "@/store/shop/search-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ShoppingProductTile from "./product-tile";
import ProductDetailsDialog from "./product-details";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  function handleSearch(event) {
    event.preventDefault();
    if (keyword.trim()) {
      dispatch(getSearchResults(keyword.trim()));
    }
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    setOpenDetailsDialog(true);
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((result) => {
      if (result?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchResults.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : keyword && !isLoading ? (
        <div className="text-center text-muted-foreground">
          No products found for &quot;{keyword}&quot;
        </div>
      ) : null}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
