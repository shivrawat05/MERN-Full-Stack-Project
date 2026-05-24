import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React from "react";

const UserCartWrapper = () => {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4"></div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">$0.00</span>
        </div>
      </div>
      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
