import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ChatFullcreen from "./pages/chatFullscreen/ChatFullcreen";
import { useState } from "react";
function App() {
  const [selectedTab, setSelectedTab] = useState("chatbotTab")
  const initialData = {
    type: "text",
    text: "Hey there, Welcome to our store. How can we help you?",
    buttons: ["Browse products", "What's on sale", "About Us", "Ask the agent"],
    showTemplate: false,
    showPayment: false,
  }
  const [chat, setChat] = useState([initialData]);
  const [openChat, setOpenChat] = useState(false);
  const [loginState, setLoginState] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home chat={chat} setChat={setChat} openChat={openChat} setOpenChat={setOpenChat} initialData={initialData} selectedTab={selectedTab} setSelectedTab={setSelectedTab}
        loginState={loginState} setLoginState={setLoginState} />,
    },
    {
      path: "/chat/fullScreen",
      element: <ChatFullcreen initialData={initialData} chat={chat} setChat={setChat} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setOpenChat={setOpenChat} setLoginState={setLoginState} />,
    }
  ]);
  return <RouterProvider router={router} />
}

export default App
