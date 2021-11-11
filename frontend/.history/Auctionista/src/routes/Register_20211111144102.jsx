import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  let history = useHistory();

  const register = async (e) => {
    e.preventDefault()

    const credentials = {
      username,
      password,
      email
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    if(res.status == 403) {
      console.log('User already Exist');
    } else {
      console.log(credentials);
      history.push("/login")
    }


  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          required="required"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          required="required"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          required="required"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
