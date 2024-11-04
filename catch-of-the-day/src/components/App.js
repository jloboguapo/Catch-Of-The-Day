import React, { useState } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

const App = () => {
  const [fishes, setFishes] = useState({});

  const addFish = fish => {
    fishes[`fish${Date.now()}`] = fish;
    setFishes({ ...fishes });
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory addFish={addFish} fishes={fishes} />
    </div>
  );
};

export default App;
