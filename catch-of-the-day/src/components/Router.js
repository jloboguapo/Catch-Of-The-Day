import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import NotFound from './NotFound';
import StorePicker from './StorePicker';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={StorePicker} />
      <Route path="/store/:storeId" Component={App} />
      <Route Component={NotFound} />
    </Routes>
  </BrowserRouter>
);

export default Router;
