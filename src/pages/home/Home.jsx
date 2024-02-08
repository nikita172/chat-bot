import LandingPage from '../../components/landingPage/LandingPage';
import ChatBot from '../../components/chatBot/ChatBot';

import { useState } from 'react';
import "./home.css"
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

function Home({ chat, setChat, openChat, setOpenChat, initialData,
  selectedTab, setSelectedTab, loginState, setLoginState }) {
  const [reset, setReset] = useState(false);

  const [chatId, setChatId] = useState();
  return (
    <div className='appContainer'>
      <LandingPage setLoginState={setLoginState} loginState={loginState} setOpenChat={setOpenChat}
        reset={reset} setReset={setReset}
      />

      <ChatBot chat={chat} setChat={setChat} openChat={openChat} setOpenChat={setOpenChat} initialData={initialData} selectedTab={selectedTab} setSelectedTab={setSelectedTab}
        setLoginState={setLoginState} chatId={chatId} setChatId={setChatId}
      />
      {loginState === "register" && <Register setLoginState={setLoginState} chatId={chatId} setChatId={setChatId} setReset={setReset} reset={reset} />}


      {loginState === "login" && <Login setLoginState={setLoginState} chatId={chatId} setChatId={setChatId}
        setReset={setReset} reset={reset} />}
    </div>
  )
}
export default Home