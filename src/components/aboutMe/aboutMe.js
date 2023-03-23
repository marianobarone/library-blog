import React, { useContext, useEffect } from 'react'
import './aboutMe.css'
import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ModalEditAboutMe from './editAboutMe';
import { AuthContext } from '../../global/context/AuthContext';
import { BlogContext } from '../../global/context/blogContext';

export default function AboutMe() {
    const { user } = useContext(AuthContext)
    const { aboutMe, setLoading } = useContext(BlogContext)

    useEffect(() => {
        setLoading(JSON.stringify(aboutMe) === '{}')
    }, [aboutMe])

    return (
        <section id="aboutMe" name='aboutMe'>
            <div className='aboutMe-card'>

                <Grid container spacing={2} className="section-title">
                    <Grid item md={11} xs={10}>
                        <div className='aboutMe-card-title'>
                            <h1>Autor</h1>
                        </div>
                    </Grid>
                    <Grid item md={1} xs={2} className="admin-button-div">
                        {user &&
                            <div>
                                <ModalEditAboutMe
                                    aboutMe={aboutMe}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>

                <div className='aboutMe-card-body'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <div className='articleBody'>
                                    {parse(aboutMe?.body)}
                                </div>
                            </Grid>
                            <Grid className="author-img" item xs={12} md={4}>
                                <img src={aboutMe && aboutMe?.img} width="300" height="300"></img>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </section>
    )
}