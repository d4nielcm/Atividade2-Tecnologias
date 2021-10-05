import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import history from './services/history';

import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
