import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import { useAuth } from '../contexts/AuthContext';


export default function Dashboard() {

  const[error, setError] = useState('');
  const [logout1, setLogout1] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuth(); 
  const {currentUser} = useAuth();


  async function handleLogout(){
    try{
      setError('');
      setLogout1(true);
      await logout();
      navigate('/login');
    }catch{
      setError("Failed to logout");
    }
  }

  return (
  <div className='dashboard h-100' style={{backgroundColor: "white", color:"black"}}>
    <nav className='d-flex justify-content-end mb-5'>
      <button className="mt-2  m-2 dashboard-logout-button" onClick={handleLogout}>Log Out</button>
      
    </nav>
    <div className='dashboard-bottom d-flex justify-content-center'>
      <h1 className='align-self-center text-center m-4'>Welcome Back <span style={{fontWeight:"600", color:"purple"}}>{currentUser.email}</span> !</h1>
    </div>
  </div>
  );
}
