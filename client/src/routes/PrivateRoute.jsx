import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';
import { Navigate,useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()

    if(loading){
        return <div className="flex items-center justify-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user){
        return children;
    }
    return (
        <Navigate state={location.pathname} to={'/sign-in'}></Navigate>
    );
};

export default PrivateRoute;