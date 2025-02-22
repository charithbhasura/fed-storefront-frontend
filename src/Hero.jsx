import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="p-8 mx-16">
      <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]">
        {/* Left Content - Text Section */}
        <div className="flex flex-col justify-center p-16 gap-4">
          <span className="inline-block rounded-full px-2 py-1 text-xs w-fit bg-yellow-500">
            WEEKLY DISCOUNT
          </span>
          <h1 className="text-5xl font-semibold leading-tight">
            Premium Product Online Shop
          </h1>
          <p className="text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
            suscipit est autem quia? Voluptatem?
          </p>
          <Link
            to="/shop"
            className="inline-block w-fit rounded-md bg-black font-medium text-white px-4 py-2"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="overflow-hidden">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt="Listening to music"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;