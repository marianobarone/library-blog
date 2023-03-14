import React, { createContext, useReducer } from "react";
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

    const setCredentials = (token, uid) => {
        dispatch({
            type: types.auth.setCredentials,
            payload: {
                UID: uid,
                token: token
            }
        })
    }

    const loginWithEmail = async (credentials) => {
        let result;
        await axios
            .post(
                "http://localhost:3001/login",
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

    const authInfo = {
        ...state,
        setCredentials,
        loginWithEmail
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

