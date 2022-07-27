import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ref, update } from 'firebase/database';
import base from '../base';

const StorePicker = ({ storeId }) => {
  const myInput = useRef();
  const navigate = useNavigate();

  const goToStore = e => {
    const newStore = myInput.current.value;
    e.preventDefault();
    update(ref(base, `${newStore}/storeId`), { store: newStore });
    navigate(`/store/${newStore}`);
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

StorePicker.propTypes = { storeId: PropTypes.string.isRequired };

export default StorePicker;
