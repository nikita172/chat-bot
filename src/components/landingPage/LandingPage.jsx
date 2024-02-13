import React, { useEffect, useRef, useState } from 'react';
import "./landingPage.css";
import logo from "../../assets/images/message-square.svg";
import check from "../../assets/images/check.svg";
import menu from "../../assets/images/menu.svg";
import ScrollAnimation from '../scrollAnimation/ScrollAnimation';
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../navigationbar/Navigationbar';
const data = [
  "Let <b>chatbots</b> engage, nurture, qualify, and convert leads on their own across different channels",
  "Greet customers and quickly route chats with the <b>help of AI</b>",
  "Track sales and business goals automatically to see precisely how chats <b>boost revenue and ROI</b>"
]
const data2 = [
  "Show off your goods in elegant product cards and <b>make more sales</b> while chatting",
  "<b>Qualify leads online</b> with custom forms and AI chatbot automations.",
  "Automatically segment visitors based on what they do on your site, so you can <b>better meet customer needs</b>"
]
const images = [
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
  "https://www.livechat.com/logos/integrations/chatbot.41583241a7577623f71892dfbee18ed47b0703a092aecf9a1be83c4709164464.svg",
]
const images2 = [
  "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png", "https://www.livechat.com/logos/integrations/google-a.1fb45b3b4eac21b367fe57ee3e68800498db868eef5ec26145dbe0fbea971420.png",
]
const images3 = [
  "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg",
  "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg",
  "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg", "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg", "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg", "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg", "https://www.livechat.com/logos/integrations/helpdesk.765029e619b1b00576c175c54ecf5be0ae3efe6402d270174d8dc678d8f81e70.svg",
]
const LandingPage = ({ setLoginState, loginState, setOpenChat, setIsLogout }) => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (videoRef2.current) {
      videoRef2.current.play();
    }
    if (videoRef3.current) {
      videoRef3.current.play();
    }
  }, []);

  const navigationHandler = () => {
    setNavigationOpen(true);
  }


  return (
    <div className={`landingPage`}>
      <Navigationbar setNavigationOpen={setNavigationOpen} navigationOpen={navigationOpen} setLoginState={setLoginState} setIsLogout={setIsLogout} />

      <header className='headerContainer'>
        <div className="headerWrapper">
          <div className='logoContainer'>
            <img className='logoImg' src={logo} />
            <h2>ChatBot</h2>
          </div>
          <div className='navbarContainer'>
            <span>Products</span>
            <span>Pricing</span>
            <span>Integrations</span>
            <span>Customers</span>
            <span>Resources</span>
          </div>
          <div className='authButtons'>
            {!loginInfo &&
              <button
                className={`loginBtn ${loginState === "login" ? "selected" : ""}`}
                onClick={() => {
                  setOpenChat(false)
                  setLoginState("login")
                }}
              >
                Login
              </button>
            }
            {!loginInfo &&
              <button
                className={`signupBtn ${loginState === "register" ? "selected" : ""}`}
                onClick={() => {
                  setOpenChat(false)
                  setLoginState("register")
                }
                }
              >
                Sign up free
              </button>
            }

            {loginInfo &&
              <button
                className={`signupBtn`}
                onClick={() => {
                  setIsLogout(true);
                }}
              >
                Logout
              </button>}

          </div>
          {
            !navigationOpen &&
            <div className='menuBtn' onClick={navigationHandler}>
              <span className='menuTag'>Menu</span>
              <img style={{ width: "30px" }} src={menu} />
            </div>
          }

        </div>
      </header >

      <div className='allSections'>
        <section className='mainSectionContainer'>
          <div className="mainSectionWrapper">
            <div className="mainSectionLeft">
              <h1 className='mainSectionTitle'>Connect with customers</h1>
              <p className='mainSectionSubTitle'>LiveChat is a complete customer service platform that delights your customers and fuels your sales.</p>
              <div>
                <div className='signinInput'>
                  <input className='businessEmailInput' placeholder='Enter your business email' />
                  <button className='businessSignupBtn'>Sign up free</button>
                </div>
                <div className='websiteBenefits'>
                  <div className='websiteBenefit'>
                    <img className='checkImg' src={check} />
                    <span> Free 14-day trial</span>
                  </div>
                  <div className='websiteBenefit'>
                    <img className='checkImg' src={check} />
                    <span >Omnichannel messaging</span>
                  </div>
                  <div className='websiteBenefit'>
                    <img className='checkImg' src={check} />
                    <span>Automation</span>
                  </div>
                </div>
              </div>
              <div className="trustedBrands">
                <span className='trustedBrandCount'>Trusted by <b>37,000+</b> companies</span>
                <img className='trustedBrandImg' src="https://www.livechat.com/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_739x0_resize_q75_h2_catmullrom_3.57883da7e4228fa5b906ace1110d449da93fe9c6418e6b98117e7e52317d1a75.webp" />
              </div>
            </div>
            <div className="mainSectionRight">
              <video className='mainSectionRightImg' ref={videoRef} autoPlay loop muted >
                <source src="https://www.livechat.com/live-chat-app.edf8d10b57eb5e0b135b377edc90064f66d434910cd1def15a4f0ccaa4453857.mp4" type="video/mp4" />
              </video>
              <img className='mainSectionRightImg hide' src="https://www.livechat.com/live-chat-app-mobile_hue6b5c5031ca89f414191816fdb90adfb_212093_1280x0_resize_q75_h2_catmullrom.8516a337516534a875fb257eebdf92c85f0674614bea39669350b8b0d17f5193.webp" />
            </div>
          </div>
        </section>

        <section className='section2'>
          <div className="section2Wrapper">
            <h4>Everywhere is here</h4>
            <video className='section2Video' ref={videoRef2} autoPlay loop muted>
              <source src="https://www.livechat.com/livechat-channels.22ffb37b09dc98a076bee34058689ef02da40ee00af6712288b01281e6140c6c.mp4" type="video/mp4" />
            </video>
            <img className='section2Video hide' src="https://www.livechat.com/channels_huaae9ab9352c2851b0bec215d25429e97_29733_822x0_resize_q75_h2_catmullrom_3.8655ecb08408040443f554646044292ff2e5ac9607d2449860644763a65ba92c.webp" />
          </div>
        </section>

        <section className='section3'>
          <div className="section3Left">
            <img src=" https://www.livechat.com/website-preview_huc1e81859ebf3b8546fb282bdd845e00b_210130_1088x0_resize_q75_h2_catmullrom_3.d4049dccfe71f408303aecaa8b9995cdacf78b929c3b5a3558dd09f15fecf90a.webp" />
          </div>
          <div className="section3Right">
            <h2>Preview LiveChat on your homepage with one click</h2>
            <p>Enter your URL below to see how the LiveChat widget looks on your website.</p>
            <div className='section3Input'>
              <input className='section3UrlInput' placeholder='Your URL' />
              <button className='section3Button'>Preview</button>
            </div>
          </div>
        </section>

        <section className='section4'>
          <div className="section4Wrapper">
            <div className='section4Content'>
              <div className="section4Left">
                <h4>Capture leads and make buying easy</h4>
                <ScrollAnimation data={data} />
              </div>
              <div className="section5Right">
                <img src="https://www.livechat.com/feature-list__sales-ecommerce_hu82d9fd98c5079baa715e703547792928_63822_1280x0_resize_q75_h2_catmullrom.b0691d85aefdd29b7ee2de46a62ff08003d92f26cb0241e827727e1327ca070a.webp" />
              </div>
            </div>
          </div>
          <h2>Explore ways to sell with LiveChat  {">"}</h2>
        </section>

        <section className="section5">
          <h4>Offer a superb customer experience</h4>
          <video className='section5Video' autoPlay loop muted ref={videoRef3}>
            <source src="https://www.livechat.com/support.9409749e5f3d53dbcbc408b5c3c31562c576980bda203e81bf620ab819ce13ce.mp4" type="video/mp4" />
          </video>
          <div className='section5BottomSection'>
            <p>Create a chat experience your customers <b>know and love</b></p>
            <p>Solve customer problems <b>proactively</b></p>
            <p>Anticipate questions and <b>respond faster</b></p>
          </div>
          <div className='section5BottomSection show'>
            <div className='section5BottomDiv'>
              <img className='section5BottomCheckImg' src={check} />
              <div className='section5BottomP'>
                <span>Create a chat experience your customers <b>know and love</b> </span>

              </div>
            </div>
            <div className='section5BottomDiv'>
              <img className='section5BottomCheckImg' src={check} />
              <div className='section5BottomP'>
                <span>Solve customer problems <b>proactively</b> </span>
              </div>
            </div>
            <div className='section5BottomDiv'>
              <img className='section5BottomCheckImg' src={check} />
              <div className='section5BottomP'>
                <span>Anticipate questions and <b>respond faster</b> </span>

              </div>
            </div>
          </div>
          <h2>Explore ways to sell with LiveChat  {">"}</h2>
        </section>

        <section className='section4'>
          <div className="section4Wrapper">
            <div className='section4Content'>
              <div className="section4Left">
                <h4>Balance AI automation and the human touch</h4>
                <ScrollAnimation data={data2} />
              </div>
              <div className="section5Right">
                <img src="https://www.livechat.com/balance-ai_hu144fa38df07b03883e3134a713bb2196_89003_1026x0_resize_q75_h2_catmullrom.4f9558dd41ad391d62c7be81d05969368ed461bdbb69cf46bb9d8ba40ea876ca.webp" />
              </div>
            </div>
          </div>
          <h2>Meet ChatBot {">"}</h2>
        </section>

        <section className="section6">
          <div className="section6Wrapper">
            <div className="section6Left">
              <div className="logos">
                <div className="logos-slide">
                  {images.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>ChatBot</span>
                    </div>
                  ))}
                </div>
                <div className="logos-slide logos-slide-hide">
                  {images.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>ChatBot</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="logos">
                <div className="logos-slide">
                  {images2.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>Shopify</span>
                    </div>
                  ))}
                </div>
                <div className="logos-slide logos-slide-hide">
                  {images2.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>Shopify</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="logos">
                <div className="logos-slide">
                  {images3.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>Wordpress</span>
                    </div>
                  ))}
                </div>
                <div className="logos-slide logos-slide-hide">
                  {images3.map((img, i) => (
                    <div className='imgGrp' key={i}>
                      <img src={img} />
                      <span>Wordpress</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="section6Right">
              <h4>Easy integration with 200+ tool</h4>
              <p>Connect LiveChat software with apps you use and love. Chat with your customers, send their details to your CRM, manage orders and accept payments.</p>
              <h2>Explore Marketplace {">"}</h2>
            </div>
          </div>
        </section>

        <section className='section7'>
          <div className="mainSectionSecondPart">
            <h1 className='mainSection7Title'>Turn website visits into sales and customer satisfaction for your business</h1>
            <div>
              <div className='signinInput2'>
                <input className='businessEmailInput' placeholder='Enter your business email' />
                <button className='businessSignupBtn'>Sign up free</button>
              </div>
              <div className='websiteBenefits2'>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span> Free 14-day trial</span>
                </div>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span >Omnichannel messaging</span>
                </div>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span>Automation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section8">
          <div className="section8Container">
            <img src=" https://www.livechat.com/livechat-chats.7ccda7c6341bd051068da371cf0e8f274ae4ad16a8db4ee1de3cc4d95cbea0bb.svg" />
            <h4>75,000,000</h4>
            <span>chats monthly</span>
          </div>
          <div className="section8Container">
            <img src=" https://www.livechat.com/livechat-countries.1a15c8b088be7668c6408114501182ea8feae208c6c8d6a36c218c552c20ca4e.svg" />
            <h4>150</h4>
            <span>connected countries</span>
          </div>
          <div className="section8Container">
            <img src="https://www.livechat.com/livechat-agents.5dc134d1bce1a7e12ff409533d9abf2662c2761458a567fbc4506bceba138ba2.svg" />
            <h4>200,000</h4>
            <span>support reps</span>
          </div>
        </section>

        <section className="section9">
          <h2>Our customers say it best</h2>
          <div className="section9Container">
            <div className="section9Wrapper">
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
              <div className="section9TopStory">
                <p>
                  The <span className='atTheRates'>@LiveChat</span> facility on our website makes it even easier to gain the information you need, rapidly. If you have any questions, just ask our agents for an instant response. We look forward to speaking with you!
                </p>
                <div className="topStoryUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#111" d="M13.7 1.7H16l-5.4 6.2 6.4 8.4h-5l-4-5.1-4.4 5.1H1.2L7 9.7l-6-8h5l3.6 4.7 4-4.7Zm-1 13.1h1.5l-9-11.7H3.9l9 11.7Z"></path></svg>
                  <span>
                    Venesta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section10">
          <h4>
            Industry leaders trust LiveChat software
          </h4>
          <img className='section10Img1' src="https://www.livechat.com/livechat-customers-logos_hu6cc45f3fb482bd079bd6b414d0fd08ca_18315_2240x0_resize_q75_h2_catmullrom_3.63b2acdbb6dc14f48993d05c290f152f08c672c408d40719d1ed4af15e647574.webp" />
          <img className='section10Img2' src="https://www.livechat.com/logos-mobile_hu56068eac70caf72eb4748cd8e6910224_17462_1352x0_resize_q75_h2_catmullrom_3.0f721b6d87aa0255a726e811cc7ac73da8fde77e9752fb56a511d849a9abb6b4.webp" />
          <h5>See case Studies {">"}</h5>
        </section>

        <section className='section11'>
          <div className="section11Wrapper">
            <div className="section11Left">
              <h4>Building blocks of remarkable experience</h4>
              <p>The LiveChat Platform empowers you with tools and know-how to build customer service experience that highlights your brand.</p>
              <h2>Get started with the LiveChat Platform  {">"}</h2>
            </div>
            <div className="section11Right">
              <img src="https://www.livechat.com/livechat-platform_hufe8d46ea8101144360bab22bf741680e_137161_1404x0_resize_q75_h2_catmullrom.60bb8e5888f3ef32434c1705fb5ac7445eb88b59c3a33a40d7d34c6fc7df6fda.webp" />
            </div>
          </div>
        </section>

        <section className="section12">
          <img src="https://www.livechat.com/perfect-customer-service.1072e28b23101e8915b94c10a0279c5b2edd1cf84053fe43bba7c667baa5ea16.svg " />
          <h4>Our Support Heroes<br />
            are here for you 24/7</h4>
          <p>Meet our world famous support team. <br />They are fast, they are smart, and they <br /> will help you out any time day or night!</p>
          <button>Chat with us</button>
          <img className='superHerosImg' src=" https://www.livechat.com/support-heroes_hu6658119609b77a532e1387ad30f652cc_363244_2880x0_resize_q75_h2_catmullrom.74726a9550cd0456679976ba38a724395013004e29a0760c82ccbe0adc44ad8d.webp" />
        </section>

        <section className='section7'>
          <div className="mainSectionSecondPart">
            <h1 className='mainSection7Title'>Start a free LiveChat trail now!</h1>
            <p className='section7Para'>Supercharge your website and social media profiles.<br />
              Turn online visits into sales, customers into fans.</p>
            <div>
              <div className='signinInput2'>
                <input className='businessEmailInput' placeholder='Enter your business email' />
                <button className='businessSignupBtn'>Sign up free</button>
              </div>
              <div className='websiteBenefits2'>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span> Free 14-day trial</span>
                </div>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span >24/7 availability</span>
                </div>
                <div className='websiteBenefit'>
                  <img className='checkImg' src={check} />
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section13">
          <div className="section13Wrapper">
            <h4>Discover <b>text|</b> products:</h4>
            <div className='section13Contents'>
              <div className='section13Content'>
                <div class="b--u-mr-3">
                  <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_dd1)"><rect x="4" y="3" width="64" height="64" rx="10" fill="#fff"></rect></g><path d="M43.6 31.6v3a1.1 1.1 0 01-.6 1.1c-2.2 1-4.6 1.6-7 1.7-2.4 0-4.8-.6-7-1.7a1.1 1.1 0 01-.6-1v-3.1a.9.9 0 011.2-.8c2 .9 4.2 1.3 6.4 1.4 2.2 0 4.3-.5 6.4-1.4a.9.9 0 011.2.8z" fill="#06F"></path><path d="M51.8 38.9a7.6 7.6 0 01-7.6 6.9H40L32 51v-5.2l8-5.2h4.2a2.4 2.4 0 002.4-2.1c.3-4 .2-8 0-12a2.2 2.2 0 00-2.1-2 138.9 138.9 0 00-17 0 2.2 2.2 0 00-2 2c-.4 4-.4 8-.1 12a2.4 2.4 0 002.4 2.1H32v5.2h-4.2a7.6 7.6 0 01-7.6-7 96 96 0 010-12.7 7.4 7.4 0 017-6.8 125 125 0 0117.6 0 7.4 7.4 0 017 6.8 96 96 0 010 12.8z" fill="#06F"></path><defs><filter id="filter0_dd1" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend></filter></defs></svg>
                </div>
                <div>
                  <h5>ChatBot</h5>
                  <p>Automate customer service with AI</p>
                </div>
              </div>
              <div className='section13Content'>
                <div class="b--u-mr-3">
                  <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_dd1)"><rect x="4" y="3" width="64" height="64" rx="10" fill="#fff"></rect></g><path d="M43.6 31.6v3a1.1 1.1 0 01-.6 1.1c-2.2 1-4.6 1.6-7 1.7-2.4 0-4.8-.6-7-1.7a1.1 1.1 0 01-.6-1v-3.1a.9.9 0 011.2-.8c2 .9 4.2 1.3 6.4 1.4 2.2 0 4.3-.5 6.4-1.4a.9.9 0 011.2.8z" fill="#06F"></path><path d="M51.8 38.9a7.6 7.6 0 01-7.6 6.9H40L32 51v-5.2l8-5.2h4.2a2.4 2.4 0 002.4-2.1c.3-4 .2-8 0-12a2.2 2.2 0 00-2.1-2 138.9 138.9 0 00-17 0 2.2 2.2 0 00-2 2c-.4 4-.4 8-.1 12a2.4 2.4 0 002.4 2.1H32v5.2h-4.2a7.6 7.6 0 01-7.6-7 96 96 0 010-12.7 7.4 7.4 0 017-6.8 125 125 0 0117.6 0 7.4 7.4 0 017 6.8 96 96 0 010 12.8z" fill="#06F"></path><defs><filter id="filter0_dd1" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend></filter></defs></svg>
                </div>
                <div>
                  <h5>ChatBot</h5>
                  <p>Automate customer service with AI</p>
                </div>
              </div>
              <div className='section13Content'>
                <div class="b--u-mr-3">
                  <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_dd1)"><rect x="4" y="3" width="64" height="64" rx="10" fill="#fff"></rect></g><path d="M43.6 31.6v3a1.1 1.1 0 01-.6 1.1c-2.2 1-4.6 1.6-7 1.7-2.4 0-4.8-.6-7-1.7a1.1 1.1 0 01-.6-1v-3.1a.9.9 0 011.2-.8c2 .9 4.2 1.3 6.4 1.4 2.2 0 4.3-.5 6.4-1.4a.9.9 0 011.2.8z" fill="#06F"></path><path d="M51.8 38.9a7.6 7.6 0 01-7.6 6.9H40L32 51v-5.2l8-5.2h4.2a2.4 2.4 0 002.4-2.1c.3-4 .2-8 0-12a2.2 2.2 0 00-2.1-2 138.9 138.9 0 00-17 0 2.2 2.2 0 00-2 2c-.4 4-.4 8-.1 12a2.4 2.4 0 002.4 2.1H32v5.2h-4.2a7.6 7.6 0 01-7.6-7 96 96 0 010-12.7 7.4 7.4 0 017-6.8 125 125 0 0117.6 0 7.4 7.4 0 017 6.8 96 96 0 010 12.8z" fill="#06F"></path><defs><filter id="filter0_dd1" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend></filter></defs></svg>
                </div>
                <div>
                  <h5>ChatBot</h5>
                  <p>Automate customer service with AI</p>
                </div>
              </div>
              <div className='section13Content'>
                <div class="b--u-mr-3">
                  <svg width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_dd1)"><rect x="4" y="3" width="64" height="64" rx="10" fill="#fff"></rect></g><path d="M43.6 31.6v3a1.1 1.1 0 01-.6 1.1c-2.2 1-4.6 1.6-7 1.7-2.4 0-4.8-.6-7-1.7a1.1 1.1 0 01-.6-1v-3.1a.9.9 0 011.2-.8c2 .9 4.2 1.3 6.4 1.4 2.2 0 4.3-.5 6.4-1.4a.9.9 0 011.2.8z" fill="#06F"></path><path d="M51.8 38.9a7.6 7.6 0 01-7.6 6.9H40L32 51v-5.2l8-5.2h4.2a2.4 2.4 0 002.4-2.1c.3-4 .2-8 0-12a2.2 2.2 0 00-2.1-2 138.9 138.9 0 00-17 0 2.2 2.2 0 00-2 2c-.4 4-.4 8-.1 12a2.4 2.4 0 002.4 2.1H32v5.2h-4.2a7.6 7.6 0 01-7.6-7 96 96 0 010-12.7 7.4 7.4 0 017-6.8 125 125 0 0117.6 0 7.4 7.4 0 017 6.8 96 96 0 010 12.8z" fill="#06F"></path><defs><filter id="filter0_dd1" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend></filter></defs></svg>
                </div>
                <div>
                  <h5>ChatBot</h5>
                  <p>Automate customer service with AI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section14">
          <div className="section14Wrapper">
            <div className="sectionPart1">
              <div className="Section14Content">
                <h6>Get LiveChat App</h6>
                <h5>Product</h5>
                <span>Pricing</span>
                <span>LiveChat Benefits</span>
                <span>Tour</span>
                <span>Features</span>
                <span>Lead Generation</span>
                <span>Product Demo</span>
                <span>App</span>
                <span>Marketplace</span>
                <span>News</span>
              </div>

              <div className="Section14Content">
                <div className='section14Heading'>
                  <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M7.57 14.51c1.12-.15 2.1-1.31 2.72-3.03-.9-.2-1.8-.3-2.72-.31v3.34zM9.36 14.24l.2-.06.16-.05.19-.07.16-.07.19-.07a7.87 7.87 0 0 0 1.6-.97l.15-.11.15-.14.13-.11.15-.15.13-.12.02-.02a8.81 8.81 0 0 0-1.8-.69 6.44 6.44 0 0 1-1.66 2.7l.06-.02.17-.05zM14.62 7.52h-3.13a13.4 13.4 0 0 1-.53 3.6c.69.18 1.35.44 1.98.78a7.23 7.23 0 0 0 1.68-4.38zM7.57 7h3.4a12.92 12.92 0 0 0-.52-3.46c-.95.21-1.91.33-2.88.34V7zM7.57.01v3.35c.91-.01 1.82-.12 2.72-.32C9.67 1.33 8.69.17 7.57.01zM7.57 10.65c.97 0 1.93.12 2.88.34.33-1.13.5-2.3.51-3.47H7.57v3.13zM12.94 2.62c-.63.34-1.3.6-1.98.79.34 1.17.51 2.38.53 3.6h3.13a7.23 7.23 0 0 0-1.68-4.39zM12.59 2.23l-.02-.02-.13-.13-.15-.14-.13-.12-.15-.13-.14-.11a5.59 5.59 0 0 0-.94-.63 7.23 7.23 0 0 0-.17-.1L10.6.77a5.78 5.78 0 0 0-.34-.16l-.19-.08a7.38 7.38 0 0 0-.72-.25L9.2.24 9.13.22a6.44 6.44 0 0 1 1.67 2.7 8.8 8.8 0 0 0 1.79-.69zM0 7h3.13c.01-1.21.2-2.42.53-3.6a9.1 9.1 0 0 1-1.98-.78A7.23 7.23 0 0 0 0 7zM7.05 14.51v-3.34c-.92 0-1.82.12-2.72.31.62 1.72 1.6 2.88 2.72 3.03zM7.05 7.52h-3.4c.02 1.18.2 2.34.52 3.47.94-.22 1.9-.33 2.88-.34V7.52zM7.05.01c-1.12.16-2.1 1.32-2.72 3.03.9.2 1.8.3 2.72.32V0zM7.05 3.88c-.97-.01-1.94-.13-2.88-.34-.33 1.12-.5 2.29-.51 3.46h3.39V3.88zM5.49.22l-.06.02-.17.04-.2.06L4.9.4l-.2.07-.15.06-.19.08a7.57 7.57 0 0 0-.82.42l-.17.1a6.85 6.85 0 0 0-.46.32l-.16.13-.14.1-.15.14-.13.12-.15.14-.13.13-.02.02c.57.3 1.17.52 1.8.68C4.13 1.9 4.71.97 5.48.22zM2.18 12.44l.15.14.13.12.15.14.14.1.16.13.14.1a7.4 7.4 0 0 0 .81.5l.16.09a6.08 6.08 0 0 0 .34.16l.19.07a7.38 7.38 0 0 0 .35.14l.17.05.2.06.16.05.06.01a6.44 6.44 0 0 1-1.67-2.7 8.8 8.8 0 0 0-1.79.7l.02.02.13.12zM1.68 11.9c.62-.34 1.3-.6 1.98-.78a13.4 13.4 0 0 1-.53-3.6H0c.06 1.6.65 3.15 1.68 4.38z"></path></g>
                  </svg>
                  <h3>Web Browser</h3>
                </div>
                <h5>Solutions</h5>
                <span>Customer Support</span>
                <span>Sales & Marketing</span>
                <span>Enterprise</span>
              </div>

              <div className="Section14Content">
                <div className='section14Heading'>
                  <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M0 12.5l6 .8V7.7H0zM0 6.9h6V1.2L0 2zM6.7 13.4l7.9 1.1V7.7H6.7zM6.8 1.1v5.7h7.7V0z"></path></g></svg>
                  <h3>Windows</h3>
                </div>
                <h5>Customers</h5>
                <span>Industries</span>
                <span>Customers</span>
                <span>Reviews & Testimonials</span>
                <span>Case Studies</span>
              </div>

              <div className="Section14Content">
                <div className='section14Heading'>
                  <svg width="15" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M1.08 5.58h-.05C.47 5.58 0 6.04 0 6.6v4.44c0 .57.47 1.02 1.03 1.02h.05c.56 0 1.03-.46 1.03-1.02V6.6c0-.56-.47-1.02-1.03-1.02zM2.6 12.76c0 .51.42.93.94.93h1.01v2.4c0 .57.47 1.02 1.03 1.02h.05c.57 0 1.03-.46 1.03-1.02v-2.4h1.41v2.4c0 .57.46 1.02 1.03 1.02h.04c.57 0 1.03-.46 1.03-1.02v-2.4h1.01c.52 0 .95-.42.95-.93V5.74H2.6v7.02z"></path><path d="M9.74 1.49l.8-1.23a.17.17 0 0 0-.05-.23.17.17 0 0 0-.24.05l-.83 1.27a5.46 5.46 0 0 0-4.11 0L4.48.08a.17.17 0 0 0-.24-.05.17.17 0 0 0-.05.23l.8 1.23a4.03 4.03 0 0 0-2.4 3.83h9.56l.01-.28c0-1.52-.98-2.85-2.42-3.55zm-4.6 2.2a.46.46 0 0 1-.45-.46c0-.25.2-.45.46-.45a.46.46 0 1 1 0 .91zm4.44 0a.46.46 0 0 1-.46-.46c0-.25.2-.45.46-.45a.46.46 0 1 1 0 .91z" fill-rule="nonzero"></path><path d="M13.7 5.58h-.05c-.56 0-1.03.46-1.03 1.02v4.44c0 .57.47 1.02 1.03 1.02h.05c.56 0 1.02-.46 1.02-1.02V6.6c0-.56-.46-1.02-1.03-1.02z"></path></g></svg>
                  <h3>Android</h3>
                </div>
                <h5>Resources</h5>
                <span>Success by LiveChat</span>
                <span>Customer Service Guide</span>
                <span>Customer Service Report</span>
                <span>Benchmark</span>
                <span>Reports</span>
                <span>Typing Speed Test</span>
                <span>Privacy Policy Generator</span>
                <span>Newsletter</span>
              </div>

              <div className="Section14Content">
                <div className='section14Heading'>
                  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.6 13.9l-1 1.5a1.2 1.2 0 01-2-1.1l.7-1.2c.2-.2.5-.5 1-.4 0 0 1.3 0 1.4.8l-.1.4zM17 10H13.9L11 4.8l-.2-.3c-.3-.4-.7.7-.7.7-.6 1.2 0 2.7.3 3l4 7.1a1.2 1.2 0 002-1.1l-1-1.8s0-.2.2-.2H17c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.2-1.1-1.2zm-5.3 1.6s.1.7-.5.7h-10a1.2 1.2 0 010-2.3h2.5c.5 0 .6-.2.6-.2l3.4-5.9v-.2l-1.2-2a1.2 1.2 0 012-1.1l.6.9.5-1a1.2 1.2 0 012 1.2L6.9 10l.1.1h2.8s1.6 0 1.9 1.6z" fill="currentColor"></path></svg>
                  <h3>iOS</h3>
                </div>
                <h5>Support</h5>
                <span>Help Center</span>
                <span>Webinars</span>
                <span>Partners Marketplace</span>
                <span>Professional Services</span>
                <span>API & Developers</span>
                <span>System Status</span>
              </div>

              <div className="Section14Content">
                <div className='section14Heading'>
                  <svg width="15" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M12.4 9.3c0-2.2 1.8-3.3 1.9-3.3a4.1 4.1 0 0 0-3.2-1.8c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.7-3-.7-1.4 0-2.8.8-3.6 2.2C-.5 9.2.7 13 2.2 15.3c.8 1 1.7 2.3 2.8 2.2 1.1 0 1.6-.7 3-.7 1.3 0 1.6.7 2.8.7 1.2 0 2-1 2.7-2.1.9-1.3 1.2-2.5 1.3-2.5 0 0-2.4-1-2.4-3.6zM10.2 2.8c.6-.7 1-1.8.9-2.8a4 4 0 0 0-2.6 1.3C7.9 2 7.4 3 7.5 4c1 .1 2-.5 2.7-1.2z"></path></g></svg>
                  <h3>Mac</h3>
                </div>
                <h5>Company</h5>
                <span>About <b>text|</b></span>
                <span>Contact</span>
                <span>Team</span>
                <span>Careers</span>
                <span>Investor Relations</span>
                <span>Press</span>
                <span>Partner Program</span>
                <span>LiveChat Incubator</span>
                <span>Legal</span>
              </div>
            </div>
          </div>
          <div className="sectionPart2">
            <div className="part2left">
              <h4>Start your free trial</h4>
              <button>Sign up free</button>
            </div>
            <div className="part2Right">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.3H16L11 14.8l-6 6.8H1.6L9.4 13 1.2 2.2H8l4.8 6.3 5.4-6.3ZM17 19.8H19L7 4H5l12 15.7Z"></path></svg>
            </div>
          </div>
        </section>
      </div>

      <footer className='footer'>
        <div className="footerWrapper">

          Customer service software that adapts to your business needs. Whether you’re a B2B SaaS or an eCommerce, LiveChat will help you boost your support and sales across multiple communication channels.
          <br />
          Copyright © 2024 Text, Inc. All rights reserved.
          <br />
          <br />

          <br />

          Hi! We are glad to have you on our website! Before you start using our website, please note that we use cookies and similar technologies to enhance your website experience, analyze traffic and usage, personalize content to your preferences, and assist in our marketing efforts. By using our website, you consent to allow us, and our partners, to collect, use, retrieve, and store cookies and similar technologies on your computer or other devices. You can revoke your consent at any time in your computer/device browser settings. <b>Click the Cookies Policy</b> to check how you can control the use of cookies through your device. Your data will be processed in accordance with our <b>Privacy Policy.</b>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage