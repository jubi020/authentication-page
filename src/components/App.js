import React from "react";
import { Container } from "react-bootstrap";
import {AuthProvider, useAuth} from "../contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'; 
import Signup from "./Signup";
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";


export default function App() {

  return (
    <AuthProvider>
        <div className="w-100 app" style={{maxWidth:"120%"}}>
          <Router>
            <AuthProvider>
              <Routes>  
                <Route path='/' element={<Signup />} />
                <Route element={<PrivateRoute />} >
                  <Route path="/dashboard" element={<Dashboard/>}/>
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
    </AuthProvider>
  );  
}

