import React, { useContext, useEffect, useState } from 'react'
// import GlobalContext from '../../global/context/index.js'
import Context from '../../global/context/mainContext.js'

import Container from '@mui/material/Container';
import Home from '../home/home.js'
import AboutMe from '../aboutMe/aboutMe.js'
import BlogIndex from '../blog/blogIndex/blogIndex.js'
import Shop from '../shop/shop.js'

import axios from "axios";

export default function SPA() {
    const { user, setUser } = useContext(Context);
    // const {user, setUser} = useContext(GlobalContext);

    // const [user, setUser] = useState({
    //     name: "",
    //     mail: "",
    //     role: "",
    //     token: ""
    // });

    // const [blogSection, setBlogSection] = useState({
    //     articles: []
    // });

    // const [blogSection, setBlogSection] = useState({
    //     articles: []
    //   });

    // const [aboutMeSection, setAboutMeSection] = useState({
    //     descripction: "",
    //     image: ""
    // });

    // const [shopSection, setShopSection] = useState({
    //     books: [],
    // });

    useEffect(() => {
        // cargarDatos();
    }, [])

    // async function cargarDatos() {
    //     await axios.get("http://localhost:3001/articles")
    //         .then(response => {
    //             console.log(response)
    //             setUser(response.data);
    //             // context.setUser(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error.response)
    //         });
    // }

    return (
        // <Context.Provider
        //     value={{
        //         user,
        //         setUser
        //     }}
        // >
        <div>
            <Home />
            <Container>
                <AboutMe />
                <BlogIndex />
                <Shop />
            </Container>
        </div>
        // </Context.Provider>
    )
}
