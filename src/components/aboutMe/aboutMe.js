import React from 'react'
import './aboutMe.css'
import AuthorImage from './author-img.jpg'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function AboutMe() {
    return (
        <section id="aboutMe" name='aboutMe'>
            <div className='aboutMe-card'>

                <div className='aboutMe-card-title'>
                    <h1>Autor</h1>
                </div>

                <div className='aboutMe-card-body'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <p>
                                    <span className="authorName">Marcelo Barone </span>
                                    nació en la ciudad de Buenos Aires.
                                    Realizó sus estudios primarios y secundarios, y dejó la carrera de abogacía para dedicarse a la informática.
                                    Trabajó en un importante organismo del estado argentino, en donde llegó a dirigir un centro de cómputos y a liderar
                                    el área de sistemas. Desde el año 2020 reside en Madrid en donde escribió varios ensayos y relatos cortos.
                                    Retirado definitivamente de la tecnología, volcó su tiempo libre en escribir su primera novela que ha sido lanzada
                                    en el mercado español y latinoamericano. Actualmente se encuentra escribiendo su segunda obra que espera publicar
                                    para la primavera europea.
                                </p>
                            </Grid>
                            <Grid className="author-img" item xs={12} md={4}>
                                <img src={AuthorImage} awidth="300" height="300"></img>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </section>
    )
}