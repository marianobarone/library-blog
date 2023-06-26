import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Routes
} from 'react-router-dom'
// import { LandingScreen } from '../components/landing/LandingScreen'
import Login from '../login/login.js'
// import { SignUpScreen } from '../components/register/SignUpScreen'


export const AuthRouter = () => {
    return (
        <Router>
            <Routes>


                <Route path="/" element={<Login />}></Route>
                {/* <Route exact path="/register" component={SignUpScreen} />
            <Route exact path="/index" component={LandingScreen} /> */}
                {/* <Redirect to="/" /> */}

            </Routes>
        </Router>
    )
}