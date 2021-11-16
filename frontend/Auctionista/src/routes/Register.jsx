import React, { useState } from 'react'
import { useHistory } from 'react-router'
import SearchiconLogo from '../assets/icons/SearchiconLogo.svg';
import MoneyiconLogo from '../assets/icons/MoneyiconLogo.svg';
import PackageiconLogo from '../assets/icons/PackageiconLogo.svg';
import '../css/Register.css';
import swal from 'sweetalert';

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
      swal("Error", "User already exists ", "error");
    } else {

      swal("Success", "Your account has been registered!", "success");
      setTimeout(() => {
        
        history.push("/login")  // push to product page
      }, 1000);
    
    }


  }

  return (
    <div className="registercontainer">
      <h1 className="registertitle">Register</h1>
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
      <form onSubmit={register}>
        <div className="fieldwrap">
          <input
            className="field"
            type="text"
            placeholder="username"
            required="required"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="field"
            type="email"
            placeholder="email"
            required="required"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="field"
            type="password"
            placeholder="password"
            required="required"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <hr className="line"/>
        <div className="centerwrap">
          <button className="registerbtn">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
