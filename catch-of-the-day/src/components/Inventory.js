import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './addFishForm';

const Inventory = ({ addFish }) => (
  <div className="inventory">
    <h2>Inventory!!!</h2>
    <AddFishForm addFish={addFish} />{' '}
  </div>
);

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
};

export default Inventory;
