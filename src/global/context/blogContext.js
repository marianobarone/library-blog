import React, { createContext, useEffect, useReducer } from 'react'
import { BlogReducer } from '../../reducers/blogReducer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
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
    const navigate = useNavigate();

    useEffect(() => {
        getArticles();
    }, [])

    const getArticles = async () => {
        await axios.get("http://localhost:3001/articles")
            .then((response) => {
                let data = response.data
                dispatch({
                    type: "getArticles",
                    payload: {
                        articles: data
                    }
                })
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

    const addNewArticle = async function addNewArticle(article) {
        await axios
            .post(
                "http://localhost:3001/articles",
                article,
                //   { headers: { Authorization: `Bearer ${context.user.token}` } }
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
        const apiURL = `http://localhost:3001/articles/${idArticulo}/comment`;
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

                // setArrayComentarios([...arrayComentarios, newComment])
                // notify("Gracias por su comentario!");
                // console.log(arrayComentarios)
                // setAuthor("");
                // setComment("");
                // setUser({ articles: response.data }, { usuario: "Usuario no encontrado" })
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
                addNewArticle,
                getArticles,
                addNewComment
            }}>
            {children}
        </BlogContext.Provider>
    )
}
