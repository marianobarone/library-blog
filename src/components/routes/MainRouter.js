import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../global/context/AuthContext.js';
import { BlogContext, BlogProvider } from '../../global/context/blogContext';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './PrivateRoute.js';
import NavbarAvatar from '../navbar/navbarAvatar.js';
import Login from '../../components/login/login'
import SPA from '../../components/SPA/spa.js'
import ArticleDetails from '../../components/blog/articles/articleDetails/articleDetails'
import NewArticleJodit from '../../components/blog/articles/newArticle/newArticleJodit'
import ScrollToTop from '../../global/context/scrollToTop.js';
import ScrollUpBtn from '../../shared/scrollUpBtn';
import Loader from '../../shared/loader.js';
import Footer from '../../components/footer/footer.js'
import ErrorPage from '../errorPage/errorPage.js';

export default function MainRouter() {
    const { loading } = useContext(BlogContext);

    // useEffect(() => {
    //     setTimeout(function () { setLoading(false) }, 2000);
    // }, [])

    return (

        <ScrollToTop>
            {(!loading) ?
                <>
                    <NavbarAvatar />
                    <Toaster />
                    <Routes>
                        <Route path="/" element={<SPA />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/articleDetails/:id" element={<ArticleDetails />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/newArticleJodit" element={<PrivateRoute><NewArticleJodit /></PrivateRoute>}></Route>
                        <Route path="/*" element={<ErrorPage />}></Route>
                    </Routes>
                    <ScrollUpBtn />
                    <Footer />
                </>
                :
                <Loader />
                // <BookSpinner />
            }
        </ScrollToTop>
    )
}
