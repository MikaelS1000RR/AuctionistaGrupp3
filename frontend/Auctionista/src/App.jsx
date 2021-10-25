import { useState } from 'react'
import logo from './logo.svg'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
      
      </div>
    </Router>
  )
}

export default App
