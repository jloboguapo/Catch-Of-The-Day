import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

const App = () => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  const addFish = fish => {
    fishes[`fish${Date.now()}`] = fish;
    setFishes({ ...fishes });
  };

  const loadSampleFishes = () => {
    setFishes({ fishes: sampleFishes });
  };

  const fishies = fishes.fishes;

  const addToOrder = key => {
    order[key] = order[key] + 1 || 1;
    setOrder({ ...order });
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {!isEmpty(fishes) &&
            Object.keys(fishies).map(key => (
              <Fish
                key={key}
                index={key}
                details={fishies[key]}
                addToOrder={addToOrder}
              />
            ))}
        </ul>
      </div>
      <Order />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />
    </div>
  );
};

export default App;
