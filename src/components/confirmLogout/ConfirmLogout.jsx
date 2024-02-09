import React from 'react';
import x from "../../assets/images/x.svg"
const ConfirmLogout = ({ setReset, reset, setIsLogout }) => {
  const logoutHandler = () => {
    localStorage.clear();
    setReset(!reset);
    setIsLogout(false);
  }
  const cancelLogoutHandler = () => {
    setReset(!reset);
    setIsLogout(false);
  }

  return (
    <div className='loginContainer'>
      <div className="loginContainerLeft">
        <form id="loginForm">
          <div className='registerHeading'>
            <h2 className='loginHeading'>Are you sure <br />you want to logout?</h2>
            <button
              type="button"
              className='registerCloseBtn'
              onClick={cancelLogoutHandler}
            >
              <img src={x} className='registerCloseIcon' />
            </button>
          </div>
          <div className="registerInputsCont">
            <div className="buttonGroup">
              <button type="button" style={{ backgroundColor: "var(--red)", color: "white", border: "1px solid var(--red", borderRadius: "0px" }}
                onClick={logoutHandler} >
                Logout
              </button>
              <button type="button" className="primary" id="loginBtn"
                style={{ borderRadius: "0px", backgroundColor: "white", border: "1px solid blue", color: "blue" }}
                onClick={cancelLogoutHandler}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmLogout