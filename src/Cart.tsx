import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "./cache";

function CartItem() {
  return <div>CartItem</div>;
}

export function Cart() {
  const cartItems = useReactiveVar(cartItemsVar);

  return (
    <div>
      <div>My Cart</div>
      {cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {cartItems.map((productId) => (
            <CartItem key={productId} />
          ))}
        </div>
      )}
    </div>
  );
}
