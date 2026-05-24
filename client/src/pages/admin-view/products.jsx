import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import ImageUpload from "@/components/admin-view/image-upload";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

const schema = yup.object({
  title: yup.string().required("Product title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price must be a number"),
  totalStock: yup
    .number()
    .required("Stock is required")
    .typeError("Stock must be a number"),
});

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const AdminProducts = () => {
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ── Open sheet in EDIT mode ─────────────────────────────────────────────────
  const handleEdit = (product) => {
    setCurrentEditedId(product._id);
    setImageUrl(product.image || "");
    reset({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      totalStock: product.totalStock,
    });
    setIsSheetOpen(true);
  };

  // ── Open sheet in ADD mode ──────────────────────────────────────────────────
  const handleAddNew = () => {
    setCurrentEditedId(null);
    setImageUrl("");
    reset({
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      totalStock: "",
    });
    setIsSheetOpen(true);
  };

  const handleDelete = (id) => {
    console.log("Delete product", id);

    dispatch(deleteProduct(id)).then((result) => {
      if (result.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    });
  };

  const onSubmit = (data) => {
    const productData = {
      ...data,
      image: imageUrl,
    };

    if (currentEditedId) {
      // Edit existing product
      dispatch(editProduct({ id: currentEditedId, formData: productData }))
        .then((result) => {
          if (result.payload?.success) {
            dispatch(fetchAllProducts());
            setIsSheetOpen(false);
            setImageUrl("");
            reset();
            toast.success("Product updated successfully");
          } else {
            toast.error("Failed to update product");
          }
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Something went wrong");
        });
    } else {
      // Add new product
      dispatch(addNewProduct(productData))
        .then((result) => {
          if (result.payload?.success) {
            dispatch(fetchAllProducts());
            setIsSheetOpen(false);
            setImageUrl("");
            reset();
            toast.success("Product added successfully");
          } else {
            toast.error("Failed to add product");
          }
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Fragment>
      {/* ── Add New button ── */}
      <div className="mb-5 w-full flex justify-end">
        <Button variant="outline" onClick={handleAddNew}>
          Add New Product
        </Button>
      </div>

      {/* ── Product grid — outside <Sheet> ── */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* ── Controlled Sheet ── */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              {currentEditedId
                ? "Update the product details below"
                : "Add a new product to your inventory"}
            </SheetDescription>
          </SheetHeader>

          <div
            className={`grid flex-1 auto-rows-min gap-6 px-4 ${
              imageLoadingState ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Title</label>
                <input
                  {...register("title")}
                  placeholder="Enter product title"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">{errors.title?.message}</p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <ImageUpload
                  setImageLoadingState={setImageLoadingState}
                  setImageUrl={setImageUrl}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <input
                  {...register("description")}
                  placeholder="Enter product description"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">
                  {errors.description?.message}
                </p>
                {/* ✅ fixed key */}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select {...register("category")} className={inputClass}>
                  <option value="">Select category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
                <p className="text-sm text-red-500">
                  {errors.category?.message}
                </p>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <select {...register("brand")} className={inputClass}>
                  <option value="">Select brand</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="puma">Puma</option>
                </select>
                <p className="text-sm text-red-500">{errors.brand?.message}</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sales Price</label>
                <input
                  {...register("price")}
                  placeholder="Enter sales price"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">{errors.price?.message}</p>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <input
                  {...register("totalStock")}
                  placeholder="Enter total stock"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">
                  {errors.totalStock?.message}
                </p>
              </div>

              <Button type="submit">
                {currentEditedId ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
