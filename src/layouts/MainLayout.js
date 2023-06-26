import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import NavbarAvatar from '../components/navbar/navbarAvatar'
import { Outlet } from 'react-router-dom'
import ScrollUpBtn from '../shared/scrollUpBtn'
import Footer from '../components/footer/footer'
import { BlogContext } from '../global/context/blogContext'
import Loader from '../shared/loader'
import ScrollToTop from '../global/context/scrollToTop'

export default function MainLayout() {
    const { loading } = useContext(BlogContext);
    return (
        <>
            <Toaster />
            <NavbarAvatar />
            {(!loading) ?
                <>
                    <ScrollToTop />
                    {/* <NavbarAvatar /> */}
                        <Outlet />
                    <ScrollUpBtn />
                    <Footer />
                </>
                :
                <Loader />
            }
        </>
    )
}
