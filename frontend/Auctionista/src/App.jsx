import { useState, useEffect, createContext } from 'react'
import logo from './logo.svg'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Products from './routes/Products';
import Upload from './routes/Upload';

export const LoggedIn = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function updateContext(update) {
    setIsLoggedIn({
      isLoggedIn
    })
  }
  const [user, setUser] = useState('');
  
  useEffect(() => {
    if (user == '') {
      whoAmI();
    }
  }, [])

  const values = {
    user
  }
  const whoAmI = async () => {
    let res = await fetch('/api/whoami')
    try {
      let user = await res.json()
      console.log(user, "this is user")
      setUser(user)
    } catch {
      console.log('Not logged in')
    }
    console.log(isLoggedIn)
  }
  return (
    <LoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
    <Router>
    <div className="App">
        <Navbar user={user}/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/products" component={Products}/>
          <Route exact path="/upload" component={Upload}/>
        </Switch>
      </div>
      
      </div>
      </Router>
    </LoggedIn.Provider>
  )
}

export default App
