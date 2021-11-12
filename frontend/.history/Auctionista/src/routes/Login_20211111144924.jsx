import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { useGlobal } from '../contexts/UserContextProvider'
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
      setIsLoggedIn(true);
      console.log(user);
      await whoAmI();
      history.push("/")
      
    } catch (error) {
      console.log('something went wrong')
    }
    console.log(response.status,"response.status");
    console.log(response,"response");

    if(res.status == 403) {
      swal("Error", "User already exists ", "error");
      console.log('User already Exist');
    } else {

      swal("Success", "Your account has been registered!", "success");
      setTimeout(() => {
        
        history.push("/login")  // push to product page
      }, 1000);
    
    }
    
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