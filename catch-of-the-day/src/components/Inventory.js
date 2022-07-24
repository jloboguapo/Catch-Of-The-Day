import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './addFishForm';
import EditFishForm from './EditFishForm';

const Inventory = ({ addFish, loadSampleFishes, fishes, updateFish }) => (
  <div className="inventory">
    <h2>Inventory</h2>
    {Object.keys(fishes).map(key => (
      <EditFishForm
        key={key}
        index={key}
        fish={fishes[key]}
        updateFish={updateFish}
      />
    ))}
    <AddFishForm addFish={addFish} />
    <button type="submit" onClick={loadSampleFishes}>
      Load Sample
    </button>
  </div>
);
Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
};

export default Inventory;
