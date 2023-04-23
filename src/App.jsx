import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import Sidebar from './Sidebar';
import ContactsView from './Contacts';
import ContactsDetails from './ContactsDetails';
import ConactsAddDialog from './ConactsAdd';
import './app.scss';

import { allContacts } from './Constant';

const App = () => {
  const [contacts, setContacts] = useState(allContacts);
  const [selectContact, setSelectedContact] = useState({
    ...contacts[0],
    idx: 0,
  });

  const [formValues, setFormValues] = useState({
    firstName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });
  const [addContactErr, setAddContactErr] = useState({});
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const onClose = () => {
    setOpen(false);
    setFormValues({
      firstName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
    });
    setAddContactErr({});
  };

  const onSave = () => {
    let contactsTemp = [];
    if (!formValues.hasOwnProperty('idx')) {
      contactsTemp = [...contacts, formValues];
    } else {
      contacts[formValues.idx] = formValues;
      contactsTemp = [...contacts];
    }
    setContacts(contactsTemp);
    window.localStorage.setItem('allContacts', JSON.stringify(contactsTemp));
    onClose();
  };

  const handleSelectContact = (idx) => {
    idx >=0 ? setSelectedContact({ ...contacts[idx], idx: idx }) : setSelectedContact({})
  };

  window.localStorage.setItem('allContacts', JSON.stringify(allContacts));

  return (
    <>
      <div className={`container ${isMobile ? 'mobileZoom' : 'cntBgColor'}`}>
        {!isMobile ? (
          <div className='l-navbar' id='nav-bar'>
            <Sidebar />
          </div>
        ) : null}

        <div className={`${!isMobile && 'main'}`}>
          <div className='contacts'>
            <ContactsView
              contacts={contacts}
              setContacts={setContacts}
              handleSelectContact={handleSelectContact}
              setOpen={setOpen}
              setFormValues={setFormValues}
              isMobile={isMobile}
            />
          </div>
          {!isMobile ? (
            <div className='edit-contacts'>
              <ContactsDetails selectContact={selectContact} />
            </div>
          ) : null}
        </div>
      </div>
      <ConactsAddDialog
        open={open}
        setOpen={setOpen}
        formValues={formValues}
        setFormValues={setFormValues}
        onClose={onClose}
        onSave={onSave}
        addContactErr={addContactErr}
        setAddContactErr={setAddContactErr}
      />
    </>
  );
};

export default App;
