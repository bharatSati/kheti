
import { Fragment, useRef } from 'react';
import './landingPage1.css';
import './landingPage2.css';
import './landingPage3.css';
import img from "./imm.webp"
import newItem from "./new.png"
import oldItem from "./old.png"
import rentItem from "./rent.png"
import { useEffect  , useState } from 'react';
import { Slider } from '../slider/slider.jsx';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import Menu from "./menu.png"
import axios from 'axios';
import Bharat from "./bharat.jpeg"
import whatsApp from "./whatsapp.jpg"
import twitter from "./x.png"
import gmail from "./gmail.jpg"
import linkedin from "./linkedinn.jpg"
import farmer from "./bgHero.jpg"
import farm1 from "./green.jpg"

export default function LandingPage(){
 
    return (
        <div className = "landingPage">
        <Body></Body>
        <Footer></Footer>
     
        </div>
    )

}

function NavBar(){
       let navigate = useNavigate();

    const [ signedIn , setSignedIn ] = useState(false);
    let menuRef = useRef();
    let topRef = useRef();
    
    useEffect(() => {
        if(!localStorage.getItem("token")){
        setSignedIn(false);
        return;}

        async function userChecker(){
            try{
            let response = await axios.get("https://kheti-yda3.vercel.app/users/check",{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")}
            })
            console.log("hello")
            setSignedIn(true);}
        
         catch(err){
            console.log(err);
             setSignedIn(false);
              localStorage.clear("token")}
        }
        userChecker();
}, []);



    

    return(
        <div className = "navBar">
            <div className="plainMenu">
                <div className="logoNestMenu" onClick = {()=>{navigate("/")}}>K H E T I</div>
                <div className="navLinks">
                    { signedIn ? 
                    (<><div className="navItem" onClick = {()=>{navigate("/products")}}>F E E D</div>
                       <div className="navItem" onClick = {()=>{navigate("/create")}}>S T O R E</div>
                       <div className="navItem" onClick = {()=>{navigate("/profile")}}>P R O F I L E</div></>) 
                       : 
                    (<><div className="navItem" onClick = {()=>{navigate("/signup")}}>S I G N &nbsp; U P</div>
                       <div className="navItem" onClick = {()=>{navigate("/login")}}>L O G I N</div></>)}
                 
                </div>
            </div>
            <div className="sideMenu" ref = {topRef}>
                <div className="logoNestMenu">K H E T I</div>
                <img src={Menu}  onClick = {()=>{
                    if(menuRef.current.style.display === "none") menuRef.current.style.display = "flex";
                    else menuRef.current.style.display = "none";
                    if(topRef.current.style.position==="absolute") topRef.current.style.position = "fixed";
                    else topRef.current.style.position = "absolute"
                
                }} alt="" /></div>


            <div className="sideMenuOpen" ref = {menuRef}>
                { signedIn ? 
                    (<><div className="navItem" onClick = {()=>{navigate("/products")}}>F E E D</div>
                       <div className="navItem" onClick = {()=>{navigate("/create")}}>S T O R E</div>
                       <div className="navItem" onClick = {()=>{navigate("/profile")}}>P R O F I L E</div></>) 
                       : 
                    (<><div className="navItem" onClick = {()=>{navigate("/signup")}}>S I G N &nbsp; U P</div>
                       <div className="navItem" onClick = {()=>{navigate("/login")}}>L O G I N</div></>)}

            </div>


    </div>
    )

}






function Body(){
    return(
        <div className = "body">
    <HeroSection></HeroSection>
    <SmallCard></SmallCard>
    <div className="sliderArea"><Sliderr></Sliderr></div>
    <TypeWriter></TypeWriter>
    <MidCard></MidCard>
    
    </div>
    )

}


function HeroSection(){
    return (
        <div className="heroSection">
            <img src={farmer} alt="" />
            <div className="bgHero1"></div>
            <div className="bgHero2"></div>
            <NavBar></NavBar>
            <FirstPart></FirstPart>
        </div>
    )
}

