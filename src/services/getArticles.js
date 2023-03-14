import React from 'react'
import { API_URL } from './settings'
import axios from "axios";

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

const fromApiResponseToArticles = apiResponse => {
    const { data = [] } = apiResponse
    if (Array.isArray(data)) {
        return data
    }
    return []
}

// export default function getArticles() {
//     const apiURL = `${API_URL}/articles`;

//     return fetch(apiURL)
//         .then((res) => res.json())
//         .then(fromApiResponseToGifs)
// }

export default async function getArticles() {
    const apiURL = `${API_URL}/articles`;
    await axios.get(apiURL)
        .then(response => {
            console.log(response)
            fromApiResponseToArticles
            // setUser({ articles: response.data }, { usuario: "Usuario no encontrado" })
        })
        .catch(error => {
            console.log(error.response)
        });
}