import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFunName } from '../helpers';

const StorePicker = () => {
  const myInput = React.useRef();
  const navigate = useNavigate();

  const goToStore = e => {
    e.preventDefault();
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
        defaultValue={getFunName()}
      />
      <button type="submit">Visit Store →</button>
    </form>
  );
};

export default StorePicker;
