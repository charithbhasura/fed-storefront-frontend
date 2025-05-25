import React,{ useState } from 'react';
import ProductCard from '../ProductCard';
import Tab from '../Tab';
import { Separator } from '@/components/ui/separator';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';


//code with dummy data for ui implementation//

//   This would typically come from an API  (project backend is not connecting successfully always getting errors, eventhough i fixed  with every posible way)
//   For now using mock data for the ui implementation

//   const products = [
//   {
//     categoryId: "1",
//     image: "./src/assets/products/airpods-max.png",
//     _id: "1",
//     name: "AirPods Max",
//     price: "549.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "3",
//     image: "./src/assets/products/echo-dot.png",
//     _id: "2",
//     name: "Echo Dot",
//     price: "99.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "2",
//     image: "./src/assets/products/pixel-buds.png",
//     _id: "3",
//     name: "Galaxy Pixel Buds",
//     price: "99.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "1",
//     image: "./src/assets/products/quietcomfort.png",
//     _id: "4",
//     name: "Bose QuiteComfort",
//     price: "249.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "3",
//     image: "./src/assets/products/soundlink.png",
//     _id: "5",
//     name: "Bose SoundLink",
//     price: "119.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "5",
//     image: "./src/assets/products/apple-watch.png",
//     _id: "6",
//     name: "Apple Watch 9",
//     price: "699.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "4",
//     image: "./src/assets/products/iphone-15.png",
//     _id: "7",
//     name: "Apple Iphone 15",
//     price: "1299.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "4",
//     image: "./src/assets/products/pixel-8.png",
//     _id: "8",
//     name: "Galaxy Pixel 8",
//     price: "549.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
// ];

// const categories = [
//   { _id: "ALL", name: "All" },
//   { _id: "1", name: "Headphones" },
//   { _id: "2", name: "Earbuds" },
//   { _id: "3", name: "Speakers" },
//   { _id: "4", name: "Mobile Phones" },
//   { _id: "5", name: "Smart Watches" },
// ];

// function ShopPage() {
//     const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
//     const [sortOrder, setSortOrder] = useState('default');
  
//     // First filter by category, then sort by price
//     const filteredAndSortedProducts = React.useMemo(() => {
//       let result = selectedCategoryId === "ALL" 
//         ? products
//         : products.filter((product) => product.categoryId === selectedCategoryId);
  
//       // Sort the filtered results
//       if (sortOrder === 'asc') {
//         return result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//       } else if (sortOrder === 'desc') {
//         return result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//       }
//       return result;
//     }, [selectedCategoryId, sortOrder]);
  
//     const handleTabClick = (_id) => {
//       setSelectedCategoryId(_id);
//     };
  
  
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <Separator className="my-4" />
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Shop Your Favourite Products</h1>
//           <div className="flex justify-between items-center mt-4">
//             <div className="mt-4 flex items-center gap-4">
//               {categories.map((category) => (
//                 <Tab
//                   key={category._id}
//                   _id={category._id}
//                   selectedCategoryId={selectedCategoryId}
//                   name={category.name}
//                   onTabClick={handleTabClick}
//                 />
//               ))}
  
//               <button 
//                 className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200
//                 hover:bg-gray-200 transition-colors shadow-sm text-gray-700"
//                 onClick={() => setSortOrder('asc')}
//               >
//                 Price: Low to High
//               </button>
  
//               <button 
//                 className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200
//                 hover:bg-gray-200 transition-colors shadow-sm text-gray-700"
//                 onClick={() => setSortOrder('desc')}
//               >
//                 Price: High to Low
//               </button>
//             </div>
//           </div>
//         </div>
  
//         <div className="mt-2 grid grid-cols-4 gap-4">
//           {filteredAndSortedProducts.map((product) => (
//             <ProductCard
//               key={product._id}
//               name={product.name}
//               price={product.price}
//               image={product.image}
//               description={product.description}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default ShopPage;




//complete level code with backend api//

function ShopPage() {

const {
      data: products,
      isLoading: isProductsLoading,
      isError: isProductsError,
      error: productsError,
    } = useGetProductsQuery();

    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
    } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState('default');

  // First filter by category, then sort by price
  const filteredAndSortedProducts = React.useMemo(() => {
    let result = selectedCategoryId === "ALL" 
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

    // Sort the filtered results
    if (sortOrder === 'asc') {
      return result.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'desc') {
      return result.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return result;
  }, [selectedCategoryId, sortOrder]);

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Shop Your Items </h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Shop Your Items </h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4"></div>
        <div className="mt-4">
          <p className="text-red-500">{`${productsError.message} ${categoriesError.message}`}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Separator className="my-4" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shop Your Favourite Products</h1>
        <div className="flex justify-between items-center mt-4">
          <div className="mt-4 flex items-center gap-4">
            {categories.map((category,index) => (
              <Tab
                key={index}
                _id={category._id}
                selectedCategoryId={selectedCategoryId}
                name={category.name}
                onTabClick={handleTabClick}
              />
            ))}

            <button 
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200
              hover:bg-gray-200 transition-colors shadow-sm text-gray-700"
              onClick={() => setSortOrder('asc')}
            >
              Price: Low to High
            </button>

            <button 
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200
              hover:bg-gray-200 transition-colors shadow-sm text-gray-700"
              onClick={() => setSortOrder('desc')}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-4">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;