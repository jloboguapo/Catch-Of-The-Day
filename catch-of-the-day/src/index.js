import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router';
import './css/style.css';

createRoot(document.querySelector('#main')).render(<Router />);
