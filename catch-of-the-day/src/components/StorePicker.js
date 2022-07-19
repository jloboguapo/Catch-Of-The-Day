import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const StorePicker = ({ onStoreChange, storeId }) => {
  const myInput = useRef();
  const navigate = useNavigate();

  const goToStore = e => {
    const store = myInput.current.value;
    e.preventDefault();
    onStoreChange(store);
    navigate(`/store/${store}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter a store</h2>
      <input
        type="text"
        ref={myInput}
        required
        placeholder="Store Name"
        defaultValue={storeId}
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
