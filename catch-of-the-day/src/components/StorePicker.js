import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getFunName } from '../helpers';

const StorePicker = () => {
  const myInput = useRef();
  const navigate = useNavigate();

  const goToStore = e => {
    const newStore = myInput.current.value;
    e.preventDefault();
    navigate(`/store/${newStore}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        ref={myInput}
        placeholder="Store Name"
        required
        defaultValue={getFunName()}
      />
      <button type="submit">Visit Store</button>
    </form>
  );
};

export default StorePicker;
