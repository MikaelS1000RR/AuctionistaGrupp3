import { useState, useEffect, createContext } from 'react'
import logo from './logo.svg'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Navbarr from './components/NavbarComponent';
import Sidebar from './Sidebar';
import { useGlobal } from './contexts/UserContextProvider';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ProductList from './routes/ProductList';
import Upload from './routes/Upload';
import ProductDetail from './routes/ProductDetail'

export const LoggedIn = createContext();

function App() {

  return (
    
    <Router>
    <div className="App">
    <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
            <Route exact path="/products" component={ProductList}/>
          <Route exact path="/upload" component={Upload}/>
            <Route exact path="/productDetail/:id" component={ProductDetail}/>
        </Switch>
      </div>
      
      </div>
      </Router>
  )
}

export default App