function FirstPart(){
    let navigate  = useNavigate();
    let changeRef = useRef();
    // useEffect(()=>{
    //     let count = 0;
    //     let flag = false;
    //     setInterval(()=>{
    //         if(count==-10) flag = true;
    //         else if(count==50) flag = false;
    //         if(flag) count++;
    //         else count--;
    //         if(changeRef.current) changeRef.current.style.transform = `scale(${1+count/700})`;

    //     },50)

    // },[])
    // return(
    //     <>
    //     <div className = "firstPart">
    //     <div className = "leftPart">
    //         <div className="textContainer1">
    //             <div className = "line1">N &nbsp; &nbsp;E &nbsp; &nbsp; S &nbsp; &nbsp; T</div>
    //             <div className = "line2">Network Of Exchange And student Trade</div>
    //             <div className="line3">Nest is an e-commerce platform for the GBPUAT Pantnagar community, designed to facilitate the buying and selling of both second-hand and new items. It offers a convenient, secure, and efficient way for students and staff to exchange goods, promoting affordability, sustainability, and ease within the campus environment.</div>
    //         </div> 
    //     <div className="buttonHolder"><div className="letsgo" onClick = {()=>{navigate("/products")}}>E X P L O R E</div></div>
    //     </div>
    //     <div className = "rightPart">
    //         <div className = "blurEffect" ref={changeRef}></div>
    //         <img className = "imgg" src={img} alt="" />
            
    //     </div>
    //     </div>
    //     <div className="gapLanding"></div>
    //     <div className="gapLanding"></div>
    //     </>
    // )

    return (
        <div className="pageInfo">
           <div className="brandName">K H E T I</div>
           <div className="tagLine">GYAN SE KHETI SATH SE SAMRIDDHI</div>
           <div className="moreInfo">Kheti is a gamified agriculture platform designed to bridge the gap between unskilled and skilled farmers. By combining learning with play, Kheti connects farmers, promotes knowledge sharing, and builds a supportive community. Unskilled farmers gain practical guidance from experienced mentors, while skilled farmers earn recognition and rewards. The platform encourages collaboration, sustainable practices, and better decision-making through interactive tools and challenges. Kheti empowers every farmer to learn, teach, and grow together—making farming smarter, more inclusive, and future-ready.</div>
           <div className="buttonHolder"><div className="letsgo" onClick = {()=>{navigate("/products")}}>E X P L O R E</div></div>
        </div>
    )
}


function MidCard(){
    return (
  <>
    <div className="midCard">
      <div className="chamkilaEffectLanding1"></div>
      <div className="chamkilaEffectLanding2"></div>
      <div className="heading">OFFERINGS</div>
      
      <div className="cardSection1">

      
        <div className="cardMid">
          <div className="symbolCard"><img className="newImg" src={newItem} alt="Community" /></div>
          <div className="headingCard">National Farming Community</div>
          <div className="bodyCard">
            Connect with farmers from across the country. Share knowledge, trade produce, and collaborate on best practices. Kheti builds a nationwide network, helping farmers learn, grow, and support each other wherever they are.
          </div>
        </div>

        
        <div className="cardMid">
          <div className="symbolCard"><img className="newImg" src={oldItem} alt="Gamification" /></div>
          <div className="headingCard">Gamification & Rewards</div>
          <div className="bodyCard">
            Participate in weekly and monthly challenges to earn points and unlock rewards. Kheti makes farming engaging by turning achievements, crop milestones, and participation into incentives that benefit farmers and encourage continuous learning.
          </div>
        </div>

       
        <div className="cardMid">
          <div className="symbolCard"><img className="newImg" src={rentItem} alt="Inbuilt Store" /></div>
          <div className="headingCard">Inbuilt Store</div>
          <div className="bodyCard">
            Buy and sell seeds, tools, fertilizers, and other farm essentials directly on the platform. Kheti’s inbuilt store ensures access to trusted products at fair prices while connecting farmers with reliable local suppliers.
          </div>
        </div>

      </div>
    </div>

    <div className="gapLanding"></div>
    <div className="gapLanding"></div>
    <div className="gapLanding"></div>
  </>
)

}


