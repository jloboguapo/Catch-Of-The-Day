import React from 'react';
import { createRoot } from 'react-dom/client';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';

createRoot(document.querySelector('#main')).render(<App />);
