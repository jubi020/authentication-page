import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logout1 from '../components/Dashboard';

export default function PrivateRoute(){
    const {currentUser} = useAuth();
    // console.log(auth);
    // console.log("i am checked");
    return  currentUser ? <Outlet /> : <Navigate to = "/login" replace/>;
}