import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
// import Loader from '../components/Loader/Loader'
import { AuthContext } from '../../global/context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, state } = useContext(AuthContext)
    const location = useLocation()
    // if (loading) {
    //     return <Loader />
    // }
    if (user) {
        return children
    }
    return <Navigate to='/login' />
}

export default PrivateRoute





