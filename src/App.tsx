import React from 'react';
import './App.css';

import { Provider } from "react-redux";
import Store from "./redux/store";


import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from "./views/home";
import Detail from "./views/detail";


const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <Router>
        <div id="App">
          <ul id="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/detail">Detail</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
        </div>
      </Router>
    </Provider>
  );
}

export default App
