import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';

import './index.scss'
import { avatarColors } from '../Constant';


const ContactsView = ({ contacts, setContacts, handleSelectContact, setOpen, setFormValues, isMobile }) => {
  
  const searchUser = (e) => {
    const { value } = e.target
    
    const filteredUsers = contacts.filter(res => res.firstName.toLowerCase().startsWith(value.toLowerCase()));
    if(filteredUsers)  { 
      handleSelectContact(0)
      setContacts(filteredUsers) 
    }else {
      handleSelectContact(-1)
    } 
    if(value === '') setContacts(JSON.parse(window.localStorage.getItem('allContacts'))) 
    
  }

  const handleSetEditData = (idx) =>{
    setFormValues({...contacts[idx], idx: idx})
    setOpen(true)
  }

  return (
    <>
      <div className='contactsView'>
        {/* ---------------------------------------------------- Header ---------------------------------------------------- */}
        <div className='contactsHeader'>
          <div>
            <img
              src='https://cdn-icons-png.flaticon.com/512/183/183552.png'
              alt='phobebook icon'
            />
          </div>
          <div className='contactsHeaderContent'>
            <span>
              <b>Contacts</b>
            </span>
            <span>List of all contacts displayed</span>
          </div>
        </div>
        {/* ---------------------------------------------------- Search ---------------------------------------------------- */}
        <div className={`contactSearch ${!isMobile && 'contactPadding'}`}>
          <TextField
            className='custom-text-field'
            id='outlined-basic'
            placeholder='Search Contacts'
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon className='icon-search' />
                </InputAdornment>
              ),
            }}
            onChange={searchUser}
          />
          <Button className={`custom-button ${isMobile && 'custom-button-mobile'}`} variant='contained' onClick={()=>setOpen(true)}>
            <AddIcon />
            Add Contacts
          </Button>
        </div>
        {/* ---------------------------------------------------- Table ---------------------------------------------------- */}
        <div className={`contactTable ${!isMobile && 'contactPadding'}`}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                 
                  <TableCell><AddIcon/></TableCell>
                  <TableCell>Basic info</TableCell>
                  <TableCell>Company</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((row,index) => {
                  const name = `${row.firstName}`;
                  return (
                    <TableRow key={name} onClick={()=>handleSelectContact(index)}>
                      <TableCell>
                        <Checkbox onClick={()=>handleSetEditData(index)}/>
                      </TableCell>
                      <TableCell>
                        <div className='contactRowSecond'> 
                          <Avatar style={{ backgroundColor: avatarColors[index % avatarColors.length] }} >{name.charAt(0)}</Avatar>
                          <div>
                            <div>{name}</div>
                            <div>{row.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{row.company}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ContactsView