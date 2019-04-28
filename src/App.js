import React from 'react';
import Login from './components/Login';
import ExchangeRate from './components/ExchangeRate';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/"  component={ExchangeRate} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
