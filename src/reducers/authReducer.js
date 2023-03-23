import { types } from "../data/types"

export const authReducer = (state, action) => {
    switch (action.type) {
        case types.auth.setCredentials:
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                status: 'authenticated',
            }
        case types.auth.logIn:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                status: 'authenticated',
            }
        case types.auth.signUp:
            return {
                ...state,
                token: action.payload.token,
                status: 'authenticated',
                UID: action.payload.UID
            }
        case types.auth.signOut:
            return {
                ...state,
                status: 'non-authenticated',
                token: null,
                user: null
            }
        case types.auth.addErrorLogin:
            return {
                ...state,
                UID: null,
                status: 'non-authenticated',
                token: null,
                errorMessageLogin: action.payload.errorMessageLogin
            }
        case types.auth.removeErrorLogin:
            return {
                ...state,
                errorMessageLogin: ""
            }
        case types.auth.addErrorRegister:
            return {
                ...state,
                UID: null,
                status: 'non-authenticated',
                token: null,
                errorMessageRegister: action.payload.errorMessageRegister
            }
        case types.auth.removeErrorRegister:
            return {
                ...state,
                errorMessageRegister: ""
            }
        case types.auth.notAuthenticated:
            return {
                ...state,
                status: 'non-authenticated',
                token: null,
                UID: null
            }
        case types.auth.checking:
            return {
                ...state,
                status: "waiting"
            }
        default:
            return state;
    }
}