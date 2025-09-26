import "./products.css"
import { NavBar2 } from "../navBar2/navBar2.jsx"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import  Image  from "./guitar.jpg"
import User from "./user.png"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from "axios";
import searchImg from "./search.png"
import { useNavigate } from "react-router-dom";
import DotGrid from '../DotGrid/DotGrid.jsx';


export default function Products(){
    let navigate = useNavigate();
    let searchRef = useRef();
    const [condition , setCondition] = useState(false);
    const [ search , setSearch ] = useState(" ");
    const [users,setUsers] = useState([]);
    let remPart = useRef();




    useEffect(()=>{
        async function usersFind(){
            try{
                let response = await axios.get(`https://kheti-yda3.vercel.app/products/filter?q=${searchRef.current.value}`,{
                headers:{
                    authorization: "Bearer "+localStorage.getItem("token")}
            })
                setUsers(response.data);
                if(!response.data.length) toast.warning("No Product Matched")}
            catch(err){
                if(err.response.data.signedOut){
                    toast.error("Please set up your account first!!");
                    navigate("/signup")
                    return;
                }
                toast.error("Search Unsuccessful!!")}
            }
        usersFind()
        },[search])
    


    
    

    return(
        <div className="page">
                    

  <DotGrid
    dotSize={6}
    gap={15}
    baseColor="#002a03ff" activeColor="#14ff4b"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
        <NavBar2 condition = {condition} setCondition = {setCondition}> </NavBar2>
            <div className="productPage" ref = {remPart}>
        

                <div className="searchBox" >
                    <input type="text" ref = {searchRef} onChange = {(e)=>{if(e.target.value=="") setSearch(!search)}} className="search" placeholder="Enter Product Details" />
                    <div className="searchButton" onClick={()=>{setSearch(!search)}}><img src={searchImg} alt="" /></div>
                    </div>
                <div className="cardContainer">
                    {users.map((val)=>
                        (<CardGenerator productDetail = {val} key = {val._id}></CardGenerator>)

                    )}
                    </div>
            </div>
        </div>
    )
}


    function CardGenerator({productDetail}){

        async function clickIncreaser(){
            try{
                let response = await axios.put("https://kheti-yda3.vercel.app/products/clicks",{
                productId: productDetail._id,
                clicks: productDetail.clicks},
                {
                    headers:{
                        authorization: "Bearer "  + localStorage.getItem("token")}
                    })
               }
             catch(err){
                        if(err.response) toast.error("Can not get your request!! Try Again");
                        else if(err.request) toast.error("Server can't be reached at the moment")
                        else toast.error("Internal error");
                        return;}
        }


        let navigate = useNavigate();

        return(
            
           <div className="card" onClick={()=>{
            clickIncreaser();
            navigate("/productdetail",{
            state:{
                productDetail}
           })}}>
            <div className="productImg"><img src={productDetail.image} alt="" /></div>
            <div className="personInfo">
                    <div className="profilePerson"><img src={productDetail.ownerAvatar} alt="" /></div>
                    <div className="secondPart">
                        <div className="namePerson">{productDetail.ownerName}</div>
                        <div className="date">{new Date(productDetail.createdOn).toLocaleDateString("en-US", { 
                                                                                        month: "long", 
                                                                                        day: "numeric", 
                                                                                        year: "numeric"})}</div>
                    </div>
                    <div className="tagg">{productDetail.type}</div>
            </div>
           </div>
           
           
        )
    }