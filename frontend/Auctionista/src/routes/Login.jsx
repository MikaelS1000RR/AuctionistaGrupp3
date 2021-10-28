import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { UserContext } from '../contexts/UserContextProvider'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedIn);
  let history = useHistory();
  const { userName, email } = useContext(UserContext);

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
      setIsLoggedIn(true);
      console.log(user);
      
    } catch (error) {
      console.log('something went wrong')
    }
    console.log(response.status,"response.status");
    console.log(response,"response");

    if (response.status == 403) {
      console.log('Wrong username/password');
    }
    history.push("/")
    // window.location.reload();
  }

  return (
    <div>
      <h1>Login</h1>
      <h1>{isLoggedIn}</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          required="required"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          required="required"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button>login</button>
      </form>
      <h1>{ userName }</h1>
      <h1>{ email }</h1>
    </div>
  )
}

export default Login
