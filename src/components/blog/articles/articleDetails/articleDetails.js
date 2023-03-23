import React, { useContext, useState, useEffect } from 'react'
import './articleDetails.css'
import parse from 'html-react-parser';
import { useLocation, useParams } from 'react-router-dom';
import { BlogContext } from '../../../../global/context/blogContext';
import Container from '@mui/material/Container';
import ArticleComment from '../../articles/articleComments/articleComment'
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';

export default function ArticleDetails() {
    const location = useLocation();
    let { id } = useParams();
    const { articles } = useContext(BlogContext);
    console.log("Estos son los params:" + id);
    const articuloEncontrado = articles.find(a => a._id == id);

    const params = useParams();
    console.log(params)

    return (
        <div>
            <Container className='articleDetails'>
                
                <Link to='/#blog' className='text-primary text-4xl -ml-4 mt-2 fixed goBack-blog'>
                    <IconButton
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: 'red',
                            backgroundColor: '#8eafd8'
                        }}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </Link>

                <img src={articuloEncontrado.headerImg}
                    width="100%" height="300" className='object-cover' />

                <div className='articleTitle'>
                    <h1>{articuloEncontrado.title}</h1>
                </div>

                <h4>{articuloEncontrado.date}</h4>

                <div className='articleBody'>
                    <div>
                        {parse(articuloEncontrado?.body)}
                    </div>
                </div>

                <hr />

                <div className='articleComments'>
                    <h3>Comentarios</h3>
                    <ArticleComment comments={articuloEncontrado.comments} />
                </div>
            </Container>
        </div>
    )
}
