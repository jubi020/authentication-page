import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigate = useNavigate();
    const {login} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
   

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard');
        }
        catch{
            setError('The email or password is incorrect');
        }

        setLoading(false);
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight : "100vh"}}>
            <div className='login w-100' style={{maxWidth : "470px"}}>
                <h2 className='text-center mb-4'>Log In</h2>
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
                    <button disabled={loading} className='w-100 mt-4 rounded signup--button' type='submit'>Login</button>
                    <div className='w-100 text-center mt-3'>
                     <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                </Form>
                <div className='w-100 text-center mt-2'>
                    Need an Account? <Link to='/'>Sign Up</Link>
                </div>
            </div>
        </Container>
    );
}
