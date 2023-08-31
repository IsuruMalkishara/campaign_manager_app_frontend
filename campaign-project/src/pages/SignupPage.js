import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Button, Card, TextField, Alert, Typography,CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles/SignupPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError('Name is required.');
      return;
    }

    if (!email) {
      setError('Email Address is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }

    if (!confirmPassword) {
      setError('Confirm Password is required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Confirm Password should match with Password.');
      return;
    }

    try {
      const data = {
        name: name,
        email: email,
        password: password,
        provider: 'LOCAL',
      };

      UserService.sendEmailOtp(data)
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setError('');
            navigate('/email-verification', { state: { userData: data } });
          } else {
            setError('Email address already used');
          }
        })
        .catch((error) => {
          setError('Email address already used');
          console.error('Error', error);
        });
    } catch (error) {
      setError('Email address already used');
      console.error('Error', error);
    }
  };

  const handleGoogleSignUp = async (googleUser) => {
    const data = {
      email: googleUser.profileObj.email,
      name: googleUser.profileObj.name,
      provider: 'GOOGLE',
    };

    navigate('/phone-verification', { state: { userData: data } });
  };

  return (
    <div className='signup'>
      <Card className='signup-card'>
        <CardContent>
          <div className='row'>
            <div className='col-7'>
              <div className='row'>
                <div className='col' style={{ marginTop: '140px' }}>
                  <Typography variant='h4'>Campaign Manager</Typography>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row' style={{ margin: '20px' }}>
                <div className='col' style={{ textAlign: 'center' }}>
                  <Typography variant='h5'>Create your free account here</Typography>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='google-login-container'>
                  <GoogleLogin
                    clientId='310760101499-1tfg2dr11as904q7kdj3es9d1iche38o.apps.googleusercontent.com'
                    buttonText='Continue with Google'
                    onSuccess={handleGoogleSignUp}
                    onFailure={(error) =>
                      console.error('Google Sign-In Error:', error)
                    }
                    className='google-login-btn'
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='col'>
                  <Typography variant='h5'>or</Typography>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <div className='signup-form'>
                  <form onSubmit={handleSignup}>
                    <TextField
                      type='text'
                      label='Enter Your Name'
                      variant='outlined'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      
                      style={{ margin: '10px', width: '300px' }}
                    />
                    {error && error.includes('Name') && (
                      <Alert severity='error' style={{ textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Name field */}
                    <TextField
                      type='text'
                      label='Enter Your Email Address'
                      variant='outlined'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      
                      style={{ margin: '10px', width: '300px' }}
                    />
                    {error && error.includes('Email') && (
                      <Alert severity='error' style={{ textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Email field */}
                    <TextField
                      type='password'
                      label='Enter Your Password'
                      variant='outlined'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      
                      style={{ margin: '10px', width: '300px' }}
                    />
                    {error && error.includes('Password') && !error.includes('Confirm') && (
                      <Alert severity='error' style={{ textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Password field */}
                    <TextField
                      type='password'
                      label='Enter Your Password Again'
                      variant='outlined'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      
                      style={{ margin: '10px', width: '300px' }}
                    />
                    {error && error.includes('Confirm Password') && (
                      <Alert severity='error' style={{ textAlign: 'center', marginLeft: '10px' }}>
                        {error}
                      </Alert>
                    )}
                    {/* Display error message for Confirm Password field */}
                    <Button type='submit' variant='contained' className='signup-btn'>
                      Sign Up
                    </Button>
                  </form>
                </div>
              </div>
              <div className='row' style={{ margin: '20px' }}>
                <Typography variant='body1'>
                  Already a member? <Link to='/'>Sign In Here</Link>
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
