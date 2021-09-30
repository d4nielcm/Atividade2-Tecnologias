import React from 'react';
import { Switch } from 'react-router-dom';

import Form from '../pages/Form';
import Home from '../pages/Home';
import List from '../pages/List';
import Route from './Route';


export default function Routes() {
  return (
    <Switch>
      <Route path="/formulario">
        <Form />
      </Route>
      <Route path="/formulario/:id">
        <Form />
      </Route>
      <Route path="/listagem">
        <List />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}