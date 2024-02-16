import React, { useRef, useState } from 'react';
import x from "../../assets/images/x.svg"
import { toast } from 'react-toastify';
import axios from "axios";
const ResetPassword = ({ setIsResetPassword, setLoginState, reset, setReset }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false)
  const username = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      username: username.current.value,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    }
    try {
      setLoading(true);
      const data = await axios.post(`${apiUrl}/user/reset/password`, obj)
      if (data.data.status) {
        toast.success("Password reset successfully!")
        setLoginState("");
        setReset(!reset)
      } else {
        toast.error(data.data.message)
      }
      setLoading(false);

    }
    catch (err) {
      console.log(err)
      setLoginState("");
      setReset(!reset)
      setLoading(false);
    }
  }

  return (
    <div className='loginContainer'>
      <div className="loginContainerLeft">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className='registerHeading'>
            <h2 className='loginHeading'>Reset your password</h2>
            <button
              className='registerCloseBtn'
              onClick={() => {
                setLoginState("")
                setIsResetPassword(false);
              }
              }
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
              <input className='registerInput' type="password" required name="password" placeholder="Old password"
                autoComplete='off' ref={oldPassword} />
            </div>
            <div className="inputGroup inputPassword">
              <input className='registerInput' type="password" required name="password" placeholder="New password"
                autoComplete='off' ref={newPassword} />
            </div>
            <div className="buttonGroup">
              <button type="submit" className="primary" id="loginBtn" >
                {loading ? 'Loading...' : 'Reset'}
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ResetPassword