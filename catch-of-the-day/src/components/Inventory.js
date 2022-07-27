import React, { useEffect, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import AddFishForm from './addFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { auth } from '../base';
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
  const ownerRef = ref(base, `${storeId}/owner`);

  const authHandler = async authData => {
    await onValue(ownerRef, data => {
      data.val()
        ? setStoreOwner({
            uid: authData.user.uid,
            owner: Object.values(data.val())[0],
          })
        : set(ownerRef, { owner: authData.user.uid });
    });
  };

  const authenticate = provider => {
    const authProvider = new (
      `${provider}AuthProvider`.includes('Google')
        ? GoogleAuthProvider
        : GithubAuthProvider
    )();
    signInWithPopup(auth, authProvider).then(authHandler);
  };

  const loggingOut = async () => {
    await signOut(auth);
    setStoreOwner({ uid: null });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => user && authHandler({ user }));
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
