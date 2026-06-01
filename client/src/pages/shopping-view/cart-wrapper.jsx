import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  return (
    <SheetContent className="sm:max-w-md" style={{ zIndex: 1400 }}>
      <SheetHeader>
        <h2 className="text-xl font-bold">Your Cart</h2>{" "}
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems?.items?.length > 0
          ? cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          : null}
      </div>

      <div className="mt-8">
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
