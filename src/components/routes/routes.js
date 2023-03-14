import React from 'react';
import ReactDOM from 'react-dom';

import { MainProvider } from './global/context/mainContext.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container';
import Navbar from './components/navbar/navbar.js'

import ArticleDetails from './components/blog/articleDetail/articleDetails.js'
import Shop from './components/shop/shop.js'
import Footer from './components/footer/footer.js'
import SPA from './components/SPA/spa.js'
import NewArticle from './components/blog/article/newArticle/newArticle.js'
import NewArticleJodit from './components/blog/article/newArticle/newArticleJodit'
import Login from './components/login/login'
import { UserProvider } from './global/context/mainContext.js'
import { BlogProvider } from './global/context/blogContext.js';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './global/context/scrollToTop.js';
import ErrorPage from './components/errorPage/errorPage.js';
import { AuthProvider } from './global/context/AuthContext.js';
import PrivateRoute from './PrivateRoute.js';


export default function App() {
    return (
        <React.StrictMode>
            {/* <UserProvider> */}
            <Router>
                <ScrollToTop>
                    <AuthProvider>
                        <BlogProvider>
                            <Navbar />
                            <Toaster />
                            <Routes>
                                <Route path="/" element={<SPA />}></Route>
                                <Route path="/login" element={<Login />}></Route>
                                <Route path="/articleDetails/:id" element={<ArticleDetails />}></Route>

                                <Route path="/newArticle" element={<PrivateRoute><NewArticle /></PrivateRoute>}></Route>

                                <Route path="/login" element={<Login />}></Route>
                                <Route path="/newArticleJodit" element={<PrivateRoute><NewArticleJodit /></PrivateRoute>}></Route>
                                <Route path="/*" element={<ErrorPage />}></Route>
                            </Routes>

                            <Footer />
                        </BlogProvider>
                    </AuthProvider>
                </ScrollToTop>
            </Router>
            {/* </UserProvider> */}
        </React.StrictMode>
    )
}
