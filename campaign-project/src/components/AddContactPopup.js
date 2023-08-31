import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { WithContext as ReactTags } from 'react-tag-input';
import '../styles/AddContactPopup.css';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddContactPopup = ({ addContact, closeAddContactPopup }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [tags, setTags] = useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
  
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const handleAdd = () => {
    setError('');

    if (!name) {
      setError('Name is required');
      return;
    } else if (!email) {
      setError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setError('Invalid Email Address.');
      return;
    } else if (!phoneNumber) {
      setError('Contact Number is required');
      return;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid Contact Number.');
      return;
    } else {
      const tagArr = tags.map(item => item.text);
addContact(name,phoneNumber,email,tagArr);
    }
  };

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  
  const validatePhoneNumber = (phone) => {
    const phoneNumberRegex = /^94\d{9}$/; // Regex pattern: Starts with 94 and followed by 9 digits
    return phoneNumberRegex.test(phone);
  };

  return (
    <Modal open={true} onClose={closeAddContactPopup}>
      <div className='add-contact-popup'>
      <Card sx={{ maxWidth: 500, margin: 'auto' }}>
          <CardContent>
            <div className='popup-header'>
              <IconButton onClick={closeAddContactPopup}>
                <CancelIcon />
              </IconButton>
            </div>
            <div className='popup-content'>
              <div className='row'>
                <div className='col' style={{ textAlign:'center' }}><h3>Add Contact</h3></div>
              </div>
              
              <div className='row' style={{ marginTop:'10px' }}>
                <div className='col-4' style={{ marginTop:'10px' }}>
                <Typography variant="p" >Name:</Typography>
                </div>
                <div className='col-8' style={{ textAlign:'center' }}>
                <TextField
                label='Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={error && error.includes('Name')}
                helperText={error && error.includes('Name') && error}
                style={{ width:'100%' }}
              />
                </div>
              </div>
              <div className='row' style={{ marginTop:'10px' }}>
              <div className='col-4' style={{ marginTop:'10px' }}>
                <Typography variant="p">Email Address:</Typography>
                </div>
                <div className='col-8' style={{ textAlign:'center' }}>
                <TextField
                label='Email Address'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={error && error.includes('Email')}
                helperText={error && error.includes('Email') && error}
                style={{ width:'100%' }}
              />
                </div>
              </div>
              <div className='row' style={{ marginTop:'10px' }}>
              <div className='col-4' style={{ marginTop:'10px' }}>
                <Typography variant="p" >Contact Number:</Typography>
                </div>
                <div className='col-8' style={{ textAlign:'center' }}>
                <TextField
                label='Contact Number'
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                error={error && error.includes('Contact')}
                helperText={error && error.includes('Contact') && error}
                style={{ width:'100%' }}
              />
                </div>
              </div>
              <div className='row' style={{ marginTop:'10px' }}>
              <div className='col-4'style={{ marginTop:'10px' }}>
                <Typography variant="p" >Tags:</Typography>
                </div>
                <div className='col-8' style={{ textAlign:'center' }}>
                <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          tagInputProps={{
            className: 'ReactTags__tagInputField' 
          }}
        />
                </div>
              </div>
              <div className='row'>
                <div className='col' style={{ textAlign:'center' }}>
                <Button
                variant='contained'
                color='primary'
                onClick={handleAdd}
                style={{ marginTop: '10px' ,width:'150px'}}
              >
                Submit
              </Button>
                </div>
              </div>
              
              
             
              
              
            </div>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default AddContactPopup;
