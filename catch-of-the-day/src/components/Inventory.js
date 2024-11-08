import PropTypes from 'prop-types';
import React from 'react';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = ({
  addFish,
  loadSampleFishes,
  fishes,
  updateFish,
  deleteFish,
}) => {
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {Object.keys(fishes).map(key => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};

export default Inventory;
