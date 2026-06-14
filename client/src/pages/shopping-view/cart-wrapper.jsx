// import { Button } from "@/components/ui/button";
// import { SheetContent, SheetHeader } from "@/components/ui/sheet";
// import UserCartItemsContent from "./cart-items-content";

import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

// const UserCartWrapper = ({ cartItems }) => {
//   return (
//     <SheetContent className="sm:max-w-md" style={{ zIndex: 1400 }}>
//       <SheetHeader>
//         <h2 className="text-xl font-bold">Your Cart</h2>{" "}
//       </SheetHeader>

//       <div className="mt-8 space-y-4">
//         {cartItems?.items?.length > 0
//           ? cartItems.items.map((item) => (
//               <UserCartItemsContent key={item.productId} cartItem={item} />
//             ))
//           : null}
//       </div>

//       <div className="mt-8">
//         <div className="flex justify-between">
//           <span className="font-bold">Total Amount</span>
//           <span className="font-bold">$0.00</span>
//         </div>
//       </div>

//       <Button className="w-full mt-6">Checkout</Button>
//     </SheetContent>
//   );
// };

// export default UserCartWrapper;

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;
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
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
