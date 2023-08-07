import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.contactsState.contacts.items;
const selectFilter = state => state.contactsState.filter;
// const selectFilter = state => state.filterState.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts; // Повернути всі контакти, якщо фільтр не вибраний
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
