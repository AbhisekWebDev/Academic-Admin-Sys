import React, { useState } from 'react'
import './HomePage.css'
import AAAlogo from './assets/AAAlogo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function HomePage() {

    const navigate = useNavigate();

    // form ka state - userRegister
    const [registerData, setRegisterData] = useState({
      name: '',
      email: '',
      role: '',
      password: ''
    })

    // form ka state - userLogin
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    })

    const handleRegister = async (e) => {
        e.preventDefault();

        // add actual validation or API calls here
        try {
          const res = await axios.post('http://localhost:5000/api/user/userRegister', registerData)
          console.log('Registration Success:', res.data)
          alert('Registration Successful!')
          navigate('/selection') // redirect user after successful registration
        }catch (err) {
          console.error(err.response?.data || err.message)
          alert(`Registration failed: ${err.response?.data}`)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        // add authentication logic here
        try {
          const res = await axios.post('http://localhost:5000/api/user/userLogin', loginData);
          console.log('Login Success:', res.data)

          // Store token in localStorage
          localStorage.setItem('token', res.data.token);
          alert('Login Successful!')
          navigate('/selection') // redirect user after successful logn
        } catch (err) {
          console.error(err.response?.data || err.message);
          alert(`Login failed: ${err.response?.data}`);
        }
    }

  return (
    <div className="homeContainer">
      {/* <img src={AAAlogo} alt="AAA Logo" className="logo" /> */}
      <header className="aaa-navbar">
      <div className="aaa-navbar-content">
        <img src={AAAlogo} alt="AAA Logo" className="aaa-logo" />
        <h1 className="aaa-title">Academic and Administrative System</h1>
      </div>
    </header>

      <h1 className="mainTitle">System Registration/Login</h1>

      <div className="authContainer">

        {/* registration pasrt */}
        <div className="authBox registerBox">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={registerData.name} 
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required 
            />
            <input 
            type="email" 
            placeholder="Email" 
            value={registerData.email} 
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
            />
            <input 
            type="text" 
            placeholder="Role" 
            value={registerData.role} 
            onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
            required 
            />
            <input 
            type="password" 
            placeholder="Password" 
            value={registerData.password} 
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required 
            />
            <button type="submit">Register</button>
          </form>
        </div>

        {/* login part */}
        <div className="authBox loginBox">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
            type="email" 
            placeholder="Email" 
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required 
            />
            <input 
            type="password" 
            placeholder="Password" 
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required 
            />
            <button type="submit">Login</button>
            <p style={{textAlign:'right'}}>Already an user? <br/> Try logging in</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
