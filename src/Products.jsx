import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator"
import Tab from "./Tab";
import { useState } from "react";
import { Button } from "./components/ui/button";
import ProductCard from "./ProductCard";

 function Products() {

    const products = [
        {
          categoryId: "1",
          image: "/assets/products/airpods-max.png",
          _id: "1",
          name: "AirPods Max",
          price: "549.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "3",
          image: "/assets/products/echo-dot.png",
          _id: "2",
          name: "Echo Dot",
          price: "99.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "2",
          image: "/assets/products/pixel-buds.png",
          _id: "3",
          name: "Galaxy Pixel Buds",
          price: "99.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "1",
          image: "/assets/products/quietcomfort.png",
          _id: "4",
          name: "Bose QuiteComfort",
          price: "249.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "3",
          image: "/assets/products/soundlink.png",
          _id: "5",
          name: "Bose SoundLink",
          price: "119.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "5",
          image: "/assets/products/apple-watch.png",
          _id: "6",
          name: "Apple Watch 9",
          price: "699.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "4",
          image: "/assets/products/iphone-15.png",
          _id: "7",
          name: "Apple Iphone 15",
          price: "1299.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
        {
          categoryId: "4",
          image: "/assets/products/pixel-8.png",
          _id: "8",
          name: "Galaxy Pixel 8",
          price: "549.00",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
        },
      ];

    const categories = [
        { _id: "ALL", name: "All" },
        { _id: "1", name: "Headphones" },
        { _id: "2", name: "Earbuds" },
        { _id: "3", name: "Speakers" },
        { _id: "4", name: "Mobile Phones" },
        { _id: "5", name: "Smart Watches" },
      ];

    const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
    const filteredProducts = 
    selectedCategoryId === "ALL" 
        ?products
        :products.filter((product)=>product.categoryId === selectedCategoryId);

    const handleTabClick= (_id) =>{
      setSelectedCategoryId(_id);
    }

    const [sortedProduct,setSortedProduct] = useState(products);

    const sortAsc = () => {
      const sorted = [...sortedProduct].sort((x,y)=> x.price - y.price)
      setSortedProduct(sorted);
    }

    const sortDesc = () => {
      const sorted = [...sortedProduct].sort((x,y)=> y.price - x.price)
      setSortedProduct(sorted);
    }

  return (
    <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2"/>
        <div className="mt-2 flex gap-4">
          <Button className="mt-2 flex gap-4 bg-green-300 text-pretty" onClick={sortAsc}>Sort by price: Ascending</Button>
          <Button className="mt-2 flex gap-4 bg-blue-300 text-pretty" onClick={sortDesc}>Sort by price: Descending</Button>
        </div>

        <div className="mt-2  grid grid-cols-4 gap-4">
            {sortedProduct.map((products) => (
              <ProductCard
              key={products._id}
              name={products.name}
              price={products.price}
              image={products.image}
              description={products.description}/>
            ))}
            </div>
        <Separator className="mt-3 bg-black"/>

        <div className="mt-4 flex items-center gap-4">
            {
                categories.map((category) => (
                <Tab key={category._id}
                     _id={category._id}
                     selectedCategoryId={selectedCategoryId}
                     name={category.name}
                     onTabClick={handleTabClick}
                  />
                ))
            }
        </div>
        <ProductCards products={filteredProducts}/>
    </section>
  )
}
export default Products;
