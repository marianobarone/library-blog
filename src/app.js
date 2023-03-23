import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { MainProvider } from './global/context/mainContext.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container';
import Navbar from './components/navbar/navbar.js'
import NavbarAvatar from './components/navbar/navbarAvatar'

import ArticleDetails from './components/blog/articles/articleDetails/articleDetails'
import Shop from './components/shop/shop.js'
import Footer from './components/footer/footer.js'
import SPA from './components/SPA/spa.js'
import NewArticle from './components/blog/articles/newArticle/newArticle'
import NewArticleJodit from './components/blog/articles/newArticle/newArticleJodit'
import Login from './components/login/login'
import { UserProvider } from './global/context/mainContext.js'
import { BlogContext, BlogProvider } from './global/context/blogContext.js';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './global/context/scrollToTop.js';
import ErrorPage from './components/errorPage/errorPage.js';
// import { AuthContext } from '../src/global/context/AuthContext';
import { AuthContext, AuthProvider } from './global/context/AuthContext';
import PrivateRoute from './components/routes/PrivateRoute.js';
import Loader from './shared/loader.js';
import BookSpinner from './shared/bookSpinner';
import ScrollUpBtn from './shared/scrollUpBtn'
import MainRouter from './components/routes/MainRouter.js';

export default function App() {
    return (
        <React.StrictMode>
            <Router>
                <AuthProvider>
                <BlogProvider>
                    <MainRouter/>
                </BlogProvider>
                </AuthProvider>
            </Router>
        </React.StrictMode>
    )
}


// export default function App() {
//     // const { loading, loadingFalse, } = useContext(BlogContext)
 
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         setTimeout(function () { setLoading(false) }, 2000);
//     }, [])

//     return (
//         <React.StrictMode>
//             {/* <UserProvider> */}
//             <Router>
//                 <ScrollToTop>
//                     <AuthProvider>
//                         <BlogProvider>
//                             {/* <Navbar /> */}

//                             {(!loading) ?
//                                 <>
//                                     <NavbarAvatar />
//                                     <Toaster />
//                                     <Routes>
//                                         <Route path="/" element={<SPA />}></Route>
//                                         <Route path="/login" element={<Login />}></Route>
//                                         <Route path="/articleDetails/:id" element={<ArticleDetails />}></Route>
//                                         <Route path="/newArticle" element={<NewArticle />}></Route>
//                                         <Route path="/login" element={<Login />}></Route>
//                                         <Route path="/newArticleJodit" element={<PrivateRoute><NewArticleJodit /></PrivateRoute>}></Route>
//                                         <Route path="/*" element={<ErrorPage />}></Route>
//                                     </Routes>
//                                     <ScrollUpBtn/>
//                                     <Footer />
//                                 </>
//                                 :
//                                 <Loader />
//                                 // <BookSpinner />
//                             }
//                         </BlogProvider>
//                     </AuthProvider>
//                 </ScrollToTop>
//             </Router>
//             {/* </UserProvider> */}
//         </React.StrictMode>
//     )
// }
