import { onValue, ref, remove, update } from 'firebase/database';
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

  useEffect(() => {
    const localStorageRef = localStorage.getItem(storeId);
    localStorageRef && setOrder(JSON.parse(localStorageRef));
  }, [setOrder]);

  useEffect(() => {
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order]);

  const addFish = fish => {
    fishes[`fish${Date.now()}`] = fish;
    setFishes({ ...fishes });
  };

  const updateFish = (key, updatedFish) => {
    fishes[key] = updatedFish;
    setFishes({ ...fishes });
  };

  const deleteFish = key => {
    delete fishes[key];
    remove(ref(base, `${storeId}/fishes/${key}`));
    setFishes(fishes);
    localStorage.removeItem(storeId);
    setOrder({});
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

  const removeEntireItemFromOrder = key => {
    delete order[key];
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
      <Order
        fishes={fishes}
        order={order}
        removeEntireItemFromOrder={removeEntireItemFromOrder}
      />
      <Inventory
        addFish={addFish}
        fishes={fishes}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        storeId={storeId}
      />
    </div>
  );
};

export default App;
