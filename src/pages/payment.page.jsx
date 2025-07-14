import { clearCart } from '@/lib/features/cartSlice';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { useNavigate } from "react-router";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    createOrder(payload)
      .unwrap()
      .then((order) => {
        if (order && order._id) {
          navigate(`/shop/complete?orderId=${order._id}`);
        } else {
          toast("Order placement failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Order placement error:", err);
        toast("Order placement failed. Please check your details and try again.");
      });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Review Your Order</h2>
        <div className="divide-y">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center py-6 gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-500">{item.product.description}</p>
                <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
              </div>
              <span className="text-lg font-bold text-gray-600">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-gray-700">${total.toFixed(2)}</span>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;