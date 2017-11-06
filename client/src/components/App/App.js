import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import './App.css';

const App = () => (
  <Router>
    <Route path="/" exact component={Landing} />
  </Router>
);

export default App;
