import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // <-- Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: keep or remove reportWebVitals based on your need
reportWebVitals();
