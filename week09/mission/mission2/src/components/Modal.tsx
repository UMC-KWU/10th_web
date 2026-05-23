import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();

  //redux로만 관리
  const { isOpen } = useSelector((state) => state.modal);

  if (!isOpen) return null; //모달 열렸을 때만 모달 작동 되도록

  //아니요 버튼
  const handleCancel = () => {
    dispatch(closeModal()); //모달 창 닫기
  };

  //네 버튼
  const handleConfirm = () => {
    dispatch(clearCart()); //장바구니 비우기
    dispatch(closeModal()); //모달 창 닫기
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-m bg-white rounded-xl p-6 shadow-2xl text-center border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          정말 삭제하시겠습니까?
        </h2>
        <div className="flex space-x-3 justify-center">
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800
            font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white
            font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
