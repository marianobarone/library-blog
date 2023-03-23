import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from '../../reducers/authReducer';
import { types } from "../../data/types";
import axios from "axios";

const authInitialState = {
    token: null,
    user: null,
    errorMessageLogin: "",
    errorMessageRegister: "",
}
export const AuthContext = createContext(authInitialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser");

        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setCredentials(user);
        }
    }, [])

    const setCredentials = (user) => {
        dispatch({
            type: types.auth.setCredentials,
            payload: {
                // UID: uid,
                token: user.token,
                user: user
            }
        })
    }

    const loginWithEmail = async (credentials) => {
        let result;
        await axios
            .post(
                `https://api-library-blog.onrender.com/login/`,
                credentials
            )
            .then((response) => {
                let user = response.data
                dispatch({
                    type: types.auth.logIn,
                    payload: {
                        user: user,
                        token: user.token
                    }
                })
                window.localStorage.setItem("loggedUser", JSON.stringify(user));
                result = response;
            })
            .catch((error) => {
                dispatch({
                    type: types.auth.addError,
                    payload: {
                        errorMessageLogin: error.message
                    }
                })
                result = error.response;
            });

        return result;
    }

    const signOut = () => {
        window.localStorage.removeItem("loggedUser");
        dispatch({
            type: types.auth.signOut
        })
    }

    const authInfo = {
        ...state,
        setCredentials,
        loginWithEmail,
        signOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {/* // <AuthContext.Provider value={{ ...state, setCredentials, loginWithEmail }}> */}
            {children}
        </AuthContext.Provider>
    )
}

