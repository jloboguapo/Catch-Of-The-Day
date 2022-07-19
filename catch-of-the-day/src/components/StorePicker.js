import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getFunName } from '../helpers';

const StorePicker = ({ onStoreChange, storeId }) => {
  const myInput = useRef();
  const navigate = useNavigate();

  const goToStore = e => {
    e.preventDefault();
    onStoreChange(myInput.current.value);
    navigate(`/store/${myInput.current.value}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter a store</h2>
      <input
        type="text"
        ref={myInput}
        required
        placeholder="Store Name"
        defaultValue={storeId || getFunName()}
      />
      <button type="submit">Visit Store →</button>
    </form>
  );
};

StorePicker.propTypes = {
  onStoreChange: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default StorePicker;
