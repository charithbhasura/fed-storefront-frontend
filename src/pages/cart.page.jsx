import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Button, } from "@/components/ui/button";

function CartPage() {
    const cart = useSelector((state) => state.cart.value);
    console.log(cart);
    return (
        <main className="px-8">
            <h2 className="text-5xl font-bold">My Cart</h2>
            <div className="mt-4 grid grid-cols-2 w-1/2 gap-x-4">
                {
                    cart.map((item,index)=>(
                        <div key={index}>
                            <p>{item.product.name}</p>
                            <p>{item.product.price}</p>
                            <p>{item.quantity}</p>
                        </div>
                    ))
                }
            </div>
            <div className="mt-4 ">
                <Button aschild>
                    <Link to="/shop/checkout">Proceed To Checkout</Link>
                </Button>
            </div>
        </main>
    );
}
export default CartPage;