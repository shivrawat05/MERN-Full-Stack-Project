import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ImageUpload from "@/components/admin-view/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  category: z.string().optional(),
  brand: z.string().optional(),
  salesPrice: z.string().optional(),
  totalStock: z.string().optional(),
});

export function AdminProducts() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      salesPrice: "",
      totalStock: "",
    },
  });

  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  const handleImageUpload = (image) => {
    console.log("Image uploaded:", image);
    setUploadedUrl(image);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    const productData = {
      ...data,
      image: uploadedUrl,
      price: data.salesPrice, // Map salesPrice to price for backend
    };

    dispatch(addNewProduct(productData)).then((result) => {
      console.log("Product added successfully", result);
      if (result?.payload?.success) {
        setImageFile(null);
        setUploadedUrl("");
        form.reset();
        toast({
          title: "Product added successfully",
        });
      }
    });
  };

  console.log("ProductList", productList);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end"></div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="mb-5 w-full flex justify-end">
            <Button variant="outline">Add New Product</Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Product</SheetTitle>
            <SheetDescription>
              Add a new product to your inventory
            </SheetDescription>
          </SheetHeader>
          <div
            className={`grid flex-1 auto-rows-min gap-6 px-4 ${imageLoadingState ? "blur-sm pointer-events-none" : ""}`}
          >
            {/* form */}
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FormItem>
                <Label htmlFor="product-title">Product Title</Label>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        id="product-title"
                        placeholder="Enter product title"
                        autoComplete="off"
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <FormItem>
                <ImageUpload
                  setImageLoadingState={setImageLoadingState}
                  onImageUpload={handleImageUpload}
                />
              </FormItem>

              <FormItem>
                <Label htmlFor="product-description">Description</Label>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <textarea
                        {...field}
                        id="product-description"
                        placeholder="Enter product description"
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md resize-none"
                      />
                    </FormControl>
                  )}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {form.watch("description")?.length || 0}/100 characters
                </div>
              </FormItem>

              <FieldGroup>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-language">
                          Category
                        </FieldLabel>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                          <SelectSeparator />
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="brand"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-language">
                          Brand
                        </FieldLabel>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="puma">Puma</SelectItem>
                          <SelectSeparator />
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </FieldGroup>

              <FormItem>
                <Label htmlFor="sales-price">Sales Price</Label>
                <Controller
                  name="salesPrice"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        id="sales-price"
                        placeholder="Enter sales price"
                        autoComplete="off"
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <FormItem>
                <Label htmlFor="total-stock">Total Stock</Label>
                <Controller
                  name="totalStock"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        id="total-stock"
                        placeholder="Enter total stock"
                        autoComplete="off"
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <Button type="submit">Save Product</Button>
            </form>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
