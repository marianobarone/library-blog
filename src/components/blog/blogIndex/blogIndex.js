import React, { useContext, useEffect, useState } from 'react'
import './blogIndex.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../global/context/AuthContext';
import { BlogContext } from '../../../global/context/blogContext';
import { CardActionArea, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Blog() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const { articles } = useContext(BlogContext)

    return (
        <section id="blog">
            <div className='blog-card'>
                <Grid container spacing={2} className="section-title">
                    <Grid item md={11} xs={10}>
                        <div className='blog-card-title'>
                            <h1>Articulos Recientes</h1>
                        </div>
                    </Grid>
                    <Grid item md={1} xs={2} className="admin-button-div">
                        {user &&
                            <Tooltip title="Nuevo Articulo">
                                <IconButton aria-label="Delete" onClick={() => { navigate(`/newArticleJodit`) }} className="admin-button">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/puvaffet.json"
                                        trigger="loop-on-hover"
                                        colors="primary:#121331,secondary:#000000"
                                    >
                                    </lord-icon>
                                </IconButton>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {articles && articles.map((articulo, index) => (
                            <Grid key={articulo._id} className='blog-index-card' item xs={12} md={4}>
                                <div>
                                    <Card >
                                        <CardActionArea onClick={() => { navigate(`/articleDetails/${articulo._id}`) }}>
                                            <CardMedia
                                                component="img"
                                                className='img-card-blog-index'
                                                image={articulo.headerImg}
                                                alt=""
                                            />
                                            <CardContent className='card-blog-body'>
                                                <p className='article-date'>{articulo.date}</p>
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
