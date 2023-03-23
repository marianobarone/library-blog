import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from 'react-router-dom'
import { LandingScreen } from '../components/landing/LandingScreen'
import { Login } from '../login/login'
import { SignUpScreen } from '../components/register/SignUpScreen'

export const AuthRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={SignUpScreen} />
                    <Route exact path="/index" component={LandingScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}