import React, {useRef, useState} from 'react';
import { Container } from "react-bootstrap";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const passwordConfirmRef = useRef('');
    const navigate = useNavigate();
    const {signup} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
   
    // console.log(emailRef.current.value, 
    //     passwordRef.current.value, 
    //     passwordConfirmRef.current.value);

    async function handleSubmit(e){
        // console.log(e);
        e.preventDefault();
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError('Passwords do not match.');
        }

        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value);
            navigate('/dashboard');
        }
        catch{
            setError('Failed to create an account');
        }
        
        setLoading(false);
        
    }
   
    return(
        <div className="signup">
                {/* <h2 className='signup-heading'>Welcome to the Chatterbox &#128513;</h2> */}
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight : "100vh"}}>
                <div className='signup--component w-100' style={{maxWidth : "470px"}}>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />
                        </Form.Group>
                        <button disabled={loading} className='w-100 mt-4 rounded signup--button' type='submit'>Sign Up</button>
                    </Form>
                        
                    
                    <div className='w-100 text-center mt-2'>
                        Already have an account? <Link to='/login'>Log In</Link>
                    </div>
                </div>
            </Container>
            </div>
        
    );
}
