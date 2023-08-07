import css from './FormAddContacts.module.css';
import { nanoid } from 'nanoid';
import {  useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';


export const FormAddContacts = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(state => state.contactsState.contacts.items);
  const dispatch = useDispatch();

  const inputChange = e => {
    e.target.name === 'name' && setName(e.target.value);
    e.target.name === 'phone' && setPhone(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    } else {
    
      dispatch(addContact({ id: nanoid(), name: name, phone: phone, 
        createdAt: new Date()  }));
      // dispatch(addContact({ id: nanoid(), name: name, phone: phone }));
    }
    
    setName('');
    setPhone('');
  };

  const idNameInput = nanoid();
  const idNumberInput = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={idNameInput}>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        pattern="^[A-Za-z\u0080-\uFFFF ']+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={idNameInput}
        onChange={inputChange}
        required
      />

      <label htmlFor={idNumberInput}>Phone</label>
      <input
        type="tel"
        name="phone"
        value={phone}
        pattern="^(\+?[0-9.\(\)\-\s]*)$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={idNumberInput}
        onChange={inputChange}
        required
      />

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

FormAddContacts.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  addContacts: PropTypes.func,
};

