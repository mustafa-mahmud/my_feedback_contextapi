import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextAPIProvider from './context/ContextAPI';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextAPIProvider>
    <App />
  </ContextAPIProvider>
);