function Sliderr(){
const sliderInfo = [
  {
    title: "Local",
    content: "Built for farmers’ communities by agri-enthusiasts.",
    description:
      "Kheti focuses on connecting farmers, buyers, and agri-experts within local regions. In areas far from big markets, farmers often struggle to sell crops or find supplies. Our platform brings the marketplace to their community, making it easy to trade seeds, produce, and tools without traveling long distances."
  },
  {
    title: "Community",
    content: "Leveraging strong agricultural networks.",
    description:
      "Farming communities thrive on collaboration, festivals, and shared knowledge. Kheti taps this spirit by connecting farmers, agritech specialists, and local buyers. Just as harvest fairs unite villages, our platform builds trust and mutual support within the farming community, enabling peer-to-peer trade and information sharing."
  },
  {
    title: "Convenience",
    content: "Quick access to farming essentials.",
    description:
      "Farmers often travel far to purchase seeds, fertilizers, or tools. Kheti eliminates this by providing instant access to needed items online. Users can list, browse, and order supplies from their mobile devices, saving time, effort, and transport costs while keeping their focus on farming."
  },
  {
    title: "Safe",
    content: "Trusted trades within the agricultural network.",
    description:
      "Kheti ensures that every buyer and seller is verified. By focusing on local communities and trusted members, transactions are secure and transparent. Farmers can trade confidently knowing they are interacting with genuine users, reducing the risks of fraud and disputes in rural markets."
  },
  {
    title: "Sustainable",
    content: "Promoting eco-friendly practices.",
    description:
      "Kheti encourages the reuse of equipment, sharing of surplus produce, and responsible farming techniques. Farmers can sell extra tools or crops instead of discarding them, reducing waste. This supports both the environment and the economic sustainability of rural communities, in line with traditional agricultural values."
  },
  {
    title: "Affordable",
    content: "Save money through peer-to-peer trade.",
    description:
      "Farmers on a tight budget benefit from Kheti’s platform, as it provides low-cost, locally available supplies and produce. Without intermediaries or delivery charges, farmers can buy and sell at fair prices. This ensures access to quality resources while maximizing profits and minimizing costs."
  },
  {
    title: "Flexible",
    content: "Trade anytime, anywhere.",
    description:
      "Kheti’s platform allows farmers to set prices, meeting points, and trading schedules. Buyers can choose what, when, and where to purchase. This flexibility accommodates unpredictable farm routines, weather constraints, and varying crop cycles, making agricultural trading convenient for all participants."
  },
  {
    title: "Innovative",
    content: "Harnessing modern agri-tech solutions.",
    description:
      "Kheti integrates digital tools for smarter farming, such as crop monitoring, AI-based suggestions, and market analytics. By going online, farmers adopt modern techniques for trading and production. The platform modernizes traditional practices, making it a forward-thinking solution for rural communities."
  },
  {
    title: "Regional",
    content: "Tailored for specific farming areas.",
    description:
      "Kheti adapts to local agricultural landscapes, soil types, and climate conditions. Farmers in different regions can connect with nearby buyers and suppliers. By focusing on regional needs, the platform ensures relevant resources and services are accessible, boosting efficiency and productivity."
  },
  {
    title: "Opportunity",
    content: "Empowering farmer entrepreneurship.",
    description:
      "Kheti acts as a launchpad for small-scale farmers and agri-entrepreneurs. Farmers can sell niche crops, handmade fertilizers, or organic products directly to consumers. The platform provides a built-in marketplace, fostering business skills, income growth, and independence within rural communities."
  },
  {
    title: "Cultural",
    content: "Celebrating farming traditions.",
    description:
      "Kheti promotes local agricultural culture, like regional crops, traditional farming methods, and harvest festivals. Farmers can sell handcrafted or traditional products, preserving heritage while earning income. This keeps cultural practices alive and integrates them into everyday commerce."
  },
  {
    title: "Essential",
    content: "Meeting critical farming needs.",
    description:
      "Before Kheti, farmers often lacked easy access to markets and supplies. Our platform fills that gap by centralizing resources, enabling crop trade, and providing timely access to tools and information. It acts as vital infrastructure, supporting daily farming operations and the rural economy."
  }
];


    return(
        <><Slider info = {sliderInfo}></Slider>    
        <div className="gapLanding"></div>
        <div className="gapLanding"></div>
        </>
    )
}





function TypeWriter(){
    return (
        <>
    <div className="typeWriter">
        <div className="initialText">TO COMBAT FRAUD AND ABUSE , {"\u00A0"} </div>
        <span style={{ color: "white" }} className='finalTypewriterText'>
            {" "}
      <Typewriter
          words={[
            ' EACH LISTING REQUIRES AT LEAST FIVE CARD DESCRIPTIONS.',
        'ACCOUNT SETUP IS MANDATORY FOR SELLERS',
      ' PRODUCT DETAILS CANNOT BE CHANGED AFTER LISTING.',
      ' NO MESSAGING FEATURE IS AVAILABLE ON THIS PLATFORM.',
      ' SELLERS SHARE THEIR CONTACT PLATFORMS SEPARATELY.',
      'ONLY TWO POSTS ALLOWED PER SELLER',
      ' POSTS ARE AUTOMATICALLY REMOVED AFTER TWO DAYS.',
      ' SELLER PERSONAL INFO REMAINS HIDDEN UNLESS SHARED.',
      ' EACH LISTING REQUIRES AT LEAST FIVE CARD DESCRIPTIONS.',
      ' MISSING DESCRIPTIONS CAN SIGNAL A POSSIBLE SCAM.',
      ' PROFILE CHANGES DO NOT ALTER PRODUCT INFORMATION.',
      ' REGULAR MANUAL CHECKS ARE DONE ON ALL ACCOUNTS.'
    ]}

        loop={true}
        cursor
        cursorStyle="_" 
        typeSpeed={40}
        deleteSpeed={30}
        delaySpeed={1500}
  
        style = {{color: "white"}}
      />
      </span>
    </div>
     <div className="gapLanding"></div>
        <div className="gapLanding"></div>
        <div className="gapLanding"></div>
        </>
  );
}



