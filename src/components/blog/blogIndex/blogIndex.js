import React, { useContext, useEffect, useState } from 'react'
import './blogIndex.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';



import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../../global/context/blogContext';


export default function Blog() {
    const navigate = useNavigate()
    // const { articles } = useContext(Context);
    const { articles } = useContext(BlogContext)
    // console.log({articles});

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("Context user" + user);
    //         console.log("Context article" + article);
    //     }, 1000)

    // }, []);

    return (
        <section id="blog">
            <div className='blog-card'>

                <div className='blog-card-title'>
                    <h1>Articulos Recientes</h1>
                </div>

                <Box sx={{ flexGrow: 1 }}>
                    <Button onClick={() => { navigate(`/newArticleJodit`) }}>Nuevo Articulo</Button>
                    <Grid container spacing={2}>
                        {articles && articles.map((articulo, index) => (
                            <Grid key={articulo._id} className='blog-index-card' item xs={12} md={4}>
                                <div>
                                    <Card >
                                        {/* <CardActionArea onClick={() => { navigate(`/articleDetails/${articulo._id}`, { state: { articulo: buscarArticulo(articulo._id) } }) }}> */}
                                        <CardActionArea onClick={() => { navigate(`/articleDetails/${articulo._id}`) }}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={articulo.headerImg}
                                                alt=""
                                            />
                                            <CardContent>
                                                <p>{articulo.date}</p>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {articulo.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {articulo.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </div>
        </section >
    )
}
