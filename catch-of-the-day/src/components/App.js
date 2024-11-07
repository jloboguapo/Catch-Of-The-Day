import { onValue, ref, update } from 'firebase/database';
import isEmpty from 'lodash.isempty';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Fish from './Fish';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import base from '../base';
import sampleFishes from '../sample-fishes';

const App = () => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();
  const fishRef = ref(base, `${storeId}/fishes`);
  const storeRef = ref(base, `${storeId}/storeId`);

  useEffect(() => {
    !isEmpty(fishes) &&
      update(storeRef, { store: window.location.pathname.slice(7) });
  }, [fishes]);

  useEffect(() => {
    onValue(fishRef, data => {
      data.val() && setFishes(data.val());
    });
  }, []);

  useEffect(() => {
    update(fishRef, fishes);
  }, [fishes]);

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

  const removeFromOrder = key => {
    order[key] > 0 && (order[key] -= 1);
    setOrder({ ...order });
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {fishes &&
            Object.keys(fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={fishes[key]}
                addToOrder={addToOrder}
                removeFromOrder={removeFromOrder}
                order={order}
              />
            ))}
        </ul>
      </div>
      <Order fishes={fishes} order={order} />
      <Inventory
        addFish={addFish}
        fishes={fishes}
        loadSampleFishes={loadSampleFishes}
      />
    </div>
  );
};

export default App;
