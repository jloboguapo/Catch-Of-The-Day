import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './addFishForm';

const Inventory = ({ addFish, loadSampleFishes }) => (
  <div className="inventory">
    <h2>Inventory!!!</h2>
    <AddFishForm addFish={addFish} />
    <button type="submit" onClick={loadSampleFishes}>
      Load Sample
    </button>
  </div>
);

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
};

export default Inventory;
