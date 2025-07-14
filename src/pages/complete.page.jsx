import { Button } from "@/components/ui/button";
import { useGetOrderQuery } from "@/lib/api";
import { clearCart } from "@/lib/features/cartSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function CompletePage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { data, isLoading, isError } = useGetOrderQuery(orderId, { skip: !orderId });

  useEffect(() => {
    if (orderId && data) {
      dispatch(clearCart());
    }
  }, [orderId, data, dispatch]);

  if (!orderId) {
    return (
      <main className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-400 mb-4">
          No Order ID Provided
        </h2>
        <Button asChild
        className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition">
          <Link to="/home">Continue Shopping</Link>
        </Button>
      </main>
    );
  }

  if (isLoading) {
    return <main className="px-8 py-16 text-center">Loading...</main>;
  }

  if (isError || !data) {
    return (
      <main className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Order Not Found</h2>
        <Button asChild
        className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition" >
          <Link to="/home">Continue Shopping</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="col-span-2 mx-auto min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
      <div   className="px-8 py-16 max-w-2xl items-center mx-auto">
      <h2 className="text-4xl text-center font-bold text-green-400 mb-6">
        Order Successful
      </h2>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4">Order Items</h3>
        <div className="divide-y">
          {data.items.map((item, index) => (
            <div key={index} className="flex items-center py-4 gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.product.name}</p>
                <p className="text-gray-500">
                  ${item.product.price} x {item.quantity}
                </p>
              </div>
              <span className="font-bold text-gray-500">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-indigo-600">
            ${data.items.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            ).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-2">Shipping Address</h3>
        <div className="text-gray-700">
          <p>{data.addressId.line_1}</p>
          {data.addressId.line_2 && <p>{data.addressId.line_2}</p>}
          <p>
            {data.addressId.city}, {data.addressId.state}{" "}
            {data.addressId.zip_code}
          </p>
          <p>Phone: {data.addressId.phone}</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-gray-600">
          Order ID:{" "}
          <span className="font-mono">
            {data._id}
          </span>
        </p>
        <p className="text-blue-400">
          Order Status:{" "}
          <span className="font-semibold">
            {data.paymentStatus}
          </span>
        </p>
      </div>
      <div className="flex justify-center">
        <Button asChild className="px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition">
          <Link to="/home">Continue Shopping</Link>
        </Button>
      </div>
      </div>
    </main>
  );
}

export default CompletePage;