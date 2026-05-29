import { useSelector } from "../hooks/useCustomRedux"; //redux에서 제공하는 걸로 연결하면 안 됨 -> 우리가 지정한 걸로 연결!
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.map((item) => (
        <CartItem key={item.id} lp={item} />
      ))}
    </div>
  );
};

export default CartList;
