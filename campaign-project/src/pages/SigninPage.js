import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Button, Card, TextField, Typography,CardContent } from '@mui/material';
import { Link } from 'react-router-dom'
import UserService from '../services/UserService';
import '../styles/SigninPage.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let autoLogoutTimer;

  const navigate = useNavigate();

  useEffect(() => {
    // Clear the auto logout timer when the component unmounts (e.g., on logout or token expiry)
    return () => {
      clearTimeout(autoLogoutTimer);
    };
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: email,
        password: password,
        provider: 'LOCAL',
      };
      console.warn(data);
      UserService.signin(data).then((res) => {
        console.warn(res.data);
        sessionStorage.setItem('token', res.data.data.accessToken);
        console.warn(!!sessionStorage.getItem('token'));
        if (!!sessionStorage.getItem('token')) {
          // navigate('/dashboard'); // Navigate here, if the token is present
          window.location.href = '/dashboard';
        }
      });
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleGoogleSignIn = async (googleUser) => {
    console.log(googleUser);
    try {
      const data = {
        username: googleUser.profileObj.email,
        provider: 'GOOGLE',
      };

      UserService.signin(data).then((res) => {
        console.warn(res.data);
        if (res.data.data === 'SIGNUP') {
          const userData = {
            email: googleUser.profileObj.email,
            name: googleUser.profileObj.name,
            provider: 'GOOGLE',
          };

          console.log(userData);
          navigate('/phone-verification', { state: { userData } });
        } else {
          sessionStorage.setItem('token', res.data.data.accessToken);
          navigate('/dashboard');
        }
      });
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  return (
    <div className="signin">
      
      <Card className="signin-card">
        <CardContent>
          <div className="row">
            <div className="col-7">
              <div className="row">
                <div className="col" style={{ marginTop: '140px' }}>
                  <Typography variant="h3">Welcome</Typography>
                  <Typography variant="h6">to the</Typography>
                  <Typography variant="h3">Campaign Manager</Typography>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="row" style={{ margin: '20px' }}>
                <div className="col" style={{ textAlign: 'center' }}>
                  <Typography variant="h6">Login Here</Typography>
                </div>
              </div>
              <div className="row" style={{ margin: '20px' }}>
                <div className="google-login-container">
                  <GoogleLogin
                    clientId="310760101499-1tfg2dr11as904q7kdj3es9d1iche38o.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={handleGoogleSignIn}
                    onFailure={(error) => console.error('Google Sign-In Error:', error)}
                    className="google-login-btn"
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
              </div>
              <div className="row" style={{ margin: '20px' }}>
                <Typography variant="h5">or</Typography>
              </div>
              <div className="row" style={{ margin: '20px' }}>
                <div className="signin-form">
                  <form onSubmit={handleEmailSignIn}>
                    <TextField
                      type="text"
                      label="Enter Your Email Address"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      
                      style={{ margin: '10px', width: '300px' }}
                    />
                    <TextField
                      type="password"
                      label="Enter Your Password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      inputProps={{ style: { textAlign: 'center' } }}
                      style={{ margin: '10px', width: '300px' }}
                    />
                    <Button type="submit" variant="contained" className="signin-btn">
                      Sign In
                    </Button>
                  </form>
                </div>
              </div>
              <div className="row" style={{ margin: '20px' }}>
                <Typography variant="body1">
                  No account yet? <Link to="/signup">Sign up for free</Link>
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
