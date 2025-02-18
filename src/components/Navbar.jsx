import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Navbar(props) {
    const { user } = useUser();
    const cart = useSelector((state) => state.cart.value);

    const getCartQuantity = () => {
        let count = 0;
        cart.forEach((item) => {
            count += item.quantity;
        });
        return count;
    }

    return (
        <nav className="flex items-center justify-between p-8 mx-16">
            <div className="flex gap-x-16">
                <Link className="font-semibold text-3xl" to='./'>Mebius</Link>      
                <div className="flex items-center gap-4">
                    <Link to="./">Home</Link>
                    <Link to="./shop">Shop</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <Link to="./shop/cart" className="flex items-center gap-4 relative">
                        <p className="text-lg">{getCartQuantity()}</p>
                        <div className="flex items-center gap-2">
                            <ShoppingCart/>
                            Cart
                        </div>
                    </Link>
                </div>

                <SignedOut> 
                    <div className="flex items-center gap-4">
                        <Link to="/signin" className='text-primary'>Sign In</Link>   
                        <Link to="/signup" className='text-primary'>Sign Up</Link>
                    </div>
                </SignedOut>

                <SignedIn>
                    <UserButton/>
                    <Link to="/account" className='text-primary'>Account</Link>
                    <Link to="/my-orders" className='text-primary'>My Orders</Link>
                    {user?.publicMetadata?.role === "admin" && (
                        <Link to="/admin/products/create" className='text-primary'>Admin</Link>
                    )}
                </SignedIn>
            </div>                  
        </nav> 
    );
}

export default Navbar;
