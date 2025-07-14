import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-yellow-100 shadow mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Account</h1>
          <span className="text-sm text-gray-400 mb-6">Welcome back, {user.firstName || user.fullName}!</span>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Full Name</h2>
            <p className="text-gray-600">{user.fullName}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button className="px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition">
            Edit Profile
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;