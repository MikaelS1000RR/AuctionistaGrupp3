import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();


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

    let user = await response.json()

    console.log(user);

    if (response.status == 403) {
      console.log('Wrong username/password');
    }
    history.push("/")
    window.location.reload();
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          required="re"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button>login</button>
      </form>
    </div>
  )
}

export default Login
