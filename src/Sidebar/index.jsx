import React from 'react';

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


import './Sidebar.scss';


const Sidebar = () => {
  return (
     <nav className="nav">
            <div> <a href="#" className="nav_logo first"><TextureOutlinedIcon /> </a> </div>
            <div> <a href="#" className="nav_logo"><Person2OutlinedIcon /> </a> </div> 
            <div> <a href="#" className="nav_logo"><ImportContactsIcon /> </a> </div> 
            <div> <a href="#" className="nav_logo"><HomeMaxIcon /> </a> </div> 
            <div> <a href="#" className="nav_logo"><MailOutlineIcon /> </a> </div> 
        </nav>
  );
};

export default Sidebar;
