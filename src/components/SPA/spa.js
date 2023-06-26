import React, { useEffect } from 'react'

import Home from '../home/home.js'
import Container from '@mui/material/Container';
import AboutMe from '../aboutMe/aboutMe.js'
import BlogIndex from '../blog/blogIndex/blogIndex.js'
import Shop from '../shop/shop.js'
import AOS from "aos";
import "aos/dist/aos.css";

export default function SPA() {
    useEffect(() => {
        AOS.init({
            duration: 800,
        });
    }, []);

    return (
        <>
            <Home />
            <Container>
                <AboutMe />
                <BlogIndex />
                <Shop />
            </Container>
        </>
    )
}