function SmallCard(){
const nestInfo = [
  {
    title: "WHAT IS KHETI?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "KHETI is a trusted digital platform connecting farmers, buyers, and agricultural experts. A safe space where your crops, produce, and farming solutions come together — your community’s own digital kheti hub."
  },
  {
    title: "WHY CHOOSE KHETI?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "With KHETI, you get reliability, guidance, and growth opportunities. We help farmers access markets, learn modern practices, and make informed decisions — all within a secure, farmer-friendly ecosystem."
  },
  {
    title: "WHO CAN USE KHETI?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "KHETI is for farmers, agri-entrepreneurs, traders, and agriculture enthusiasts. If you cultivate, sell, or innovate in farming, our platform is open for you to connect, share, and thrive."
  },
  {
    title: "HOW KHETI WORKS?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "Sign up, add your crops or produce, track progress, and connect instantly. KHETI’s intuitive design ensures your offerings reach the right buyers and experts — a hub where opportunity and agriculture meet."
  },
  {
    title: "SAFETY AT KHETI?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "Our platform is protected by verification, quality checks, and secure trade systems. Every interaction and transaction is transparent, so farmers can engage confidently and safely every time."
  },
  {
    title: "GROW WITH KHETI?",
    backgroundImage: "linear-gradient(to right, #dce35b3c 0%, #73ff005a 51%, #dce35b70 100%)",
    description: "Start with your farm, expand your reach — KHETI supports growth. Showcase produce, gain insights, access markets, and build lasting trust within your local farming community."
  }
];





    return(
        <>
        <div className="smallCard">
            <img src={farm1} alt="" />
            <div className="bgHeroo1"></div>
            <div className="bgHeroo2"></div>
             <div className="bgHeroo3"></div>
            <div className="headingSmallCard">A B O U T</div>
            <div className="smallCardContainer" >
            { nestInfo.map((val)=>(
                <div className="cardSmallDetail" key = {val.title} style=  {{backgroundImage: val.backgroundImage}}>
                    <div className="headingSmallCardDetail">{val.title}</div>
                    <div className="contentSmallCard">{val.description}</div>
                </div>
            ))}
             </div>
        </div>
        <div className="gapLanding"></div>
        <div className="gapLanding"></div>
        </>
    )
}





function Footer(){
    return(
        <div className = "footer">
            <div className="topFooter">
                <div className="logoFooter">K H E T I</div>
                <div className="aboutDeveloper">
                    <div className="headingDeveloper">ABOUT DEVELOPER</div>
                    <div className="contentDeveloper">We are Team Kheti, a group of six passionate students from GBPUAT Pantnagar, united by a clear vision to serve farmers. Driven by technology and innovation, we have created a digital platform that connects, empowers, and supports farmers across the nation. By helping farmers thrive, our project not only strengthens agricultural communities but also contributes to the growth and development of the country automatically.</div>
                </div>
            </div>
            <div className="midFooter"></div>
        
            <div className="bottomFooter">
                <div className="imageSocial">
                    <a href="https://x.com/HelloitsBharat?t=ijOOl3fZ0LXwpc9qXiiKjQ&s=09" className='socialLogoContainer' target="_blank" rel="noopener noreferrer"><img src={twitter} className = "logoSocial"  alt="" /></a>
                     <a href="https://www.linkedin.com/in/bharatsati?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className='socialLogoContainer' target="_blank" rel="noopener noreferrer"><img src={linkedin} className = "logoSocial"  alt="" /></a>
                      <a href="" className='socialLogoContainer' target="_blank" rel="noopener noreferrer"><img src={whatsApp} className = "logoSocial"  alt="" /></a>
                       <a href="mailto:mailforcodingg@gmail.com" className='socialLogoContainer' target="_blank" rel="noopener noreferrer"><img src={gmail} className = "logoSocial"  alt="" /></a>
                </div>
                <div className="copyright">© 2025 Nest. All rights reserved.</div>
            </div>

    </div>
    )

}