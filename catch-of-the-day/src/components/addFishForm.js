import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const AddFishForm = ({ addFish }) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const statusRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const createFish = e => {
    e.preventDefault();
    const { value } = priceRef.current;
    const fish = {
      name: nameRef.current.value,
      price: !Number.isNaN(Number(value)) ? parseFloat(value) : value,
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    };
    if (typeof fish.price === 'string') {
      alert('Price must be a number');
    } else if (!fish.name || Number.isNaN(fish.price)) {
      alert('Fish needs both name and price');
    } else {
      addFish(fish);
      e.currentTarget.reset();
    }
  };

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />
      <input name="price" ref={priceRef} type="text" placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Desc" />
      <input name="image" ref={imageRef} type="text" placeholder="Image" />
      <button type="submit">+ Add Fish</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired,
};

export default AddFishForm;
