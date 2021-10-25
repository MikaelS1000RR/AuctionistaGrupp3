import React, { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const register = async (e) => {
    e.preventDefault()

    const credentials = {
      username,
      password,
      email
    }

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    console.log(credentials);

  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
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
