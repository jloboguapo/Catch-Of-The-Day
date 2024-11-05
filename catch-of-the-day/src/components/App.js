import React, { useState } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

const App = () => {
  const [fishes, setFishes] = useState({});

  const addFish = fish => {
    fishes[`fish${Date.now()}`] = fish;
    setFishes({ ...fishes });
  };

  const loadSampleFishes = () => {
    setFishes({ ...sampleFishes });
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory
        addFish={addFish}
        fishes={fishes}
        loadSampleFishes={loadSampleFishes}
      />
    </div>
  );
};

export default App;
