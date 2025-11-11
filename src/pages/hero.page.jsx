import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 flex flex-col items-center py-10">
      {/* Hero Section */}
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 mb-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">Welcome to ShopLogo!</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Discover the best tech products and accessories. Fast shipping, secure payment, and great deals!
        </p>
        <Link
          to="/shop"
          className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition text-xl"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example featured product cards */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="https://via.placeholder.com/120" alt="Product 1" className="mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Name 1</h3>
            <p className="text-gray-500 mb-2">$199</p>
            <Link to="/shop" className="text-yellow-400 font-bold hover:underline">View</Link>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="https://via.placeholder.com/120" alt="Product 2" className="mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Name 2</h3>
            <p className="text-gray-500 mb-2">$299</p>
            <Link to="/shop" className="text-yellow-400 font-bold hover:underline">View</Link>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="https://via.placeholder.com/120" alt="Product 3" className="mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Name 3</h3>
            <p className="text-gray-500 mb-2">$99</p>
            <Link to="/shop" className="text-yellow-400 font-bold hover:underline">View</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;