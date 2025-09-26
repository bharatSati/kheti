import "./postFeed.css"
import { SideBar } from "../sideBar/sideBar.jsx";
import { NavBar2 } from "../navBar2/navBar2.jsx"
import { useState, useRef, useEffect, forwardRef } from "react";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import DotGrid from '../DotGrid/DotGrid.jsx';

export default function Postfeed(){

    let navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
            toast.error("Please set up your account first!!");
            navigate("/signup");
            return;
        }

        async function userChecker(){
            try{
                await axios.get("http://localhost:3000/users/check",{
                    headers:{ authorization : "Bearer " + localStorage.getItem("token") }
                })
            }
            catch(err){
                if(err.response && err.response.data.signedOut) toast.error("Please set up your account first!!");
                else if(err.response) toast.error("Can not get your request!! Try Again");
                else if(err.request) toast.error("Server can't be reached at the moment");
                else toast.error("Internal error");
                navigate("/signup")
                return;
            }
        }
        userChecker();
    }, [navigate]);

    let imageRefSimple = useRef();
    const detailsRefSimple = useRef();
    const [ loading , setLoading ] = useState(false)
    const [condition , setCondition] = useState(false);
    let remPartSimple = useRef();

    async function addProductSimple(){
        if(loading) return;
        setLoading(true);

        

        let details = detailsRefSimple.current.value.trim();
        let input = new FormData();
        if(imageRefSimple.current.files[0]) input.append("image",imageRefSimple.current.files[0])
        input.append("details",details);

        try{
            let response = await axios.post("http://localhost:3000/feed/addPost",input,{
                headers:{ authorization: "Bearer "+localStorage.getItem("token") }
            })
            toast.success(response.data.message);
            navigate("/feed");
        }
        catch(err){
            if(err.response) toast.error(err.response.data.message);
            else if(err.request) toast.error("Server can't be reached at the moment")
            else toast.error("Internal error");
        }
        setLoading(false);
    }

    return(
        <div className="pageCreateSimple">
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
            <NavBar2 condition={condition} setCondition={setCondition}></NavBar2>
            <SideBar condition={condition} setCondition={setCondition}></SideBar>
            <div className="productPageCreateSimple" ref={remPartSimple}>
                <div className="detailsContainerSimple">
                    <div className="chamkilaEffectSimple"></div>

                    <div className="boxProductSimple">
                        <div className="textProductSimple">I M A G E</div>
                        <input className="inputFileSimple" ref={imageRefSimple} type="file" />
                    </div>

                    <CardInfoSimple value={"D E T A I L S"} ref={detailsRefSimple} placeholder={"Write details about your product..."} ></CardInfoSimple>
                    
                    <button className="createSimpleBtn" onClick={()=>{addProductSimple()}}>
                        {(loading) ? "POSTING..." : "POST"}
                    </button>
                </div>
            </div>
        </div>
    )
}

const CardInfoSimple = forwardRef(function CardInfoSimple({value , placeholder} , ref){
    return(
        <div className="boxProductSimple" >
            <div className="textProductSimple">{value}</div>
            <textarea className="textAreaSimple" placeholder={placeholder} ref={ref}></textarea>
        </div>
    )
})
