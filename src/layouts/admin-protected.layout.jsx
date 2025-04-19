import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router';

const AdmimProtectedLayout = () => {

    const {user}=useUser();
  
    if(user.publicMetadata?.role!=="admin"){
        return <Navigate to="/"/>
    }

    return <Outlet/>
}

export default AdmimProtectedLayout