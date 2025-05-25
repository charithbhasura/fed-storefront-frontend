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
        _id: item._id,
        name: item.product?.name || item.name,
        price: typeof item.product?.price === "number" ? item.product.price : parseFloat(item.price),
        image: item.product?.image || item.image,
        description: item.product?.description || item.description,
      },
      quantity: item.quantity,
    })),
    shippingAddress: values,
  };
  console.log(payload);
  createOrder(payload);
  navigate("/shop/payment");
}
  // function handleSubmit(values) {
  //   createOrder({
  //     items: cart.map((item) => ({
  //       product: {
  //         _id: item._id,
  //         name: item.name,
  //         price: parseFloat(item.price),
  //         image: item.image,
  //         description: item.description,
  //       },
  //       quantity: item.quantity,
  //     })),
  //     shippingAddress: values,
  //   });
  //   navigate("/shop/payment");
  // }

  return (
    <div className="container mx-auto px-4 py-8 ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <FormField
            control={form.control}
            name="line_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
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
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Apt 4B" {...field} />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
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
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
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
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <Button type="submit">Proceed to Payment</Button>
        </div>
      </form>
    </Form>
    </div>
  );
};

export default ShippingAddressForm;