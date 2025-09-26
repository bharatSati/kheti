import "./productDetail.css"
import { SideBar } from "../sideBar/sideBar.jsx";
import { NavBar2 } from "../navBar2/navBar2.jsx"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import User from "./user.png"
import {Slider} from "../slider/slider.jsx"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function ProductDetail(){
    let location = useLocation();
    let navigate = useNavigate();
    const [condition , setCondition] = useState(false);
    let productDetail  = location.state?.productDetail;

    useEffect(()=>{
        if(!productDetail){
            console.log("hekko")
            toast.error("Invalid Operation")
            navigate("/products")}
   },[productDetail,navigate])
   let [ product , setProduct ] = useState(productDetail);
     let remPart = useRef();
  
   
    
useEffect(() => {
    function handleResize() {
        if(!remPart.current) return;

        if(window.innerWidth <= 1150) remPart.current.style.marginLeft = "0px"; 
        else remPart.current.style.marginLeft = condition ? "250px" : "0px";}

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
}, [condition]);



        return(
            <div className="detailPage">
                    <NavBar2 condition = {condition} setCondition = {setCondition}> </NavBar2>
        <SideBar condition = {condition} setCondition = {setCondition}></SideBar>
                        <div className="productDetailPage" ref = {remPart}> 
                            <div className="backgrnd">
                                <div className="imageBox">
                                <img src={product?.image || User} alt="" />
                                </div>
                            <div className="extraInfo">
                                    <div className="title">{product?.title || " "}</div>
                                    <div className="logoAndName">
                                        <div className="logo"><img src={product?.ownerAvatar || " "} onClick={()=>{
                                            navigate("/profile",{
                                                state:{productOwner: product.owner}
                                            })
                                        }} alt="" /></div>
                                        <div className="nameAndDateDetails">
                                            <div className="nameDetails">{product?.ownerName }</div>
                                            <div className="dateDetails">{new Date(product?.createdOn || " ").toLocaleDateString("en-US", { 
                                                                                        month: "long", 
                                                                                        day: "numeric", 
                                                                                        year: "numeric"}) }</div>
                                        </div>
                                        <div className="tagDetails">{product?.type || " "}</div>
                                        
                                    </div>
                                  
                                </div>
                            </div>


                                <div className="gapDetails"></div>
                        

                        <div className="sliderooo"><Sliderr product = {product || " " }></Sliderr></div>

                        <div className="gapDetails"></div>
                        <div className="gapDetails"></div>


                        </div>
            </div>
        
    )
}



    

function Sliderr({product}){

const sliderInfo = [
  {
    title: "Contact",
    content: "Let’s Start the Conversation Today",
    description: product?.contact || " "
  },
  {
    title: "Details",
    content: "Why This Product is Worth Owning",
     description: product?.details || " "
  },
  {
    title: "Price",
    content: "The Best Deal You’ll Find Today",
     description: product?.price || " "
   },
{
    title: "Quality",
    content: "Quality That Speaks for Itself",
    description: product?.quality || " "
},
{
    title: "Policy",
    content: "Our Commitment to Honest Dealings",
    description: product?.policy || " " }]

  
    return(
        <Slider info = {sliderInfo}></Slider>
    )
}

