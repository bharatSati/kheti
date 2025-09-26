import { useState , useRef } from 'react';
import './signorlog.css' 
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from "axios";
import { useEffect } from 'react';


 
export function SignorLog(props){
    let usernameRef = useRef();
    let passwordRef = useRef();
    const navigate = useNavigate();


    const [ loading , setLoading ] = useState(false)

   useEffect(() => {
    if(!localStorage.getItem("token")) return;
        async function userChecker(){
            try{
            let response = await axios.get("http://localhost:3000/users/check",{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")}
            })
            toast.info("Already Logged In !!");
            navigate("/products");
            return;}
        
         catch(err){
    }
        }
        userChecker();
}, [navigate]);



async function signupHandler(){
    if(loading) return;
    setLoading(true);
    let inputUsername = usernameRef.current.value;
    let inputPassword = passwordRef.current.value;
    let username = "";
    let password = ""
    for(let i = 0;i<inputUsername.length;i++){
        if(inputUsername[i]!=" ") username+=inputUsername[i];}
    for(let i = 0;i<inputPassword.length;i++){
        if(inputPassword[i]!=" ") password+=inputPassword[i];}
    try{
        let response  = await axios.post("http://localhost:3000/users/signup",{
            username,
            password,})
        localStorage.setItem("token",response.data.token);
        toast.success(response.data.message);
        console.log("SignUp Success");
        navigate("/products");}

    catch(err){
        if(err.response){
            toast.error(err.response.data.message);}
        else if(err.request) toast.error("Server Not Recahable");
        else toast.error("Signup Unsuccessful")
    }
     setLoading(false);
}




  
    
async function loginHandler(){
    if(loading) return;
    setLoading(true);
    let inputUsername = usernameRef.current.value;
    let inputPassword = passwordRef.current.value;
    let username = "";
    let password = ""
    for(let i = 0;i<inputUsername.length;i++){
        if(inputUsername[i]!=" ") username+=inputUsername[i];}
    for(let i = 0;i<inputPassword.length;i++){
        if(inputPassword[i]!=" ") password+=inputPassword[i];}
    try{
        let response  = await axios.post("http://localhost:3000/users/signin",{
            username,
            password,})
        localStorage.setItem("token",response.data.token);
        toast.success("Login Success");
        console.log("Login Success");
        navigate("/products");}

    catch(err){
        if(err.response){
            toast.error(err.response.data.message);}
        else if(err.request) toast.error("Server Not Recahable");
        else toast.error("Signup Unsuccessful")
    }
    setLoading(false);
}






    return(
        <div className="main">
            <div className = "signUpBg">
            <div className="infooo"></div>
            <div className="signUpBox">
                <div className="headingSign">K H E T I</div>
                <div className="welcome">{props.props.type}</div>
                <div className="welcomeMessage">Welcome to KHETI! Where fields thrive, farmers connect, and every harvest begins with happiness.</div>
                <div className="set">
                    <div className="statement">username</div>
                    <input className = "input" type="text" ref = {usernameRef} placeholder='username'/>
                </div>
                <div className="set">
                    <div className="statement">password</div>
                    <input className = "input" ref = {passwordRef} type="password" placeholder='password'/>
                </div>
                <button id = "login" disabled = {loading} onClick = {()=>{
                    if(props.props.type==="SIGN UP")  return signupHandler()
                    if(props.props.type==="LOGIN")  return loginHandler();
                    }}>  {loading ? "Loading..." : props.props.type}   </button>
                <div className="last">
                    <div className="s1">{props.props.s1}</div>
                    <div className="s2" onClick={()=>navigate(props.props.source)}   style={{ cursor: 'pointer' }} >{props.props.s2}</div>
                </div>
                <div className="password"></div>
            </div>
        </div>

        </div>
    )
}