import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SimpleContext } from '@context/SimpleContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
