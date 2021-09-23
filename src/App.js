import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Scanner from './components/Scanner';
import Login from './components/Login';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={Scanner} path="/scanner" />
          <Route component={Login} path="/" />
        </Switch>
      </Router>
    </div>
  );
}
