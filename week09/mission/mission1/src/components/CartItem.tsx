import { useDispatch } from "../hooks/useCustomRedux";
import { decrease, increase, removeItem } from "../slices/cartSlice";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleIncreaseCount = () => {
    dispatch(increase({ id: lp.id }));
  };

  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      //수량=1이면 따로 빼라
      dispatch(removeItem({ id: lp.id }));
      return;
    }

    dispatch(decrease({ id: lp.id }));
  };

  return (
    <div className="w-64 p-4 border rounded-lg shadow flex flex-col items-center">
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="w-40 h-40 object-cover rounded mb-3"
      ></img>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l 
        hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r 
        hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
