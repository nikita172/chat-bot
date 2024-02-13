import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import minimize from "../../assets/images/minimize.svg";
import x from "../../assets/images/x.svg";
import logo from "../../assets/images/message-square.svg";
import send from "../../assets/images/send.svg";
import ReactLoading from "react-loading";
import back from "../../assets/images/arrow-left.svg"
import "./chatFullscreen.css"
import { getData } from '../../components/libs/getData';
import axios from "axios";
import leftArrow from "../../assets/images/chevrons-left.svg";
import rightArrow from "../../assets/images/chevrons-right.svg";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import io from "socket.io-client"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
const apiUrl = process.env.REACT_APP_API_URL;
// const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/";
const ENDPOINT = "http://localhost:8000/";

var socket, selectedChatCompare;

const ChatFullcreen = ({ chat, setChat, initialData,
  selectedTab, setSelectedTab, setOpenChat, setLoginState }) => {

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const endRef = useRef(null);
  const containerRef = useRef(null);

  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [chatId, setChatId] = useState();
  const [messages, setMessages] = useState([
  ]);
  const [loadingMsg, setloadingMsg] = useState(true);
  const [isBeginningOfScroll, setIsBeginningOfScroll] = useState(true);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);


  const navigate = useNavigate();

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setIsEndOfScroll(
        container.scrollLeft + container.clientWidth >= container.scrollWidth
      );
      setIsBeginningOfScroll(container.scrollLeft === 0);
    }
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: - 200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollTrigger]);

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

  const paymentSuccessfulModal = () => {
    setPurchase(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenPaymentForm(false)
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      paymentSuccessfulModal()
    }, 1000)
    return () => clearTimeout(timer);
  }

  const purchaseHandler = () => {
    setOpenPaymentForm(!openPaymentForm)
  }

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
    }
    else if (text === "Ask the agent") {
      setSelectedTab("messageTab")
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

  const closePaymentSvg = () => {
    setPurchase(false);
    resetData();
  }

  const resetData = () => {
    const data = {
      type: "text",
      text: "payment successful !",
    }
    setChat((prev) => [...prev, data])
    setScrollTrigger(!scrollTrigger)
    const newData = {
      type: "text",
      text: "Continue Shopping with us! Please explore our collection",
      buttons: ["Browse products", "What's on sale", "About Us", "Ask the agent"],
      showTemplate: false,
      showPayment: false,
    }
    setChat((prev) => [...prev, newData])
    setScrollTrigger(!scrollTrigger)
  }

  useEffect(() => {
    const getChat = async () => {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      if (loginInfo) {
        const res = {
          userId: loginInfo,
          adminId: "65cb4811a76b838a8c9ccfd0"
        }
        try {
          const result = await axios.post(`${apiUrl}/api/chat`, res)
          if (result.data._id) {
            setChatId(result.data._id)
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
      setloadingMsg(true);
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
      setloadingMsg(false);

    } catch (error) {
      console.log(error)
      setloadingMsg(false);

    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chatId;
  }, [chatId])

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
      } else {
        console.log(newMessageRecieved)
        setMessages([...messages, newData]);
      }
    });
  });
  return (
    <div className="chatFullscreenContainer">
      <div className="chatBotWrapperFullscreen">
        <div className={`chatsFullScreen`}>
          <div className="chatsHeader fullscreen">
            <img className='chatHeaderImg' src={minimize} onClick={() => navigate("/")} />
            <div className='chatHeaderLogo'>
              <img src={logo} />
              <span className='chatHeaderTitle'>ChatBot</span></div>
            <img className='chatHeaderImg' onClick={() => {
              setOpenChat(false)
              navigate("/")
            }} src={x} />
          </div>
          {loginInfo ?
            <div className='allChatsDiv'>
              <div className="allChats">
                {selectedTab == "chatbotTab" ? (
                  <div >
                    <div className="allChatsWrapper">
                      {chat?.map((d, index) => (
                        <div key={index}>
                          {d.type == "text" ?
                            <div key={index} className={`chat`}>
                              <div className='chatTitle'>{d.text}</div>
                              {d.buttons &&
                                <div className={`chatOptions `}>
                                  {d?.buttons?.map((option, i) => (
                                    <button className='chatOption' key={i}
                                      onClick={() => { handleChats(option) }}>{option}</button>
                                  ))}
                                </div>}
                            </div>
                            :
                            (d.type == "self" ?
                              <div>
                                <span className='selfGenetrated'>{d.text}</span>
                              </div> :
                              <div className="image-carousel" >
                                <button className='leftArrBtn' onClick={scrollLeft} style={{ visibility: isBeginningOfScroll ? 'hidden' : 'visible' }}><img src={leftArrow} /></button>

                                <div className="image-container" ref={containerRef} onScroll={handleScroll}>
                                  {d.content.map((prod, loc) => (
                                    <div className='product' key={prod._id}>
                                      <img className='productImg' src={prod.img} />
                                      <h4 className='productName'>{prod.brandName}</h4>
                                      <span className='productPrice'>${prod.mrp}</span>
                                      <span className='productPrice'>{prod.aboutProductShort}</span>
                                      <span className='purchaseNow' onClick={purchaseHandler}>Purchase Now</span>
                                      <span className='purchaseNow asktheagentbtn' onClick={() => setSelectedTab("messageTab")}>Ask the agent</span>
                                    </div>
                                  ))}
                                </div>
                                <button onClick={scrollRight}
                                  className={`rightArrBtn ${isEndOfScroll ? "invisible" : ""}`} ><img src={rightArrow} /></button>
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
                        <form className='paymentForm' onSubmit={submitHandler} style={{ padding: "20px" }}>
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
                          <h4>Payment Successful !</h4>
                          <button><img className='closePayment' onClick={closePaymentSvg} src={x} /></button>
                        </div>
                        <div className="paymentGif">
                          <img className="payment-success" src="https://img.freepik.com/free-vector/successful-purchase-concept-illustration_114360-1003.jpg?size=626&ext=jpg" />
                        </div>
                      </div>
                    </div>}
                  </div>
                ) : (
                  <div style={{
                    position: "absolute",
                    height: "calc(100% - 50px)",
                    width: "100%"
                  }}>
                    <MainContainer>
                      <ChatContainer>

                        <MessageList
                          scrollBehavior="auto"
                        >
                          <button
                            onClick={() => {
                              setScrollTrigger(!scrollTrigger)
                              setSelectedTab("chatbotTab")
                            }
                            }
                            className='messageBackBtn'
                          >
                            <img src={back} className='messageBackIcon' />
                          </button>
                          {
                            loadingMsg ?
                              <div className='nomessages'>
                                <ReactLoading type="bubbles" color="blue"
                                  height={100} width={50} />
                              </div> :
                              messages.length > 0 ?
                                messages.map((message, i) => {
                                  return <Message key={i} model={message} />
                                }) :
                                <div className='nomessages'>no messages yet!</div>
                          }
                        </MessageList>

                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                      </ChatContainer>
                    </MainContainer>
                  </div>
                )
                }
              </div>
              {selectedTab == "chatbotTab" &&
                <div className="chatsFooter">
                  <input className={`typeMessage`} type="text" placeholder='Type your message' />
                  <div className="sendButtons">
                    <img src={send} />
                  </div>
                </div>}
            </div> :
            <div className='loginIndicators'>
              <div>
                <div className='oopsIndicator'>
                  Oops! seems like you are not sign into your account
                </div>
                <div className='loginIndicator'>
                  Please Login or register first!
                </div>
                <div className='chatBotLoginLink'>
                  <button className='chatbotLoginBtn'
                    onClick={() => {
                      setOpenChat(false);
                      setLoginState("login");
                      navigate("/")
                    }}
                  >Login</button>
                  <button className='chatbotLoginBtn'
                    onClick={() => {
                      setOpenChat(false);
                      setLoginState("register")
                      navigate("/")
                    }}>Register</button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ChatFullcreen