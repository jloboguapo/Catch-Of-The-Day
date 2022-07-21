import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

const App = () => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();
  const fishRef = base.ref(`${storeId}/fishes`);

  useEffect(() => {
    fishRef.on('value', data => {
      data.val() && setFishes(data.val());
    });
  }, []);

  useEffect(() => {
    fishRef.update(fishes);
  }, [fishes]);

  useEffect(() => {
    const localStorageRef = localStorage.getItem(storeId);
    setOrder(JSON.parse(localStorageRef));
  }, [setOrder]);

  useEffect(() => {
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order]);

  const addFish = fish => {
    fishes[`fish${Date.now()}`] = fish;
    setFishes({ ...fishes });
  };

  const loadSampleFishes = () => {
    setFishes({ ...sampleFishes });
  };

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
            Object.keys(fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={fishes[key]}
                addToOrder={addToOrder}
              />
            ))}
        </ul>
      </div>
      <Order fishes={fishes} order={order} />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />
    </div>
  );
};

export default App;
