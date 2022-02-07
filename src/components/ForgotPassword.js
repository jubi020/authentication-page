import React, { useRef, useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword(){

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const emailRef = useRef();
    const {resetPassword} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Successful! Check your email for futher instructions.')
        } catch{
            setError('Cannot reset password. Please try again.')
        }

        setLoading(false);
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight : "100vh"}}>
            <div className='login w-100' style={{maxWidth : "470px"}}>
                <h2 className='text-center mb-4'>Reset Password</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <button disabled={loading} className='w-100 mt-4 rounded signup--button' type='submit'>Reset Password</button>
                    <div className='w-100 text-center mt-3'>
                     <Link to='/login'>Log In</Link>
                    </div>
                </Form>
                <div className='w-100 text-center mt-2'>
                    Need an Account? <Link to='/'>Sign Up</Link>
                </div>
            </div>
        </Container>
    );

}