// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import ImageUpload from "@/components/admin-view/image-upload";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormItem, FormControl } from "@/components/ui/form";
// import { Label } from "@radix-ui/react-label";
// import React, { Fragment, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addNewProduct } from "@/store/admin/products-slice";
// import { toast } from "sonner";

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Bug title must be at least 5 characters.")
//     .max(32, "Bug title must be at most 32 characters."),
//   description: z
//     .string()
//     .min(20, "Description must be at least 20 characters.")
//     .max(100, "Description must be at most 100 characters."),
//   category: z.string().optional(),
//   brand: z.string().optional(),
//   salesPrice: z.string().optional(),
//   totalStock: z.string().optional(),
// });

// export function AdminProducts() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "",
//       brand: "",
//       salesPrice: "",
//       totalStock: "",
//     },
//   });

//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const dispatch = useDispatch();
//   const { productList } = useSelector((state) => state.adminProducts);

//   const handleImageUpload = (image) => {
//     console.log("Image uploaded:", image);
//     setUploadedUrl(image);
//   };

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     const productData = {
//       ...data,
//       image: uploadedUrl,
//       price: data.salesPrice, // Map salesPrice to price for backend
//     };

//     dispatch(addNewProduct(productData)).then((result) => {
//       console.log("Product added successfully", result);
//       if (result?.payload?.success) {
//         setImageFile(null);
//         setUploadedUrl("");
//         form.reset();
//         toast.success("Product added successfully");
//       }
//     });
//   };

//   console.log("ProductList", productList);

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end"></div>
//       <Sheet>
//         <SheetTrigger asChild>
//           <div className="mb-5 w-full flex justify-end">
//             <Button variant="outline">Add New Product</Button>
//           </div>
//         </SheetTrigger>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>Add Product</SheetTitle>
//             <SheetDescription>
//               Add a new product to your inventory
//             </SheetDescription>
//           </SheetHeader>
//           <div
//             className={`grid flex-1 auto-rows-min gap-6 px-4 ${imageLoadingState ? "blur-sm pointer-events-none" : ""}`}
//           >
//             {/* form */}
//             <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//               <FormItem>
//                 <Label htmlFor="product-title">Product Title</Label>
//                 <Controller
//                   name="title"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormControl>
//                       <Input
//                         {...field}
//                         id="product-title"
//                         placeholder="Enter product title"
//                         autoComplete="off"
//                       />
//                     </FormControl>
//                   )}
//                 />
//               </FormItem>

//               <FormItem>
//                 <ImageUpload
//                   setImageLoadingState={setImageLoadingState}
//                   onImageUpload={handleImageUpload}
//                 />
//               </FormItem>

//               <FormItem>
//                 <Label htmlFor="product-description">Description</Label>
//                 <Controller
//                   name="description"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormControl>
//                       <textarea
//                         {...field}
//                         id="product-description"
//                         placeholder="Enter product description"
//                         rows={4}
//                         className="w-full p-2 border border-gray-300 rounded-md resize-none"
//                       />
//                     </FormControl>
//                   )}
//                 />
//                 <div className="text-sm text-gray-500 mt-1">
//                   {form.watch("description")?.length || 0}/100 characters
//                 </div>
//               </FormItem>

//               <FieldGroup>
//                 <Controller
//                   name="category"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field
//                       orientation="responsive"
//                       data-invalid={fieldState.invalid}
//                     >
//                       <FieldContent>
//                         <FieldLabel htmlFor="form-rhf-select-language">
//                           Category
//                         </FieldLabel>

//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </FieldContent>
//                       <Select
//                         name={field.name}
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger
//                           id="form-rhf-select-language"
//                           aria-invalid={fieldState.invalid}
//                           className="min-w-[120px]"
//                         >
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                         <SelectContent position="item-aligned">
//                           <SelectItem value="men">Men</SelectItem>
//                           <SelectItem value="women">Women</SelectItem>
//                           <SelectItem value="kids">Kids</SelectItem>
//                           <SelectSeparator />
//                         </SelectContent>
//                       </Select>
//                     </Field>
//                   )}
//                 />
//               </FieldGroup>

//               <FieldGroup>
//                 <Controller
//                   name="brand"
//                   control={form.control}
//                   render={({ field, fieldState }) => (
//                     <Field
//                       orientation="responsive"
//                       data-invalid={fieldState.invalid}
//                     >
//                       <FieldContent>
//                         <FieldLabel htmlFor="form-rhf-select-language">
//                           Brand
//                         </FieldLabel>

//                         {fieldState.invalid && (
//                           <FieldError errors={[fieldState.error]} />
//                         )}
//                       </FieldContent>
//                       <Select
//                         name={field.name}
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger
//                           id="form-rhf-select-language"
//                           aria-invalid={fieldState.invalid}
//                           className="min-w-[120px]"
//                         >
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                         <SelectContent position="item-aligned">
//                           <SelectItem value="nike">Nike</SelectItem>
//                           <SelectItem value="adidas">Adidas</SelectItem>
//                           <SelectItem value="puma">Puma</SelectItem>
//                           <SelectSeparator />
//                         </SelectContent>
//                       </Select>
//                     </Field>
//                   )}
//                 />
//               </FieldGroup>

//               <FormItem>
//                 <Label htmlFor="sales-price">Sales Price</Label>
//                 <Controller
//                   name="salesPrice"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormControl>
//                       <Input
//                         {...field}
//                         id="sales-price"
//                         placeholder="Enter sales price"
//                         autoComplete="off"
//                       />
//                     </FormControl>
//                   )}
//                 />
//               </FormItem>

//               <FormItem>
//                 <Label htmlFor="total-stock">Total Stock</Label>
//                 <Controller
//                   name="totalStock"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormControl>
//                       <Input
//                         {...field}
//                         id="total-stock"
//                         placeholder="Enter total stock"
//                         autoComplete="off"
//                       />
//                     </FormControl>
//                   )}
//                 />
//               </FormItem>

//               <Button type="submit">Save Product</Button>
//             </form>
//           </div>
//           <SheetFooter>
//             <SheetClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;
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
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
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

  const onSubmit = (data) => {
    const productData = {
      ...data,
      image: imageUrl,
    };

    dispatch(addNewProduct(productData))
      .then((result) => {
        if (result.payload?.success) {
          dispatch(fetchAllProducts());
          setIsSheetOpen(false); // ✅ fixed: was setOpenCreateProductsDialog
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
