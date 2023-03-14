import React, { useContext, useState, useEffect } from 'react'
import './articleDetails.css'
import Container from '@mui/material/Container';
import ArticleComment from './articleComment/articleComment.js'
import { useLocation, useParams } from 'react-router-dom';
import Context from '../../../global/context/mainContext'

import DOMPurify from 'dompurify';
import { BlogContext } from '../../../global/context/blogContext';


export default function ArticleDetails() {
    const location = useLocation();
    let { id } = useParams();
    const { articles } = useContext(BlogContext);
    console.log("Estos son los params:" + id);
    const articuloEncontrado = articles.find(a => a._id == id);

    const params = useParams();
    console.log(params)


    useEffect(() => {

    }, [])


    // const sanitizedData = () => ({
    //     __html: DOMPurify.sanitize(articles.body)
    // })

    return (
        <div>
            <Container className='articleDetails'>

                <img src={articuloEncontrado.headerImg}
                    width="100%" height="300" className='object-cover'/>

                <div className='articleTitle'>
                    <h1>{articuloEncontrado.title}</h1>
                </div>

                <h4>{articuloEncontrado.date}</h4>

                <div className='articleBody'>
                    {/* dangerouslySetInnerHTML={{ __html: '<h2>What is Lorem Ipsum?'}} */}
                    <div dangerouslySetInnerHTML={{ __html: articuloEncontrado.body }}></div>
                    {/* dangerouslySetInnerHTML={{ __html: articulo.body.h2 }} */}

                    {/* dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articulo.body) }} */}

                </div>

                <hr />

                <div className='articleComments'>
                    <h3>Comentarios</h3>

                    {/* <ArticleComment {{state: article.comments}}/> */}
                    <ArticleComment comments={articuloEncontrado.comments} />
                </div>
            </Container>
        </div>
    )
}
