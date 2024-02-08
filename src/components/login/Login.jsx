import React, { useRef } from 'react';
import x from "../../assets/images/x.svg"
import "./login.css";
import axios from "axios";
import { toast } from 'react-toastify';
const Login = ({ setLoginState, setChatId, setReset, reset }) => {
  const username = useRef();
  const password = useRef();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      username: username.current.value,
      password: password.current.value,
      userType: "User"
    }
    try {
      const data = await axios.post(`${apiUrl}/admin/login`, obj)
      if (data.data.status) {
        localStorage.setItem('loginInfo', JSON.stringify(data.data.user._id))
        toast.success("Login successful!")
        setLoginState("");
        setReset(!reset)
      } else {
        toast.error(data.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='loginContainer'>
      <div className="loginContainerLeft">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className='registerHeading'>
            <h2 className='loginHeading'>Welcome! <br />Sign into your account</h2>
            <button
              type="button"
              className='registerCloseBtn'
              onClick={() => setLoginState("")}
            >
              <img src={x} className='registerCloseIcon' />
            </button>

          </div>
          <div className="registerInputsCont">
            <div className="inputGroup inputEmail">
              <input className='registerInput' type="text" name="username" required placeholder="Username" autoComplete='off' ref={username} />
            </div>
            <div className="inputGroup inputPassword">
              <input className='registerInput' type="password" required name="password" placeholder="Password"
                autoComplete='off' ref={password} />
            </div>
            <div className="buttonGroup">
              <button type="submit" className="primary" id="loginBtn" >
                Login
              </button>
              <span className='navigateToLogin'>New user? <span
                onClick={() => setLoginState("register")}
                className='anchorTag' >Register</span></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login