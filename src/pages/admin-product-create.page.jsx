import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import ProductCreationForm from "@/components/ProductCreationForm";
import { Separator } from "@/components/ui/separator";
function AdminProductCreatePage() {

  const { isLoaded, isSignedIn, user } = useUser();

  const productItemCart = useSelector((state) => state.cart.value);

  if (!isLoaded) {
    return <main className="px-8">Loading...</main>;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  if (user.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (

    <main className="container mx-auto px-4 py-8">
      <Separator className="my-4" />
      <div className="mt-4">
        <h4 className="text-3xl font-semibold">Enter Product Item Details</h4>
        <div className="mt-2 w-1/2">
          <ProductCreationForm productItemCart={productItemCart}/>
        </div>
      </div>
    </main>
    
  );
}
export default AdminProductCreatePage;