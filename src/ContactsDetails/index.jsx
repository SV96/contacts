import { Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import './index.scss'
import { avatarColors } from '../Constant';


const ContactsDetails=({ selectContact })=> {
  const { firstName, email, phone, company, address, idx } = selectContact;
  const details =  {'Full Name':firstName, 'Email': email, 'Phone': phone, 'Company' : company, 'Address': address}
  if(!firstName) return null
  return (
    <Paper className='paperContact'>
      <div className='paperHeader'>
          <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor:avatarColors[idx % avatarColors.length]  }}>{firstName?.charAt(0)}</Avatar>
          <p><b>{firstName}</b></p>
          <p >{company}</p>
      </div>
      <div className='paperDetails'>
        <div className='paperLabel'>
          {Object.keys(details).map((value, index)=>{
            return  <p key={index}>{value}:</p>
          })}
        </div>
        <div className='paperLabel paperValues'>
          {Object.values(details).map((value, index)=>{
            return  <p key={index}><b>{value}</b></p>
          })}
        </div>
      </div>
     
    </Paper>
  );
}

export default ContactsDetails