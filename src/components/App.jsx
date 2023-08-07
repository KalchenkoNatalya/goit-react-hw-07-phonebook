import { FormAddContacts } from './FormAddContacts/FormAddContacts';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';

import css from './App.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { deleteContact, fetchContacnts } from 'redux/operations';

export const App = () => {
  const contacts = useSelector(state => state.contactsState.contacts.items);
  const filter = useSelector(state => state.contactsState.filter);
  const filteredContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacnts());
  }, [dispatch]);
  return (
    <div className={css.wrap}>
      <h2>Phonebook</h2>
      <FormAddContacts  />
     
      <h2>Find contacts by name</h2>
      <Filter valueFilter={filter} />

      <h2>Contacts</h2>
      {filter === '' ? (
        <ContactList
          contacts={contacts}
          onRemoveContacts={contactId => dispatch(deleteContact(contactId))}
         
        />
      ) : (
        <ContactList contacts={filteredContacts} />
      )}
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  filterChange: PropTypes.func,
  addContacts: PropTypes.func,
  onRemoveContacts: PropTypes.func,
};
