import React from 'react'
import "./navigationbar.css"
import x from "../../assets/images/x.svg"

const Navigationbar = ({ setNavigationOpen, navigationOpen, setLoginState, setIsLogout, setIsResetPassword }) => {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
  return (
    <div className={`navigationContainer ${navigationOpen ? "open" : ""}`}>


      <div className="menuHeader">
        <h2>Menu</h2>
        <button className='menuCloseBtn' onClick={() => setNavigationOpen(false)}><img src={x} /></button>
      </div>

      <div className="allMenus">
        <div className="menu">Products</div>
        <div className="menu">Pricing</div>
        <div className="menu">Integrations</div>
        <div className="menu">Customers</div>
        <div className="menu">Resources</div>

        <div className='authMenus'>
          {!loginInfo && <div className="authMenuBtn" onClick={() => {
            setLoginState("login")
            setNavigationOpen(false)
          }}>Login</div>}
          {!loginInfo && <div className="authMenuBtn"
            onClick={() => {
              setLoginState("register")
              setNavigationOpen(false)
            }}>Sign up free</div>}

          {loginInfo &&
            <>
              <div className="authMenuBtn"
                onClick={() => {
                  setLoginState("reset-password")
                  setNavigationOpen(false)
                  setIsResetPassword(true);
                }}>Reset Password</div>
              <div className="authMenuBtn"
                onClick={() => {
                  setLoginState("")
                  setNavigationOpen(false)
                  setIsLogout(true);
                }}>Logout</div>
            </>}
        </div>
      </div>



    </div >
  )
}

export default Navigationbar