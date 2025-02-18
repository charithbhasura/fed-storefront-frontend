import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

function Protected() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}

export default Protected;