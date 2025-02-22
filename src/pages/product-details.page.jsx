import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Separator } from "@/components/ui/separator";
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductDetailsPage = (props) => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // This would typically come from an API call using productId (project backend is not connecting successfully always getting "mongooseserverselection" error, eventhough i fixed  with every posible way)
  // For now using mock data for the ui implementation
  const product = {
    _id: productId,
    name: "AirPods Max",
    price: "549.00",
    description: "High-fidelity audio with Active Noise Cancellation, Transparency mode, and spatial audio for an unparalleled listening experience.",
    image: "../src/assets/products/airpods-max.png",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio",
      "20 hours of battery life",
      "Seamless switching between devices"
    ]
  };

//code for fetching data from the backend "uncomment cosnst product and setProduct"
  // const [product, setProduct] = useState(null);
  
      useEffect(() => {
          const fetchProduct = async () => {
              try {
                  const response = await axios.get(`/api/shop/${productId}`);
                  setProduct(response.data);
              } catch (error) {
                  console.error('Error fetching product:', error);
              }
          };
  
          fetchProduct();
      }, [productId]);
  
      if (!product) {
          return <div>Loading...</div>;
      }

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-lg p-8">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-4">
            <span className="text-2xl font-semibold text-gray-900">
              ${product.price}
            </span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="prose prose-sm mt-4">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <Separator className="my-4" />

          {/* Features */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button 
              onClick={handleAddToCart}
              className="w-full md:w-auto px-8 py-3"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 