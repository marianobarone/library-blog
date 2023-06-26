import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import { Button, Container, Grid, Box, TextField, Checkbox, Avatar, CssBaseline, Typography, Paper, FormControlLabel, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Copyright } from '@mui/icons-material';

import loginService from '../../services/login'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../global/context/AuthContext';
import Loader from '../../shared/loader';
import { LoadingButton } from '@mui/lab';

export default function Login() {
  const { loginWithEmail, errorMessageLogin, removeErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("")
  const [passwordValidationError, setPasswordValidationError] = useState("");
  // const [user, setUser] = useState(null)
  const [mostrar, setMostrar] = useState(false);
  const [loadingBtn, setLoadinBtn] = useState(false);

  const notify = (toast, text) => toast(text);

  useEffect(() => {

  }, [mostrar])


  function showLoader() {
    <Loader />;
  }



  const handleLogin = async (event) => {
    event.preventDefault();

    // setMostrar(true);
    try {
      const user = {
        userName,
        password
      };

      setLoadinBtn(true);
      const result = await loginWithEmail(user);

      if (result.status != "200") {
        setLoadinBtn(false);
        notify(toast.error, result.error.response ? result.error.response.data.error : result.error.message);
      }
      else {
        setUserName("");
        setPassword("");
        setMostrar(false);
        notify(toast.success, `Bienvenido ${userName}`);
        navigate('/');
      }

    } catch (e) {
      notify(toast.error, e.message);
      setLoadinBtn(false);
    }
    // finally {
    //   navigate('/');
    // }

  }

  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailValidationError("");
      setUserName(email);
    } else if (email !== "") {
      setEmailValidationError("Email inválido");
    } else {
      setEmailValidationError("");
    }
  }

  function validatePassword(password) {
    if (password.length >= 1 || password === "") {
      setPasswordValidationError("");
      setPassword(password);
    }

  }

  return (
    <>
      {(!mostrar) ?
        <Grid container sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {/* <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}> */}
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            /> */}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => validateEmail(e.target.value)}
                  error={emailValidationError !== ""}
                  helperText={emailValidationError}
                  disabled={loadingBtn}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => validatePassword(e.target.value)}
                  error={passwordValidationError !== ""}
                  helperText={passwordValidationError}
                  disabled={loadingBtn}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  disabled={loadingBtn}
                />
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button> */}

                <LoadingButton
                  type="submit"
                  // onClick={handleClick}
                  loading={loadingBtn}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                //disabled
                >
                  <span>Sign In</span>
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        : <Loader></Loader>
      }
    </>

  );
}

