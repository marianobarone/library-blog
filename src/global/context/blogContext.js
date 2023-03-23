import React, { createContext, useEffect, useState, useReducer, useContext } from 'react'
import { BlogReducer } from '../../reducers/blogReducer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from './AuthContext';
// const notify = () => toast("");
const notify = (message, toastType) => toastType(message);

const blogInitialState = {
    aboutMe: {},
    articles: [],
    books: [],
    errorMessage: "",
}
export const BlogContext = createContext(blogInitialState);

export const BlogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BlogReducer, blogInitialState);
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // setLoading(true)
        // getAboutMe();
        // getArticles();
        cargarDatos();
    }, [])

    const cargarDatos = async () => {
        await getAboutMe();
        await getArticles();

        setLoading(false);
    }
    

    const loadingFalse = () => {
        setLoading(false);
    }

    const getAboutMe = async () => {
        // await axios.get("http://localhost:3001/aboutMe")
        await axios.get(`https://api-library-blog.onrender.com/aboutMe/`)
            .then((response) => {
                let data = response.data
                dispatch({
                    type: "getAboutMe",
                    payload: {
                        aboutMe: data
                    }
                })
                // setLoading((JSON.stringify(blogInitialState.aboutMe) == '{}') || JSON.stringify(blogInitialState.articles.length == 0));
                // setLoading(false);
            })
            .catch((error) => {
                dispatch({
                    type: "addErrorMessage",
                    payload: {
                        errorMessage: error
                    }
                })
            });
    }

    const getArticles = async () => {
        await axios.get(`https://api-library-blog.onrender.com/articles/`)
            .then((response) => {
                let data = response.data
                dispatch({
                    type: "getArticles",
                    payload: {
                        articles: data
                    }
                })
                // setLoading((JSON.stringify(blogInitialState.aboutMe) == '{}') || JSON.stringify(blogInitialState.articles.length == 0));
                // setLoading(false);
            })
            .catch((error) => {
                dispatch({
                    type: "addErrorMessage",
                    payload: {
                        errorMessage: error
                    }
                })
            });
    }

    const updateAboutMe = async function (aboutMe, id) {
        await axios
            .put(
                `https://api-library-blog.onrender.com/aboutMe/${id}`,
                aboutMe,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response);
                // dispatch({
                //     type: "updateArticles",
                //     payload: {
                //         articles: response.data
                //     }
                // })
                getAboutMe();
                notify("AboutMe actualizado correctamente", toast.success)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.response);
                notify("Error! No se pudo actualizar AboutMe, vuelva a intentarlo más tarde", toast.error)
                // notify(error.response.data.error, toast.error)
            });
    }

    const addNewArticle = async function addNewArticle(article) {
        await axios
            .post(
                `https://api-library-blog.onrender.com/articles/`,
                article,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response);
                // dispatch({
                //     type: "updateArticles",
                //     payload: {
                //         articles: response.data
                //     }
                // })
                getArticles();
                notify("Articulo creado correctamente", toast.success)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    const addNewComment = async function (idArticulo, comentario) {
        // const apiURL = `${API_URL}/articles/${idArticulo}/comment`;
        let result;
        const apiURL = `https://api-library-blog.onrender.com/articles/${idArticulo}/comment/`;
        await axios.post(apiURL, comentario)
            .then(response => {
                result = response;
                console.log(response)
                // dispatch({
                //     type:"addComment",
                //     payload: {
                //         comment
                //     }
                // })
                getArticles()
            })
            .catch(error => {
                result = error;
                console.log(error.response)
            });

        return result;
    };

    return (
        <BlogContext.Provider
            value={{
                ...state,
                loading,
                setLoading,
                updateAboutMe,
                loadingFalse,
                addNewArticle,
                getArticles,
                addNewComment
            }}>
            {children}
        </BlogContext.Provider>
    )
}
