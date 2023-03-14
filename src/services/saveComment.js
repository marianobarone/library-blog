import React, { useContext } from 'react'
import { API_URL } from './settings'
import axios from "axios";
import UserContext from '../global/context/mainContext'
import { Save } from '@mui/icons-material';

// const fromApiResponseToGifs = apiResponse => {
//     const { data = [] } = apiResponse
//     if (Array.isArray(data)) {
//         const gifs = data.map(image => {
//             const { images, title, id } = image
//             const { url } = images.downsized_medium
//             return { title, id, url }
//         })
//         return gifs
//     }
//     return []
// }

// const fromApiResponseToArticles = apiResponse => {
//     const { data = [] } = apiResponse
//     if (Array.isArray(data)) {
//         return data
//     }
//     return []
// }

// export default function getArticles() {
//     const apiURL = `${API_URL}/articles`;

//     return fetch(apiURL)
//         .then((res) => res.json())
//         .then(fromApiResponseToGifs)
// }

async function SaveComment({ id, author, comment }) {
    const context = useContext(UserContext);
    const {user, setUser} = useContext(UserContext)

    console.log("Este es el context en 'SAVECOMMENT.JS' " + user)

    console.log("Parametro idArticle: " + id);
    console.log("Parametro author: " + author);
    console.log("Parametro body: " + comment);
    const newComment = {
        author: author,
        body: comment,
    };

    console.log(comment);

    const apiURL = `${API_URL}/articles/${id}/comment`;
    await axios.post(apiURL, newComment)
        .then(response => {
            console.log(response)
            // fromApiResponseToArticles
            // setUser({ articles: response.data }, { usuario: "Usuario no encontrado" })
        })
        .catch(error => {
            console.log(error.response)
        });
}

export default SaveComment