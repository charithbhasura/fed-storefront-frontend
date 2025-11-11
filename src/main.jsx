import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";

import CartPage from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import HomePage from "./pages/home.page.jsx";
import SignInPage from "./pages/sign-in.page.jsx";
import SignUpPage from "./pages/sign-up.page.jsx";

import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/rootLayout/root.layouts";
import AccountPage from "./pages/account.page";
import CompletePage from "./pages/complete.page";
import PaymentPage from "./pages/payment.page";
import ShopPage from "./pages/shop.page.jsx";
import ProductDetailsPage from "./pages/product-details.page";
import MyOrdersPage from "./pages/my-orders.page";
import AdminProductCreatePage from "./pages/admin-product-create.page";
import Products from "./Products";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}

const stripePromise = loadStripe("pk_test_51QvEpiRodjInmJ3Id6Z5kAcFInMZ7kBvhuBQUZXCc6PHqtrAM1PTv6HWnwBca31yDBNSbems1KrMa4p6WfE1eIJu00nm4rypWq"); // Your Stripe publishable key

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/* The Protected layout can be used to wrap routes that needs to be logged in to access */}
                <Route element={<Protected />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/shop/cart" element={<CartPage />} />
                  <Route path="/shop/checkout" element={<CheckoutPage />} />
                  
                  <Route path="/shop/payment" element={<PaymentPage />} />

                  <Route path="/shop/complete" element={<CompletePage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/:productId" element={<ProductDetailsPage />} />
                  <Route path="/my-orders" element={<MyOrdersPage />} />

                  {/* The AdminProtected layout can be used to wrap routes that needs to be logged in as admin to access */}
                  <Route element={<AdminProtected />}>
                    <Route
                      path="/admin/products/create"
                      element={<AdminProductCreatePage />}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Elements> 
    </Provider>
  </ClerkProvider>
);
