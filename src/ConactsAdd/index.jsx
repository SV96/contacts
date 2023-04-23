import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

import './index.scss'


const ConactsAddDialog=({ open, onClose, onSave, setOpen, formValues, setFormValues, addContactErr, setAddContactErr  }) => {
  const [saveDiable, setSaveDisable] = useState(false)

  const isSaveDisabled = !formValues.firstName ||
  !/^[a-zA-Z ]{1,25}$/.test(formValues.firstName) ||
  !formValues.email ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) ||
  !formValues.phone ||
  !/^[0-9]{10}$/.test(formValues.phone) ||
  !formValues.company ||
  !formValues.address;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleError = () => {
    const addContactErrTemp = {...addContactErr}
    Object.entries(formValues).map(([field, value])=>{
      if(!value) addContactErrTemp[field] = `${field.toLowerCase()} is requied`
      else delete addContactErrTemp[field]
    })    
    setAddContactErr(addContactErrTemp)
  }

  const handleSaveClick = () => {
    if(!isSaveDisabled){
      onSave(formValues);
      setFormValues({ firstName: '', email: '', phone: '', company: '', address: '' });
      onClose();
    }
  };

  const handleCancelClick = () => {
    setFormValues({ firstName: '', email: '', phone: '', company: '', address: '' });
    onClose();
  };

  useEffect(()=>{
    setSaveDisable(isSaveDisabled)
  },[formValues])

  return (
    <Dialog open={open} onClose={handleCancelClick}>
      <DialogTitle style={{marginBottom:'10px'}}>Add Person</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          value={formValues.firstName}
          onChange={handleFormChange}
          fullWidth
          required
          inputProps={{ maxLength: 25 }}
          error={formValues.firstName && !/^[a-zA-Z ]{1,25}$/.test(formValues.firstName) || addContactErr.firstName}
          helperText={formValues.firstName && !/^[a-zA-Z ]{1,25}$/.test(formValues.firstName) ? 'No special characters allowed' : '' || addContactErr.firstName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleFormChange}
          fullWidth
          required
          inputProps={{ maxLength: 25 }}
          error={formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) || addContactErr.email}
          helperText={formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) ? 'Invalid email format' : '' || addContactErr.email}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          value={formValues.phone}
          onChange={handleFormChange}
          fullWidth
          required
          inputProps={{ maxLength: 10 }}
          error={formValues.phone && !/^[0-9]{10}$/.test(formValues.phone) || addContactErr.phone}
          helperText={formValues.phone && !/^[0-9]{10}$/.test(formValues.phone) ? 'Only 10-digit numbers allowed' : '' || addContactErr.phone}
        />
        <TextField
          margin="dense"
          name="company"
          label="Company"
          fullWidth
          value={formValues.company}
          onChange={handleFormChange}
          error={addContactErr.company}
          helperText={addContactErr.company}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          fullWidth
          value={formValues.address}
          onChange={handleFormChange}
          error={addContactErr.address}
          helperText={addContactErr.address}
        />
        
       
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancel</Button>
        <p onClick={()=>handleError()}><Button disabled={saveDiable} onClick={handleSaveClick}>Save</Button></p>
      </DialogActions>
    </Dialog>
  );
}

export default ConactsAddDialog