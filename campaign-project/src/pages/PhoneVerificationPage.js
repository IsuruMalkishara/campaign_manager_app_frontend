import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, TextField, Button, Typography, Alert,CardContent } from '@mui/material';
import OtpInput from 'react-otp-input';
import UserService from '../services/UserService';
import '../styles/PhoneVerificationPage.css';

export default function PhoneVerificationPage() {
  const location = useLocation();
  const userData = location.state.userData;

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerificationCodeSend, setVerificationCodeSend] = useState(false);

  const navigate = useNavigate();

  const sendOtp = (e) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Please enter Contact Number');
      return;
    } else if (!validatePhoneNumber(phone)) {
      setError('Invalid Contact Number.');
      return;
    } else {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        emailOtp: userData.emailOtp,
        phoneNumber: phone,
        provider: userData.provider,
      };

      UserService.sendPhoneOtp(data)
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setError('');
            setVerificationCodeSend(true);
          } else {
            setError('Phone number is already used');
          }
        })
        .catch((error) => {
          setError('Phone number is already used');
          console.error('Error', error);
        });
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneNumberRegex = /^94\d{9}$/;
    return phoneNumberRegex.test(phone);
  };

  const verifyPhone = (e) => {
    e.preventDefault();

    if (!code) {
      setError('Please enter verification Code');
      return;
    } else {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        emailOtp: userData.emailOtp,
        phoneNumber: phone,
        phoneNumberOtp: code,
        provider: userData.provider,
      };

      UserService.verifyPhone(data)
        .then((res) => {
          if (res.data.status === 'SUCCESS') {
            setError('');
            signup();
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

  const signup = () => {
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      emailOtp: userData.emailOtp,
      phoneNumber: phone,
      provider: userData.provider,
    };

    UserService.signup(data)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          navigate('/dashboard');
        } else {
          setError('Invalid Verification Code');
        }
      })
      .catch((error) => {
        setError('Invalid Verification Code');
        console.error('Error', error);
      });
  };

  return (
    <div className='verification'>
      <div>
        <div className='row'>
          <Card className='phone-number-card'>
            <CardContent>
              <Typography variant='h6' style={{ marginTop: '10px' }}>
                Let's enter your phone number
              </Typography>
              <form>
                <TextField
                  className='input'
                  label='Enter Your Phone Number'
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputProps={{ style: { textAlign: 'center' } }}
                      
                  style={{ textAlign: 'center' }}
                />
                {error.includes('Number') && <Alert severity='error'>{error}</Alert>}
                <div className='row'>
                  <div className='col' style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant='contained' color='primary' onClick={sendOtp}>
                      Send OTP
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className='row'>
          {isVerificationCodeSend && (
            <Card className='verification-card'>
              <CardContent>
                <Typography variant='h6' style={{ marginTop: '10px' }}>
                  Let's verify your phone
                </Typography>
                <form>
                  <Typography variant='subtitle1' className='label'>
                    Please enter the code you received to your mobile
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center', width: '450px', textAlign: 'center' }}>
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
                  {error.includes('Code') && <Alert severity='error'>{error}</Alert>}
                  <div className='row'>
                    <div className='col' style={{ marginTop: '20px', textAlign: 'center' }}>
                      <Button variant='contained' color='primary' onClick={resendCode}>
                        Resend
                      </Button>
                    </div>
                    <div className='col' style={{ marginTop: '20px', textAlign: 'center' }}>
                      <Button variant='contained' color='primary' onClick={verifyPhone}>
                        Verify
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
