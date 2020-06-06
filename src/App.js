import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, withRouter, Route, Switch} from "react-router-dom"
import Home from "../src/screens/Home"
import Entry from "../src/screens/Entry"
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/entry" component = {Entry} />
        </Switch>
      </Router>
  );
}

export default App;
