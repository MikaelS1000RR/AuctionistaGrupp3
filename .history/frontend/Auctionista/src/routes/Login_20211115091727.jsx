import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { useGlobal } from '../contexts/UserContextProvider'
import SearchiconLogo from '../assets/icons/SearchiconLogo.svg';
import MoneyiconLogo from '../assets/icons/MoneyiconLogo.svg';
import PackageiconLogo from '../assets/icons/PackageiconLogo.svg';
import { Link } from 'react-router-dom';
import '../css/Login.css';
import swal from 'sweetalert';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();
  const { userId, userName, email, setUserName, whoAmI, isLoggedIn, setIsLoggedIn } = useGlobal();


  const login = async(e) =>{
    e.preventDefault()

    const credentials = {
      username,
      password
    }

    let response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    try {
      let user = await response.json()
      if(user.status == 200) {
        setIsLoggedIn(true);
        history.push("/") 
      }
      console.log(user);
      await whoAmI();
      if(response.status == 401) {
        swal("Error", "Wrong Credentials ", "error");
      } else { 
        history.push("/") 
      }
    
      
    } catch (error) {
      console.log('something went wrong')
    }
    console.log(response.status,"response.status");
    console.log(response,"response");

    
    
  }

  return (
    <div className="logincontainer">
      <h1 className="logintitle">Login</h1>
      {/* <h1>{isLoggedIn}</h1> */}
      <div className="iconcontainer">
        <div>
          <img src={SearchiconLogo}/>
          <img src={MoneyiconLogo}/>
          <img src={PackageiconLogo}/>
        </div>
      </div>
      <div className="productnamewrap">
        <p className="productname">AUCTIONISTA</p>
      </div>
      <hr className="line"/>
      <form onSubmit={login}>
        <div className="fieldwrap">
          <input
            className="usernamefield field"
            type="text"
            placeholder="username"
            required="required"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="passwordfield field"
            type="password"
            placeholder="password"
            value={password}
            required="required"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <hr className="line"/>
        <div className="centerwrap">
          <button className="loginbtn">Login</button>
        </div>
      </form>
      <div className="centerwrap">
        <p className="notregistered">Not registered?</p>
        <Link to="/register"><p className="register">Register</p></Link>
      </div>
      <h1>{ userName }</h1>
      <h1>{ email }</h1>
    </div>
  )
}

export default Login
