import React, { useRef, useState, useEffect } from 'react'
import "./chatBot.css";
import chatImg from "../../assets/images/chat.svg";
import maximize from "../../assets/images/maximize.svg";
import minimize from "../../assets/images/minimize.svg";
import send from "../../assets/images/send.svg";
import mic from "../../assets/images/mic.svg";
import x from "../../assets/images/x.svg";
import logo from "../../assets/images/message-square.svg";
import { getData } from '../libs/getData';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import io from "socket.io-client"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
const apiUrl = process.env.REACT_APP_API_URL;
const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/"
var socket, selectedChatCompare;

const ChatBot = ({ chat, setChat, openChat, setOpenChat, initialData, selectedTab, setSelectedTab }) => {
  const username = useRef();
  const password = useRef();
  const [reset, setReset] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [chatId, setChatId] = useState();
  const [messages, setMessages] = useState([
  ]);
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useState(false);

  const endRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollTrigger]);
  useEffect(() => {
    const getChat = async () => {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      if (loginInfo) {
        const res = {
          userId: loginInfo,
          adminId: "65bc9457e5434f76dd38938d"
        }
        try {
          const result = await axios.post(`${apiUrl}/api/chat`, res)
          setChatId(result.data._id)
          if (result.data._id) {
          }
        }
        catch (err) {
          console.log(err)
        }
      }
    }
    getChat();
  }, [])
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loginInfo);
    socket.on("connected", () => {
    })
  }, []);
  const fetchMessages = async () => {
    if (!chatId) return;
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/message/${chatId}`
      );
      const newData = data.map(d => {
        return {
          message: d.content,
          sentTime: "just now",
          sender: d.sender.username,
          direction: d.sender.username == "admin" ? "incoming" : "outgoing",
        }
      })
      setMessages(newData);
      socket.emit("join chat", chatId);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chatId;
  }, [chatId])

  const handleChats = async (text) => {
    const data = {
      type: "self",
      text: text
    }
    if (text == "Shoes" || text == "Shirts" || text == "Jeans" || text == "Jackets" || text == "Sweaters") {
      const products = await axios.get(`${apiUrl}/products/get/` + text);
      if (products.data.products.length > 0) {
        const response = {
          type: "product",
          content: products.data.products,
          showTemplate: false,
          showPayment: false,
        };
        setChat((prev) => [...prev, data, response])
      } else {
        const noData = {
          type: "text",
          text: "No Data Found!"
        }
        const result = getData("Browse products")
        setChat((prev) => [...prev, data, noData, result])
      }
    } else if (text == "What's on sale") {
      const response = await axios.get(`${apiUrl}/products/get/category/all`);
      const res = {
        type: "product",
        content: response.data.products,
        showTemplate: false,
        showPayment: false,
      };
      setChat((prev) => [...prev, data, res])
    } else {
      const result = getData(text)
      setChat((prev) => [...prev, data, result])
    }
    setScrollTrigger(!scrollTrigger)
  }

  const closeCardHandler = () => {
    setOpenChat(false);
  }

  const purchaseHandler = () => {
    setOpenPaymentForm(!openPaymentForm)
  }

  const closePaymentHandler = () => {
    setOpenPaymentForm(false);
    const data = {
      type: "text",
      text: "payment declined!",
    }
    setChat((prev) => [...prev, data])
    setChat((prev) => [...prev, initialData])
    setScrollTrigger(!scrollTrigger)
  }

  const resetData = () => {
    const data = {
      type: "text",
      text: "payment successfull!",
    }
    setChat((prev) => [...prev, data])
    setScrollTrigger(!scrollTrigger)
    const newData = {
      type: "text",
      text: "Continue Shopping with us! Please explore our collection",
      buttons: ["Browse products", "What's on sale", "About Us"],
      showTemplate: false,
      showPayment: false,
    }
    setChat((prev) => [...prev, newData])
    setScrollTrigger(!scrollTrigger)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenPaymentForm(false)
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      paymentSuccessfulModal();
    }, 2000)
    return () => clearTimeout(timer);
  }

  const openChatHandler = () => {
    setOpenChat(true);
    setScrollTrigger(!scrollTrigger)
  }

  const paymentSuccessfulModal = () => {
    setPurchase(true);
  }

  const closePaymentSvg = () => {
    setPurchase(false);
    resetData();
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const obj = {
      username: username.current.value,
      password: password.current.value,
      userType: "User"
    }
    try {
      const data = await axios.post(`${apiUrl}/admin/register`, obj)
      // console.log(data.data)
      if (data.data) {
        localStorage.setItem('loginInfo', JSON.stringify(data.data.admin._id))
      }
      const res = {
        userId: data.data.admin._id,
        adminId: "65bc9457e5434f76dd38938d"
      }
      const result = await axios.post(`${apiUrl}/api/chat`, res)
      console.log(result)
      setChatId(result.data._id)
      socket.emit("new chat created", result);
      setReset(!reset)
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleSend = async (newMessage) => {
    try {

      const { data } = await axios.post(
        `${apiUrl}/api/message`,
        {
          content: newMessage,
          chatId: chatId,
          userId: loginInfo
        }
      );
      const newData = {
        message: data.content,
        sentTime: "just now",
        sender: data.sender.username,
        direction: "outgoing"

      }
      socket.emit("new message", data);
      setMessages([...messages, newData]);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      const newData = {
        message: newMessageRecieved.content,
        sentTime: "just now",
        sender: newMessageRecieved.sender.username,
        direction: "incoming"

      }
      if (!selectedChatCompare ||
        chatId !== newMessageRecieved.chat._id
      ) {
        //       if (!notification.includes(newMessageRecieved)) {
        //         setNotification([newMessageRecieved, ...notification]);
        //         setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newData]);
      }
    });
  });


  return (
    <div className={`chatBotContainer ${openPaymentForm ? "open-form" : ""}`}
    >
      <div className="chatBotWrapper">
        {openChat ?
          <div className={`chats ${openPaymentForm ? "form-open" : ""}`}>
            <div className="chatsHeader">
              <div className="chatsHeaderWrapper">

                <img className='chatHeaderImg' src={maximize} onClick={() => navigate("/chat/fullscreen"
                )} />
                <div className='chatHeaderLogo'>
                  <img src={logo} />
                  <span className='chatHeaderTitle'>ChatBot</span></div>
                <img className='chatHeaderImg' onClick={() =>
                  closeCardHandler()} src={x} />
              </div>
              <div className="chatTabs">
                <div className={`chatbotTab ${selectedTab == "chatbotTab" ? "selected" : ""}`} onClick={() => setSelectedTab("chatbotTab")}>chatBot</div>
                <div className={`messageTab ${selectedTab == "messageTab" ? "selected" : ""}`} onClick={() => {
                  setSelectedTab("messageTab")
                }}>all messages</div>
              </div>
            </div>
            <div className="allChats">
              {selectedTab == "chatbotTab" ? (
                <div >
                  <div className="allChatsWrapper">
                    {chat?.map((d, index) => (
                      <div key={index}>
                        {d.type == "text" ?
                          <div key={index} className={`chat ${openPaymentForm ? "chat-invisible" : ""}`}>
                            <div className='chatTitle'>{d.text}</div>
                            {d.buttons &&
                              <div className={`chatOptions ${openPaymentForm ? "option-invisible" : ""} `}>
                                {d?.buttons?.map((option, i) => (
                                  <button className='chatOption' key={i} onClick={() => { handleChats(option) }}>{option}</button>
                                ))}
                              </div>}
                          </div>
                          :
                          (d.type == "self" ?
                            <div>
                              <span className='selfGenetrated'>{d.text}</span>
                            </div> :
                            <div className={`chatProducts ${openPaymentForm ? "option-invisible" : ""}`}>
                              {d.content.map((prod, loc) => (
                                <div className='product' key={prod._id}>
                                  <img className='productImg' src={`${apiUrl}/public/images/${prod.img[0]}`} />
                                  <h4 className='productName'>{prod.brandName}</h4>
                                  <span className='productPrice'>${prod.mrp}</span>
                                  <span className='productPrice'>{prod.aboutProductShort}</span>
                                  <span className='purchaseNow' onClick={purchaseHandler}>Purchase Now</span>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      </div>
                    ))}
                  </div>
                  <div ref={endRef} />
                  <div className={`paymentFormContainer ${openPaymentForm ? "open-payment" : ""}`}>
                    <div className="paymentWrapper">
                      <div className='paymentHeader'>
                        <h2>Payment</h2>
                        <button><img className='closePayment' onClick={closePaymentHandler} src={x} /></button>
                      </div>
                      <form className='paymentForm' onSubmit={submitHandler}>
                        <input placeholder='Enter name' />
                        <input placeholder='Enter phone number' />
                        <input placeholder='Enter card number' />
                        <input placeholder='Enter CVV' />
                        <button type='submit'>Submit</button>
                      </form>
                    </div>
                  </div>
                  {loading &&
                    <div className="loader">
                      <ReactLoading type="bubbles" color="#ffff00"
                        height={100} width={50} />
                    </div>
                  }
                  {purchase && <div className="paymentWrapperfullScreen">
                    <div className="paymentSuccessContainer">
                      <div className='paymentHeader'>
                        <h4>Payment Successfull !</h4>
                        <button><img className='closePayment' onClick={closePaymentSvg} src={x} /></button>
                      </div>
                      <div className="paymentGif">
                        <img className="payment-success" src="https://img.freepik.com/free-vector/successful-purchase-concept-illustration_114360-1003.jpg?size=626&ext=jpg" />
                      </div>
                    </div>
                  </div>}
                </div>
              ) : (
                <div>
                  {loginInfo ?
                    <div style={{ position: "relative", height: "492px", width: "100%" }}>
                      <MainContainer>
                        <ChatContainer>
                          <MessageList
                            scrollBehavior="smooth"
                          >
                            {messages.map((message, i) => {
                              // console.log(message.content)
                              return <Message key={i} model={message} />
                            })}
                          </MessageList>
                          <MessageInput placeholder="Type message here" onSend={handleSend} />
                        </ChatContainer>
                      </MainContainer>
                    </div>
                    :
                    <div>
                      <div className='registerDiv'>
                        Please Register first!
                      </div>
                      <div className="loginContainerLeft">
                        <form id="loginForm" onSubmit={handleClick}>
                          <h2 className='loginHeading'>Register</h2>
                          <div className="inputGroup inputEmail">
                            {/* <PersonIcon className='icons' /> */}
                            <input type="text" name="username" required placeholder="Username" ref={username} />
                          </div>
                          <div className="inputGroup inputPassword">
                            {/* <LockIcon className='icons' /> */}
                            <input type="password" required name="password" placeholder="Password" ref={password} />
                          </div>
                          <div className="buttonGroup">
                            <button type="submit" className="primary" id="loginBtn" >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
            {
              selectedTab == "chatbotTab" &&
              <div className="chatsFooter">
                <input className={`typeMessage`} type="text" placeholder='Type your message' />
                <div className="sendButtons">
                  <img src={send} />
                </div>
              </div>
            }
          </div> :
          <div className="chatImgDiv" onClick={openChatHandler}>
            <img className="chatImg" src={chatImg} />
          </div>
        }
      </div>
    </div>
  )
}

export default ChatBot