import { clearCart } from '@/lib/features/cartSlice';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from '@/lib/api';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCreditCard, FaQrcode } from "react-icons/fa";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [showQR, setShowQR] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!stripe || !elements) return;

    // 1. Create PaymentIntent on backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total * 100 }), // Stripe expects cents
    });
    const { clientSecret } = await response.json();

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast(result.error.message || "Payment failed");
      return;
    }

    if (result.paymentIntent.status === 'succeeded') {
      // 3. Place the order
      const payload = {
        items: cart.map((item) => ({
          product: {
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            description: item.product.description,
          },
          quantity: item.quantity,
        })),
        shippingAddress: {
          line_1: "main st",
          line_2: "",
          city: "kadawatha",
          state: "wp",
          zip_code: "11850",
          phone: "+94771720403"
        }
      };

      createOrder(payload)
        .unwrap()
        .then((order) => {
          dispatch(clearCart());
          navigate(`/shop/complete?orderId=${order._id}`);
        })
        .catch((err) => {
          toast("Order placement failed. Please check your details and try again.");
        });
    }
  };

  const handleStripeCheckout = async () => {
    // Call your backend to create a Stripe Checkout session
    const response = await fetch("/api/payments/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        // Add more order data if needed
      }),
    });
    const data = await response.json();
    window.location.href = data.url; // Redirect to Stripe Checkout
  };

  const paymentUrl = "https://buy.stripe.com/test_8x29AVbnq7Rmb200c21Jm00"; // Stripe payment link

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
              <span className="text-lg font-bold text-gray-950">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-gray-600">${total.toFixed(2)}</span>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
            onClick={() => setShowModal(true)}
            disabled={!stripe}
          >
            Pay & Place Order
          </Button>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => { setShowModal(false); setShowQR(false); }}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Card Details</h3>
            <div className="flex justify-center gap-6 mb-6">
              <button
                type="button"
                className={`focus:outline-none ${selectedMethod === "visa" ? "ring-2 ring-blue-400" : ""}`}
                onClick={() => { setSelectedMethod("visa"); setShowQR(false); }}
              >
                <FaCcVisa className="text-blue-600 text-4xl" title="Visa" />
              </button>
              <button
                type="button"
                className={`focus:outline-none ${selectedMethod === "mastercard" ? "ring-2 ring-red-400" : ""}`}
                onClick={() => { setSelectedMethod("mastercard"); setShowQR(false); }}
              >
                <FaCcMastercard className="text-red-600 text-4xl" title="Mastercard" />
              </button>
              <button
                type="button"
                className={`focus:outline-none ${selectedMethod === "card" ? "ring-2 ring-gray-400" : ""}`}
                onClick={() => { setSelectedMethod("card"); setShowQR(false); }}
              >
                <FaCreditCard className="text-gray-500 text-4xl" title="Credit Card" />
              </button>
              <button
                type="button"
                className={`focus:outline-none ${showQR ? "ring-2 ring-green-400" : ""}`}
                onClick={() => setShowQR(true)}
              >
                <FaQrcode className="text-green-600 text-4xl" title="Scan QR" />
              </button>
            </div>
            {/* Conditional UI */}
            {!showQR && selectedMethod === "card" && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Card Details
                </label>
                <div className="w-full bg-white rounded-md border border-gray-100 p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '18px',
                          color: '#374151',
                          fontFamily: 'Inter, Arial, sans-serif',
                          '::placeholder': { color: '#a3a3a3' },
                        },
                        invalid: { color: '#e53e3e' },
                      },
                      hidePostalCode: true,
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            {!showQR && selectedMethod === "visa" && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Visa Card Details
                </label>
                <div className="w-full bg-white rounded-md border border-blue-50 p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '18px',
                          color: '#1e40af',
                          fontFamily: 'Inter, Arial, sans-serif',
                          '::placeholder': { color: '#60a5fa' },
                        },
                        invalid: { color: '#e53e3e' },
                      },
                      hidePostalCode: true,
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            {!showQR && selectedMethod === "mastercard" && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Mastercard Details
                </label>
                <div className="w-full bg-white rounded-md border border-red-50 p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '18px',
                          color: '#b91c1c',
                          fontFamily: 'Inter, Arial, sans-serif',
                          '::placeholder': { color: '#f87171' },
                        },
                        invalid: { color: '#e53e3e' },
                      },
                      hidePostalCode: true,
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            {showQR && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm mb-6 flex flex-col items-center">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Scan QR to Pay
                </label>
                {/* Replace src with actual QR code image or generator */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentUrl)}`}
                  alt="Scan QR Code"
                  className="w-40 h-40 mb-4"
                />
                <p className="text-gray-600 text-center">Scan this QR code with your banking app or wallet to complete payment.</p>
              </div>
            )}
            <Button
              className="w-full px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
              onClick={handleStripeCheckout}
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PaymentPage;