import LandingPage from '../../components/landingPage/LandingPage';
import ChatBot from '../../components/chatBot/ChatBot';
import { useState } from 'react';
function Home({ chat, setChat, openChat, setOpenChat, initialData,
  selectedTab, setSelectedTab }) {
  return (
    <div className='appContainer'>
      <LandingPage />
      <ChatBot chat={chat} setChat={setChat} openChat={openChat} setOpenChat={setOpenChat} initialData={initialData} selectedTab={selectedTab} setSelectedTab={setSelectedTab}
      />
    </div>
  )
}
export default Home