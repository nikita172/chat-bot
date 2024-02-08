import React, { useRef } from 'react';
import axios from "axios";
import x from "../../assets/images/x.svg"
import { toast } from 'react-toastify';
const Register = ({ setLoginState, setChatId, chatId, reset, setReset }) => {
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
      const data = await axios.post(`${apiUrl}/admin/register`, obj)
      if (data.data.status) {
        localStorage.setItem('loginInfo', JSON.stringify(data.data.admin._id))
        const res = {
          userId: data.data.admin._id,
          adminId: "65bc9457e5434f76dd38938d"
        }
        const result = await axios.post(`${apiUrl}/api/chat`, res)
        setChatId(result.data._id);
        toast.success("Registration successful!")
        setLoginState("");
        setReset(!reset)

      } else {
        toast.error(data.data.message)
      }

    }
    catch (err) {
      // toast.success(data.data.message)
      console.log(err)
      setLoginState("");
      setReset(!reset)
    }
  }
  return (
    <div className='loginContainer'>
      <div className="loginContainerLeft">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className='registerHeading'>
            <h2 className='loginHeading'>Welcome! <br />Register your account</h2>
            <button
              className='registerCloseBtn'
              onClick={() => setLoginState("")}
              type='button'
            >
              <img src={x} className='registerCloseIcon'
              />
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
                Register
              </button>
              <span className='navigateToLogin'>Already have an account? <span
                className='anchorTag'
                onClick={() => setLoginState("login")}>Login</span></span>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register