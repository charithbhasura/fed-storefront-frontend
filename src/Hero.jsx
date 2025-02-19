import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="p-8 mx-16">
      <div className="grid grid-cols-2 rounded-lg min-h-460.8 bg-white">
        <div className="flex flex-col justify-center p-16 gap-4 ">
          <span className="inline-block rounded-full px-2  py-1 
                           text-xs w-fit bg-yellow-500">WEEKLY DISCOUNT
          </span>
          <h1 className="text-6xl font-semibold">Premium Product Online Shop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
            suscipit est autem quia? Voluptatem?
          </p>
          <Link to="/shop" className="inline-block w-fit rounded-md
                                   bg-black font-medium text-white 
                                   px-4 py-2">Shop Now
          </Link>
        </div>
        <div className="relative">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
