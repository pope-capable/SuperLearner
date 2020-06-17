import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, withRouter, Route, Switch} from "react-router-dom"
import Home from "../src/screens/Home"
import Entry from "../src/screens/Entry"
import Dashboard from "../src/screens/Projects"
import './App.css';
import reducer from './utils/reducer'
import { AuthenticationContext } from "../src/utils/reducer";


const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthenticationContext.Provider value={{state,  dispatch}}    >
      <Router>
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/entry" component = {Entry} />
            <Route exact path = "/dashboard" component = {Dashboard} />
          </Switch>
        </Router>
      </AuthenticationContext.Provider>
  );
}

export default App;
