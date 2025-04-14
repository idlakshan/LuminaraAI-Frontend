import Navigation from '@/components/Navigation'
import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default MainLayout