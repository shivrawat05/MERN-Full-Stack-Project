import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminProductTile = ({ product, handleEdit, handleDelete }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={product?.images}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold">${product?.salePrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button>View</Button>
        <Button
          onClick={() => {
            handleEdit(product);
            console.log("Edit product", product._id);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelete(product);
            console.log("Delete product", product._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
