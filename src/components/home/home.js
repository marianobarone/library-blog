import React, { useEffect, useState } from 'react';
import AOS from "aos";

import './home.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PortadaImg from './portada-book.jpg'
import Portada1 from '../../portadasWeb/portada-1.jpg'
import Portada2 from '../../portadasWeb/portada-2.2.jpg'
import Portada3 from '../../portadasWeb/portada-3.jpg'


export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 5000
    });
  }, []);

  return (
    <section id='home'>
      <div className='home-header' data-aos="zoom-in">
        <img src={Portada2} width="100%" />
      </div>

      {/* <div>
        <h1>Hola, Bienvenido al sistema</h1>
      </div> */}

      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid className='contenedor' item xs={12} md={12}>
            <div> 
            <img src={Portada2} width="100%"></img>
            <div className='index-title '>
              <h1>La Cima del Poder</h1>
            </div>
            <p className='line anim-typewriter'>La Cima del Poder</p> 
            </div> 
          </Grid>
          <Grid item xs={12} md={4}>
            <div></div>
          </Grid> 
        </Grid>
      </Box> */}

    </section>


  )
}