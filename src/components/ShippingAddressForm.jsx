import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine(
    (value) => {
      // This regex checks for a basic international phone number format
      return /^\+?[1-9]\d{1,14}$/.test(value);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line_1: "",
      line_2: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
    },
  });
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  function handleSubmit(values) {
    const payload = {
      items: cart.map((item) => ({
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: typeof item.product.price === "number" ? item.product.price : parseFloat(item.product.price),
          image: item.product.image,
          description: item.product.description,
        },
        quantity: item.quantity,
      })),
      shippingAddress: values,
    };
    // console.log("Order payload:", payload);
    createOrder(payload)
      .unwrap()
      .then((order) => {
        if (order && order._id) {
          navigate(`/shop/complete?orderId=${order._id}`);
          toast.success("Order placed successfully!");
        } else {
          toast("Order placement failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Order placement error:", err);
        toast(
          err?.data?.message ||
          "Order placement failed. Please check your details and try again."
        );
      });
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-gray-50 rounded-xl shadow p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apt 4B" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">State</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
            >
              Proceed to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;