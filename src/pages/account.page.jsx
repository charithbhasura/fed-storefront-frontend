import { useAuth, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate } from 'react-router-dom';

function AccountPage() {

    const {isLoaded, isSignedIn, user} = useUser();

    if(!isLoaded){
        return <div>Loading...</div>
    }

    if(!isSignedIn){
        return <Navigate to="/signin"/>
    }

  return (
    <main className='px-16'>
        <h1 className='text-2xl font-semibold'>My Account</h1>
        <div className='mt-4'>
            <p>{user.fullName}</p>
            <p>{user.emailAddresses [0].emailAddress}</p>
        </div>
    </main>
  )
}

export default AccountPage