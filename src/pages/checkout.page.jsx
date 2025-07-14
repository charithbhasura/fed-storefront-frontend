import { useSelector } from 'react-redux';
import ShippingAddressForm from "@/components/ShippingAddressForm";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  // Calculate total for display
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Order Details */}
        <section className="flex-1 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h2>
          <div className="divide-y">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center py-6 gap-6">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg border"
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
            <span className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</span>
          </div>
        </section>

        {/* Shipping Address Form */}
        <section className="flex-1 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Enter Shipping Address</h3>
          <div className="w-full">
            <ShippingAddressForm cart={cart} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default CheckoutPage;