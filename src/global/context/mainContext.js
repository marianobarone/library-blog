import React, { useContext, createContext, useReducer, useEffect, useState } from 'react'
import axios from "axios";

// const userInitialState = {
//     articles: [],
//     // date: "",
//     // body: "",
// }
// export const UserContext = createContext(userInitialState);

const Context = React.createContext({});


export const UserProvider = ({ children }) => {
    // const context = useContext(UserContext);

    const [user, setUser] = useState();
    const [aboutMe, setAboutMe] = useState();
    const [article, setArticle] = useState();

    useEffect(() => {
        // getUser();
        getArticles();
    }, [])

    async function getUser() {
        await axios.get("http://localhost:3001/articles")
            .then(response => {
                console.log(response)
                // setUser({ articles: response.data });
                setUser(response.data);
                // console.log(context)

                // context.setUser({nombre: response.data.usuario.nombre,
                //     _id: response.data.usuario._id,
                //     mail: response.data.usuario.email,
                //     rol: response.data.usuario.rol,
                //     token: response.data.token,
                //     mesas: response.data.usuario.mesas});
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    async function getArticles() {
        await axios.get("http://localhost:3001/articles")
            .then(response => {
                console.log(response)
                // setArticle({ articles: response.data });
                setArticle(response.data);
                // console.log(context)

                // context.setUser({nombre: response.data.usuario.nombre,
                //     _id: response.data.usuario._id,
                //     mail: response.data.usuario.email,
                //     rol: response.data.usuario.rol,
                //     token: response.data.token,
                //     mesas: response.data.usuario.mesas});
            })
            .catch(error => {
                console.log(error.response)
            });
    }



    return (
        <Context.Provider
            value={{
                user,
                setUser,
                aboutMe,
                setAboutMe,
                article,
                setArticle
            }}>
            {children}
        </Context.Provider>
    )
}

export default Context
