import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { fromfilter } from 'redux/contactSlice';


export const Filter = ({ valueFilter }) => {
  const dispatch = useDispatch();
  const changeFilter = event => {
    dispatch(fromfilter(event.target.value));
  };
  return (
    <input
      type="text"
      name="filter"
      className={css.filterInput}
      value={valueFilter}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      onChange={changeFilter}
    />
  );
};

Filter.propTypes = {
  valueFilter: PropTypes.string,
  changeFilter: PropTypes.func,
};
