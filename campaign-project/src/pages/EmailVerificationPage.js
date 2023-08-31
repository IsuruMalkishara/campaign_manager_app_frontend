import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, TextField, Button, Alert, Typography,CardContent } from '@mui/material';
import OtpInput from 'react-otp-input';
import UserService from '../services/UserService';
import '../styles/EmailVerificationPage.css';

export default function EmailVerificationPage() {
  const location = useLocation();
  const userData = location.state.userData;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const verifyEmail = (e) => {
    e.preventDefault();

    if (!code) {
      setError('Please enter verification code');
      return;
    } else {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        emailOtp: code,
        provider: userData.provider,
      };

      UserService.verifyEmail(data)
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setError('');
            navigate('/phone-verification', { state: { userData: data } });
          } else {
            setError('Invalid Verification Code');
          }
        })
        .catch((error) => {
          setError('Invalid Verification Code');
          console.error('Error', error);
        });
    }
  };

  const resendCode = () => {
    // Implement resend code logic here
  };

  return (
    <div className='verification'>
      <Card className='verification-card'>
        <CardContent>
          <Typography variant='h6' style={{ marginTop: '10px' }}>
            Let's verify your email
          </Typography>
          <form>
            <div style={{ marginTop: '30px' }}>
              <Typography variant='body1'>
                Please enter the code you received to your email
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', width: '450px' }}>
                <OtpInput
                  value={code}
                  onChange={setCode}
                  numInputs={6}
                  separator={<span></span>}
                  inputStyle={{
                    width: '56px',
                    height: '56px',
                    fontSize: '24px',
                    margin: '0 5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                  }}
                />
              </div>
              {error && <Alert severity='error'>{error}</Alert>}
            </div>
            <div className='row'>
              <div className='col' style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button className='resend-btn' variant='contained' color='primary' onClick={resendCode}>
                  Resend
                </Button>
              </div>
              <div className='col' style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button className='verification-btn' variant='contained' color='primary' onClick={verifyEmail}>
                  Verify
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
