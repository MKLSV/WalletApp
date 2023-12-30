import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.scss';
import RootCmp from './root-cmp';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RootCmp />
    </Router>
  </React.StrictMode>
);