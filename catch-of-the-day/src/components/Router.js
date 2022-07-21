import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';
import { getFunName } from '../helpers';

const Router = () => {
  const [storeId, setStoreId] = useState(getFunName());

  const handlePathChange = () => {
    const { pathname } = window.location;
    pathname.includes('store') && setStoreId(pathname.slice(7));
  };

  useEffect(() => {
    window.addEventListener('submit', handlePathChange);
    return () => {
      window.removeEventListener('submit', handlePathChange);
    };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StorePicker storeId={storeId} />} />
        <Route path="/store/:storeId" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
