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
  const storeRef = base.ref(`${storeId}/storeId`);

  useEffect(() => {
    !isEmpty(fishes) &&
      storeRef.update({ store: window.location.pathname.slice(7) });
  }, [fishes]);

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
    base.ref(`${storeId}/fishes/${key}`).remove();
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
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        updateFish={updateFish}
        deleteFish={deleteFish}
        storeId={storeId}
      />
    </div>
  );
};

export default App;
