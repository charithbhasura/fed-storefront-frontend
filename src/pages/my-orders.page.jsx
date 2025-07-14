import { useUser } from "@clerk/clerk-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderCard = ({ order }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-gray-500">Order ID: {order._id}</p>
        <p className="text-sm text-gray-500">
          Placed on {format(new Date(order.date), "MMMM d, yyyy")}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          order.status === "Delivered"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}>
          {order.status}
        </span>
      </div>
    </div>

    <Separator className="my-4" />

    <div className="space-y-4">
      {order.items.map((item) => (
        <div key={item._id} className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Quantity: {item.quantity}
            </p>
          </div>
          <p className="font-medium">${item.price}</p>
        </div>
      ))}
    </div>
  </div>
);

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        // Log the response to debug
        console.log("Orders API response:", response.data);
        // Try to set as array, fallback to [] if not
        setOrders(Array.isArray(response.data) ? response.data : response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">
          View and track your order history
        </p>

        <Separator className="mb-8" />

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : Array.isArray(orders) && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500">
              When you place an order, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;