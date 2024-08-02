
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
      <App/>
  </BrowserRouter>
</React.StrictMode>,
)
