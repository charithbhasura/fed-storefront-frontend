import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <Link
            to="/home"
            className="inline-block mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-ywllow-500 transition"
          >
            Go Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Cart</h2>
        <div className="divide-y">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center py-6 gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-gray-500">{item.product.description}</p>
                <span className="text-sm text-gray-400">
                  Qty: {item.quantity}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-600">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-gray-800">
            ${total.toFixed(2)}
          </span>
        </div>
        <div className="mt-8 flex justify-center ">
          <Button asChild className="inline-block mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition">
            <Link to="/shop/checkout">Proceed To Checkout</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CartPage;