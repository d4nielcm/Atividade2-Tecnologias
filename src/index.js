import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavbarApp from './NavbarApp';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

ReactDOM.render(
  <React.StrictMode>
    <NavbarApp />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
