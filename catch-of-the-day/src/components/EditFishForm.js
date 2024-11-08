import PropTypes from 'prop-types';
import React from 'react';

const EditFishForm = ({ fish, index, updateFish, deleteFish }) => {
  const { name, price, status, desc, image } = fish;

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    const updatedFish = {
      ...fish,
      [name]: name === 'status' ? value === 'true' : value,
    };
    updateFish(index, updatedFish);
  };

  return (
    <div className="fish-edit">
      <input type="text" name="name" onChange={handleChange} value={name} />
      <input type="text" name="price" onChange={handleChange} value={price} />
      <select type="text" name="status" onChange={handleChange} value={status}>
        <option value>Fresh!</option>
        <option value={false}>Sold Out</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={desc} />
      <input type="text" name="image" onChange={handleChange} value={image} />
      <button type="submit" onClick={() => deleteFish(index)}>
        Remove Fish
      </button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};

export default EditFishForm;
