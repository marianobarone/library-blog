import './navbar.css'
import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { AuthContext } from '../../global/context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { hash } = useLocation();
  const { user, status } = useContext(AuthContext);
  const estado = (status == "authenticated");
  // const estado = true;
  // console.log(hash);
  const isActive = (iHash) => hash === iHash;
  // console.log(location);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="fixed" color="" sx={{ mb: 40 }}>
        <Toolbar>
          <ul className="nav navbar-nav">

            {estado && (
              <li className="nav-item">
                <HashLink className={isActive("#home") ? "nav-link active" : "nav-link"} smooth to="/#home"

                >LINK PARA USUARIO
                </HashLink>
              </li>
            )}

          
            <li className="nav-item">
              <HashLink className={isActive("#home") ? "nav-link active" : "nav-link"} smooth to="/#home"

              >Home
              </HashLink>
            </li>

            <li className="nav-item">
              <HashLink className={isActive("#aboutMe") ? "nav-link active" : "nav-link"} smooth to={'/#aboutMe'}>
                Autor
              </HashLink>
            </li>

            <li className="nav-item">
              <HashLink className={isActive("#blog") ? "nav-link active" : "nav-link"} smooth to={'/#blog'}>
                Artículos
              </HashLink>
            </li>

            <li className="nav-item">
              <HashLink className={isActive("#shop") ? "nav-link active" : "nav-link"} smooth to={'/#shop'}>
                Comprar
              </HashLink>
            </li>

            <li className="nav-item">
              <LinkRouter to={"/login"}>
                Login
              </LinkRouter>
            </li>
          </ul>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
