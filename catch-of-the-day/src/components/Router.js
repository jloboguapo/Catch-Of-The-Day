import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';
import { getFunName } from '../helpers';

const Router = () => {
  const [storeId, setStoreId] = useState(getFunName());

  const changeStore = newStore => {
    setStoreId(newStore);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <StorePicker storeId={storeId} onStoreChange={changeStore} />
          }
        />
        <Route path="/store/:storeId" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
