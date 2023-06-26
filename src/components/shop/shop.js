import React from 'react'
import './shop.css'
import PortadaImg from './img-books/portada-book.jpg'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { fontSize } from '@mui/system';
import PaymentButton from './paymentButton';

export default function Shop() {
    return (
        <section id='shop'>
            <div className='shop-card'>

                <Grid container className="section-title">
                    <Grid item md={12}>
                        <div className='shop-card-title'>
                            <h1>Comprar</h1>
                        </div>
                    </Grid>
                </Grid>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid className='portadaShop' container spacing={2}>
                        <Grid className='portadaShop' container direction="column" item xs={12} md={6}>
                            <img src={PortadaImg} width="300" height="500"></img>

                            <div className='shop-buttons'>
                                <PaymentButton/>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained">Mercado Pago</Button>
                                    <Button variant="contained" href="#contained-buttons">
                                        Amazon
                                    </Button>
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <h3>Sinopsis</h3>
                            <div className='sinopsis'>

                                <p>
                                    <span className='capitalLetter'>B</span>uenos Aires. Finales del siglo XX, Gerardo, un joven y exitoso abogado nacido en el seno de una acaudalada familia porteña, sueña con ser Presidente de la República. Para ello deberá combatir muchos de los flagelos que azotan al país: corrupción, mafias sindicales, narcotráfico y delincuencia. Como si todo ello fuera poco, tendrá que luchar contra algunos gobernadores del interior que ven peligrar su dominio hegemónico sobre sus provincias, ante el avance imparable del gobierno nacional.
                                </p>

                                <p>
                                    En su camino se cruzará Liliana, una joven nacida en un hogar humilde de la provincia de Buenos Aires, quien escapando de un horrible pasado, hará cualquier cosa, hasta cambiar su identidad, para acercarse a Gerardo antes de que este llegue a la presidencia.
                                </p>

                                <p>
                                    Pero de manera casual cierta información llegará a oídos de un fiel y obstinado agente del servicio de inteligencia, quien comenzará una serie de investigaciones que sacarán a la luz hechos abominables que desembocarán en un final inesperado e insospechado.
                                </p>

                                <p>
                                    Todo ello se narra en La cima del poder, una novela de ficción que describe el interés de un hombre en llegar a ser presidente para cambiar el destino de su país y la ambición de una mujer para alcanzar sus objetivos personales. El lector se verá atrapado en situaciones de acción, suspenso e intriga que no dejarán de sorprenderlo y fascinarlo hasta  el final.
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </section >
    )
}
