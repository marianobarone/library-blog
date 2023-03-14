import { Box, Button, Container, TextField } from '@mui/material';
import './newArticle.css'
import React, { useContext, useReducer, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios'
import { BlogContext } from '../../../../global/context/blogContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { BlogReducer } from '../../../../reducers/blogReducer';

Quill.register('modules/imageResize', ImageResize);

export default function NewArticle() {
    const { articles, addNewArticle} = useContext(BlogContext)
    const [state, dispatch] = useReducer(BlogReducer, articles);
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [value, setValue] = useState('');
    console.log(value);

    var modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }, { font: [] }],
            // [{color:['yellow']}],
            [{ 'color': [] }, { 'background': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        }
    };

    var formats = [
        'header',
        'color',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'size',
        'list', 'bullet', 'indent',
        'align',
        'link', 'image'
    ];

    async function saveArticle() {

        const nuevoArticulo = {
            title: titulo,
            body: value,
        };

        addNewArticle(nuevoArticulo);
        navigate("/")

        // await axios
        //     .post(
        //         "http://localhost:3001/articles",
        //         nuevoArticulo,
        //         //   { headers: { Authorization: `Bearer ${context.user.token}` } }
        //     )
        //     .then((response) => {
        //         console.log(response);
        //         dispatch({
        //             type: "updateArticles",
        //             payload: {
        //                 articles: [...articles, response.data]
        //             }
        //         })
        //         navigate("/")
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //     });
    }


    return (
        <Container className='newArticle-section'>
            <div>
                <h1>Nuevo Artículo</h1>
            </div>


            <TextField id="standard-basic" label="Titulo" variant="standard" className='newArticle-title' value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <div className='newArticle-text-editor'>
                <ReactQuill theme="snow" value={value} onChange={setValue}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                />
            </div>

            <div className='newArticle-save-btn-div'>
                <Button className='newArticle-save-btn' variant="contained" onClick={() => { saveArticle() }}>Guardar</Button>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: value }}
            />
        </Container>
    )
}
