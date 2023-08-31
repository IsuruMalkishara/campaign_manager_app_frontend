import React, { useState } from 'react';
import {
  Button,
  Modal,
  Card,
  CardContent,
  IconButton,
  Typography
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Papa from 'papaparse';

const ImportContactPopup = ({ importcontact, closeImportContactPopup }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImport = () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;
      
      const { data: csvArray } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      const jsonArray = csvArray.map((row) => {
        const { Email, Name, Tags, 'Contact Number': phoneNumber } = row;
        const tagsArray = Tags.split(',').map((tag) => tag.trim());

        return {
          email: Email,
          name: Name,
          tags: tagsArray,
          phoneNumber: phoneNumber,
        };
      });

      console.log(jsonArray); // This will log the generated JSON array
      importcontact(jsonArray); // Pass the JSON array to the parent component

    };

    reader.readAsText(selectedFile);
  };

  return (
    <Modal open={true} onClose={closeImportContactPopup}>
      <div className='import-contact-popup'>
        <Card sx={{ maxWidth: 500, margin: 'auto' }}>
          <CardContent>
            <div className='popup-header'>
              <IconButton onClick={closeImportContactPopup}>
                <CancelIcon />
              </IconButton>
            </div>
            <div className='popup-content'>
             
              <div className='row' style={{ marginTop: '10px' }}>
                <div className='col-3'>
                  <Typography variant='p'>Choose File:</Typography>
                </div>
                <div className='col-9' style={{ textAlign: 'center' }}>
                  
                  <input
                    type='file'
                    accept='.csv'
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    id='fileInput'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col' style={{ textAlign: 'center' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleImport}
                    style={{ marginTop: '10px', width: '150px' }}
                  >
                    Import
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

export default ImportContactPopup;
