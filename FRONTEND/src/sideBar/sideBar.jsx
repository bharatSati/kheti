import "./sideBar.css"
import  Menu from "./menu.png"
import Home from "./home.png"
import Profile from "./profile.png"
import Shop from "./shop.png"
import { useRef } from "react"
import { useEffect } from "react"
import EditProfile from "./editProfile.png"
import Create from "./create.png"
import { useNavigate } from "react-router-dom"
import  Logout  from "./logout.png"

export function SideBar({condition,setCondition}){
let closeRef1 = useRef();
let closeRef2 = useRef();
let navigate = useNavigate();
let menu = [
    {
        src: `${Home}`,
        name: "H O M E",
        changeRoute: "/"},
    {
        src: `${Profile}`,
        name: " P R O F I L E",
        changeRoute: "/profile"},
    {
        src: `${Shop}`,
        name: "S H O P",
        changeRoute: "/products"},
    {
        src: `${ Create }`,
        name: "C R E A T E",
        changeRoute: "/create"},
    
]

useEffect(() => {
  if (condition) {
    closeRef1.current.style.display = "flex";
    closeRef2.current.style.display = "flex";
  } else {
    closeRef1.current.style.display = "none";
    closeRef2.current.style.display = "none";
  }
}, [condition]);


    return(
        
        <>
        <div className="bg" ref = {closeRef1}></div>
            <div className="sideBarBox" ref = {closeRef2}>
            <div className="cancelButton"><img onClick = {()=>{
                setCondition(false)
            }} src={Menu} alt="" /></div>
            {menu.map((element)=>{
                return <ButtonRenderer key = {element.name} {...element}></ButtonRenderer>

            })}
             <div className="buttonContainer" onClick= {()=>{
                localStorage.clear("token");
                navigate("/signup");
       }}>
            <div className="imgContainer"><img src={Logout} alt="" /></div>
            <div className="textContainer">L O G O U T</div>
        </div>
            <div className="brand">n e s t</div>

        </div>
        </>
        
    )

function ButtonRenderer({src,name,changeRoute}){
    return(
        <div className="buttonContainer" onClick= {()=>{
            navigate(changeRoute)
       }}>
            <div className="imgContainer"><img src={src} alt="" /></div>
            <div className="textContainer">{name}</div>
        </div>
    )
}
    
}