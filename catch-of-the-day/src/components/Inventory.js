import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import PropTypes from 'prop-types';
import AddFishForm from './addFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
import { logout } from '../helpers';

const Inventory = ({
  addFish,
  loadSampleFishes,
  fishes,
  updateFish,
  deleteFish,
  storeId,
}) => {
  const [storeOwner, setStoreOwner] = useState({ uid: null, owner: null });
  const [owner, setOwner] = useState('');

  const authHandler = async authData => {
    const ownerRef = base.ref(`${storeId}/owner`);
    await ownerRef.on('value', data => {
      data.val()
        ? setOwner(Object.values(data.val())[0])
        : ownerRef.set({ owner: authData.user.uid });
    });
    setStoreOwner({
      uid: authData.user.uid,
      owner: owner || authData.user.uid,
    });
  };

  const authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  };

  const loggingOut = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    setStoreOwner({ uid: null });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user && authHandler({ user });
    });
  }, []);

  if (!storeOwner.uid) {
    return <Login authenticate={authenticate} />;
  }
  if (storeOwner.uid !== storeOwner.owner) {
    return (
      <div>
        <p>Sorry, you are not the owner!</p>
        {logout(loggingOut)}
      </div>
    );
  }
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logout(loggingOut)}
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
      <button type="submit" onClick={loadSampleFishes}>
        Load Sample
      </button>
    </div>
  );
};

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default Inventory;
