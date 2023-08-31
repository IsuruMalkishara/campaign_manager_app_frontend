import React, { useState, useEffect } from 'react';
import { Button, Table, Card, Alert, Paper, IconButton, TextField ,CardContent} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "material-ui-search-bar";
import ContactService from '../services/ContactService';
import TagService from '../services/TagService';
import NavbarComponent from '../components/NavbarComponent';
import AddContactPopup from '../components/AddContactPopup';
import ImportContactPopup from '../components/ImportContactPopup';
import '../styles/ContactsPage.css';

const ContactsPage = () => {
  const [isTagShow, setTagShow] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [isAllCheckboxChecked, setAllCheckboxChecked] = useState(false);

  const [isAddContactPopupOpen, setAddContactPopupOpen] = useState(false);

  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [isImportContactPopupOpen, setImportContactPopupOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [contactsData, tagsData] = await Promise.all([
          getAllContacts(),
          getAllTags()
        ]);

        if (isMounted) {
          setContactList(contactsData.data.data.contactList);
          setTagList(tagsData.data.data.tagList);
          console.warn(contactsData.data);
          console.warn(tagsData.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getAllContacts = () => {
    return ContactService.getAllContacts();
  };

  const getAllTags = () => {
    return TagService.getAllTags();
  };

  const handleAllCheckboxChange = (event) => {
    setAllCheckboxChecked(event.target.checked);

    const updatedContactList = contactList.map((contact) => ({
      ...contact,
      isChecked: event.target.checked,
    }));
    setContactList(updatedContactList);
  };

  const handleCheckboxChange = (event, contactId) => {
    const updatedContactList = contactList.map((contact) =>
      contact.id === contactId ? { ...contact, isChecked: event.target.checked } : contact
    );
    setContactList(updatedContactList);
  };

  const handleShowHideTags = () => {
    setTagShow(!isTagShow);
  };

  const handleAddContact = () => {
    setError('');
    console.warn('add popup open');
    setAddContactPopupOpen(true);
  };

  const closeAddContactPopup = () => {
    setAddContactPopupOpen(false);
  };

  const addContact = (name, phoneNumber, email, tags) => {
    setError('');
    setAddContactPopupOpen(false);
    
    const token = sessionStorage.getItem('token');
    const jwtToken = 'Bearer ' + token;

    const data = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      tags: tags,
    };
    console.warn(data);
    console.warn(jwtToken);
    ContactService.addContact(data)
      .then((response) => {
        console.warn(response.data);

        if (response.data.status === 'SUCCESS') {
          setError('');
          window.location.reload(false);
        } else {
          setError('Email address already used');
        }
      })
      .catch((error) => {
        setError('Email address already used');
        console.error('Error', error);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Email address already used');
      });
  };

  const handleSearch = () => {
    console.warn(searchTerm);
    ContactService.searchContact(searchTerm).then(res=>{
      console.warn(res.data);
    })
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  //import contact 
  const handleImportContact=()=>{
    console.warn("import contact popup open");
    setImportContactPopupOpen(true);
  }

  const closeImportContactPopup = () => {
    setImportContactPopupOpen(false);
  };

  const importContact = (arr) => {
    setError('');
    setImportContactPopupOpen(false);
    

    ContactService.importContact(arr)
      .then((response) => {
        console.warn(response.data);

        if (response.data.status === 'SUCCESS') {
          setError('');
          window.location.reload(false);
        } else {
          setError('Error');
        }
      })
      .catch((error) => {
        setError('Error');
        console.error('Error', error);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error');
      });
  };


  return (
    <div className='contact'>
      <div className='row'>
        <div className='col-2' style={{ textAlign: 'center' }}>
          <div className='navbar-container'>
            <NavbarComponent />
          </div>
        </div>
        <div className='col-10'>
          <div className='contact-content' style={{ width: '100%' }}>
            
            <div className='row'>
              <div className='col' style={{ textAlign: 'center' }}>
                <h1>Contacts</h1>
              </div>
            </div>
            <div className='row'>
              <div className='col' style={{ textAlign: 'center' }}>
                <div className='d-flex justify-content-center align-items-center'>
                  {!isTagShow && (
                    <Button
                      className='button'
                      onClick={handleShowHideTags}
                      style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px',margin:'10px',marginLeft:'150px' }}
                    >
                      Show Tags
                    </Button>
                  )}
                  {isTagShow && (
                    <Button
                      className='button'
                      onClick={handleShowHideTags}
                      style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px',margin:'10px' }}
                    >
                      Hide Tags
                    </Button>
                  )}
                  
                  <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',height: '40px' }}>
                  
                    <TextField
                      placeholder='Search'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      variant="standard" 
                      sx={{ ml: 1, flex: 1 ,'& input': {
                        height: '28px',
            border: 'none',
                      },}}
                    />
                    <IconButton type='button' onClick={handleSearch} sx={{ p: '10px' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  <Button
                    className='button'
                    style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '200px',margin:'10px' }}
                    onClick={handleAddContact}
                  >
                    + New Contact
                  </Button>
                  <Button 
                  onClick={handleImportContact}
                  className='button' style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px' ,margin:'10px'}}>
                    Import
                  </Button>
                  <Button className='button' style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px',margin:'10px' }}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
            {error && (
              <Alert variant='danger' style={{ textAlign: 'center' }}>
                {error}
              </Alert>
            )}
            {!isTagShow && (
              <div className='row' style={{ margin:'10px' }}>
                <div className='col-12' style={{ textAlign: 'center', maxHeight: '530px', overflowY: 'auto' }}>
                  <div style={{ marginLeft:'100px' }}>
                  {contactList.length > 0 ? (
                    <Table
                    striped
  bordered
  hover
  responsive
  sx={{
    margin: '10px',
    borderCollapse: 'collapse',
    width: '100%',
    '& th': {
      backgroundColor: 'lightgray',
      fontWeight: 'bold',
      border: '1px solid black',
      padding: '10px',
    },
    '& td': {
      border: '1px solid black',
      padding: '10px',
    },
    '& input[type="checkbox"]': {
      marginLeft: '0',
    },
  }}
  className='contact-table'
                    >
                      <thead>
                        <tr>
                          <th>
                            <input
                              type='checkbox'
                              checked={isAllCheckboxChecked}
                              onChange={handleAllCheckboxChange}
                            />
                          </th>
                          <th>Name</th>
                          <th>Contacts</th>
                          <th>Tags</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {contactList.map((contact) => (
                          <tr key={contact.id}>
                            <td>
                              <input
                                type='checkbox'
                                checked={contact.isChecked || false}
                                onChange={(event) => handleCheckboxChange(event, contact.id)}
                              />
                            </td>
                            <td>{contact.name}</td>
                            <td>
                              <div>
                                <strong>Email:</strong> {contact.email}
                              </div>
                              <div>
                                <strong>Phone:</strong> {contact.phoneNumber}
                              </div>
                            </td>
                            <td>
                              {contact.tags.map((tag) => (
                                <span key={tag.tagId}>{tag.name}, </span>
                              ))}
                            </td>
                            <td>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </td>
                            <td>
                              <IconButton>
                                <CancelIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No contacts found.</p>
                  )}
                  </div>
                </div>
              </div>
            )}
            {isTagShow && (
              <div className='row' style={{ margin:'10px' }}>
                <div className='col-3'>
                  <Card className='tag-card' style={{ maxHeight: '530px', overflowY: 'auto', maxWidth: '100%' }}>
                    <CardContent style={{ textAlign: 'center' }}>
                      {tagList.length > 0 && (
                        <div className='row'>
                          <div className='col' style={{ textAlign: 'center' }}>
                            <Button className='tag-btn' style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px',margin:'2px' }}>
                              All
                            </Button>
                            {tagList.map((tag) => (
                              <Button
                                key={tag.tagId}
                                className='tag-btn'
                                style={{ background: 'rgb(29,161,242)', color: 'rgb(255,255,255)', width: '150px',margin:'2px' }}
                              >
                                {tag.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className='col-9' style={{ maxHeight: '530px', overflowY: 'auto',textAlign:'center' }}>
                  {contactList.length > 0 ? (
                    <div className="table-container">
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      sx={{
                        margin: '10px',
                        borderCollapse: 'collapse',
                        width: '100%',
                        '& th': {
                          backgroundColor: 'lightgray',
                          fontWeight: 'bold',
                          border: '1px solid black',
                          padding: '10px',
                        },
                        '& td': {
                          border: '1px solid black',
                          padding: '10px',
                        },
                        '& input[type="checkbox"]': {
                          marginLeft: '0',
                        },
                      }}
                      className='contact-table'
                    >
                      <thead>
                        <tr>
                          <th>
                            <input
                              type='checkbox'
                              checked={isAllCheckboxChecked}
                              onChange={handleAllCheckboxChange}
                            />
                          </th>
                          <th>Name</th>
                          <th>Contacts</th>
                          <th>Tags</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactList.map((contact) => (
                          <tr key={contact.id}>
                            <td>
                              <input
                                type='checkbox'
                                checked={contact.isChecked || false}
                                onChange={(event) => handleCheckboxChange(event, contact.id)}
                              />
                            </td>
                            <td>{contact.name}</td>
                            <td>
                              <div>
                                <strong>Email:</strong> {contact.email}
                              </div>
                              <div>
                                <strong>Phone:</strong> {contact.phoneNumber}
                              </div>
                            </td>
                            <td>
                              {contact.tags.map((tag) => (
                                <span key={tag.tagId}>{tag.name}, </span>
                              ))}
                            </td>
                            <td>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </td>
                            <td>
                              <IconButton>
                                <CancelIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    </div>
                  ) : (
                    <p>No contacts found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isAddContactPopupOpen && (
        <AddContactPopup
          addContact={addContact}
          closeAddContactPopup={closeAddContactPopup}
        />
      )}
      {isImportContactPopupOpen && (
        <ImportContactPopup
          importcontact={importContact}
          closeImportContactPopup={closeImportContactPopup}
        />
      )}
    </div>
  );
};

export default ContactsPage;
