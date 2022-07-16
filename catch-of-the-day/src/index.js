import React from 'react';
import { createRoot } from 'react-dom/client';
import StorePicker from './components/StorePicker';
import App from './components/App';
import './css/style.css';

createRoot(document.querySelector('#main')).render(<App />);
