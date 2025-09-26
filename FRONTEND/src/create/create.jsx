import "./create.css"
import { SideBar } from "../sideBar/sideBar.jsx";
import { NavBar2 } from "../navBar2/navBar2.jsx"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import DotGrid from '../DotGrid/DotGrid.jsx';


export default function Create(){
    

    let navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
        toast.error("Please set up your account first!!");
        navigate("/signup");
        return;}

        async function userChecker(){
            try{
            let response = await axios.get("http://localhost:3000/users/check",{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")}
            })
        }
         catch(err){
                if(err.response&& err.response.data.signedOut) toast.error("Please set up your account first!!");
                else if(err.response) toast.error("Can not get youe request!! Try Again");
                else if(err.request) toast.error("Server can't be reached at the moment")
                else toast.error("Internal error");
                navigate("/signup")
                return;}
        }
        userChecker();
}, [navigate]);






    let imageRef = useRef();
    const titleRef = useRef()
    const contactRef = useRef()
    const detailsRef = useRef()
    const priceRef = useRef()
    const typeRef = useRef()
    const qualityRef = useRef()
    const policyRef = useRef()
    const [ loading , setLoading ] = useState(false)
    const [condition , setCondition] = useState(false);
    let remPart = useRef();

        



        
    async function addProduct(){
            if(loading) return;
            setLoading(true);
    
            
    try{
        let response = await axios.get("https://nest-al8l.vercel.app/products/count",{
            headers:{
                authorization: "Bearer " + localStorage.getItem("token")}
        })
        if(response.data.bool){
            toast.error("Maximum limit reached!!")
            return setLoading(false);}
        }
    catch(err){
        if(err.response)  toast.error(err.response.data.message);
        else if(err.request)  toast.error("Servers can't be reached at the moment");
        else  toast.error("Internal error");
        return setLoading(false);}

        





            let title = titleRef.current.value.trim();
            let contact = contactRef.current.value.trim();
            let details = detailsRef.current.value.trim();
            let price = priceRef.current.value.trim();
            let quality = qualityRef.current.value.trim();
            let policy = policyRef.current.value.trim();
            let type = typeRef.current.value;
            let input = new FormData();
            if(imageRef.current.files[0]) input.append("image",imageRef.current.files[0])
            input.append("title",title);
            input.append("contact",contact);
            input.append("details",details);
            input.append("price",price);
            input.append("quality",quality);
            input.append("policy",policy);
            input.append("type",type);
        try{
            let response = await axios.post("https://nest-al8l.vercel.app/products/add",input,{
                headers:{
                    authorization: "Bearer "+localStorage.getItem("token")}
    })
        toast.success(response.data.message);
        navigate("/profile");}
    
        catch(err){
            if(err.response) toast.error(err.response.data.message);
            else if(err.request) toast.error("Server can't be reached at the moment")
            else toast.error("Internal error");}
    setLoading(false);}


   
    

    
    
    

    return(
        <div className="pageCreate">
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
        <SideBar condition = {condition} setCondition = {setCondition}></SideBar>
            <div className="productPageCreate" ref = {remPart}>
                <div className="detailsContainer">

                <div className="chamkilaEffect"></div>



                     <div className="boxProductt">
                        <div className="textProductt">I M A G E</div>
                        <input className = "inputFilee" ref = {imageRef} type="file" />
                    </div>

                <div className="boxProductt">
                        <div className="textProductt" >T Y P E</div>
                        <select className="tag" ref = {typeRef}>
                            <option value="Service">Service</option>
                            <option value="Refurbished">Refurbished</option>
                            <option value="Rent">Rent</option>
                            <option value="Brand New">Brand New</option>
                        </select>
                    </div>
                    <CardInfo value = {"T I T L E"} ref = {titleRef} placeholder={"Around 20 words are recommended"}  ></CardInfo>
                    <div className="info">Your product listing comes with five pre‑made cards, each having a fixed heading and subheading. You only need to write a 60–70 word description for each. These five cards are compulsory and ensure buyers get all key details. Adding extra cards isn’t available right now.</div>
                    <CardInfo value = {"C O N T A C T"} ref = {contactRef}  placeholder={"Around 70 words are recommended"} ></CardInfo>
                    <CardInfo value = {"D E T A I L S"} ref = {detailsRef} placeholder={"Around 70 words are recommended"} ></CardInfo>
                    <CardInfo value = {"P R I C E"} ref = {priceRef} placeholder={"Around 70 words are recommended"} ></CardInfo>
                    <CardInfo value = {"Q U A L I T Y"} ref = {qualityRef} placeholder={"Around 70 words are recommended"} ></CardInfo>
                    <CardInfo value = {"P O L I C Y"} ref = {policyRef} placeholder={"Around 70 words are recommended"} ></CardInfo>
                    <button className="create" onClick = {()=>{addProduct()}}>{(loading) ? "CREATING...":"CREATE"}</button>
                    
                </div>
                
            </div>
        </div>
    )
}


const CardInfo = forwardRef(function CardInfo({value , placeholder} , ref){
    return(
        <div className="boxProductt" >
                        <div className="textProductt">{value}</div>
                        <textarea className="textAreaTitle" placeholder = {placeholder} ref = {ref}></textarea>
        </div>

    )
})