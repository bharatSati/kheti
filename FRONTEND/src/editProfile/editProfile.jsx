import Profile from "../profile/profile.jsx";
import "./editProfile.css"
import Close from "./close.png"
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export default function EditProfile() {
    let imageRef = useRef();
    const [name, setName] = useState("User");
    const [password, setPassword] = useState("12345678");
    const [contact, setContact] = useState("Aapko Kaha Contact Kare");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city, setCity] = useState("Not selected");

    const navigate = useNavigate();

    useEffect(() => {
        async function existingDetails() {
            try {
                let response = await axios.get("http://localhost:3000/users/me", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setName(response.data.name);
                setPassword(response.data.password);
                setContact(response.data.contact);

             
                if (response.data.location) {
                    setLatitude(response.data.location.lat);
                    setLongitude(response.data.location.lng);
                   setCity(response.data.location.city);
                }
            } catch (err) {
                toast.error("Can't fetch existing user details!");
            }
        }
        existingDetails();
    }, []);

  
    async function pickLocation() {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported!");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    setLatitude(lat);
    setLongitude(lng);

    try{
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await res.json();
        setCity(data.city || data.locality || data.principalSubdivision || "Unknown");
        setCity(data.address.city || data.address.town || data.address.village || "Unknown");
        toast.success("Location picked successfully!");} 
    catch (err) {toast.error("Could not fetch city name");}
}, () => { toast.error("Location access denied");});

    }

    async function editing() {
        let token = localStorage.getItem("token");
        let cleanedName = name.trim();
        let cleaneddName = cleanedName.slice(0, 14)
        let cleanedPassword = password.replace(/\s+/g, "")
        let cleanedContact = contact.trim();
        let input = new FormData();
        if (imageRef.current.files[0]) input.append("avatar", imageRef.current.files[0]);
        input.append("name", cleaneddName);
        input.append("password", cleanedPassword);
        input.append("contact", cleanedContact);
        input.append("latitude", latitude);
        input.append("longitude", longitude);
        input.append("city", city);

        try {
            let response = await axios.put("http://localhost:3000/users/update", input,
                {
                    headers: {
                        authorization: "Bearer " + token
                    }
                })
            toast.success(response.data.message);
            navigate("/profile")
        } catch (err) {
            if (err.response) toast.error(err.response.data.message);
            else if (err.request) toast.error("Servers can't be reached at the moment");
            else toast.error("Internal error");
        }
    }

    return (
        <>
            <Profile></Profile>
            <div className="cover">
                <div className="editBox">
                    <img src={Close} onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }} alt="" />
                    <div className="bottom">

                        <div className="inputHolder">
                            <div className="text">A V A T A R</div>
                            <input className="inputFile" ref={imageRef} type="file" />
                        </div>

                        <div className="inputHolder">
                            <div className="text">N A M E</div>
                            <input className="input" onChange={(e) => { setName(e.target.value) }}
                                onClick={() => { toast.info("Only first 14 letters will be considered including a space (if exists)") }}
                                type="text" value={name} />
                        </div>

                        <div className="inputHolder">
                            <div className="text">P A S S W O R D</div>
                            <input className="input" onChange={(e) => { setPassword(e.target.value) }}
                                type="password" value={password} />
                        </div>

                      
                        <div className="inputHolder">
                            <div className="text">L O C A T I O N</div>
                            <button className="locationBtn" onClick={pickLocation}>Pick Location</button>
                            <div style={{ color: "white", marginLeft: "20px", fontSize: "12px" }}>
                                {city} 
                            </div>
                        </div>

                        <div className="inputHolderLast">
                            <div className="text">C O N T A C T</div>
                            <textarea className="input" onChange={(e) => { setContact(e.target.value) }}
                                type="text" value={contact} />
                        </div>

                        <button className="editChange" onClick={() => { editing() }}>EDIT CHANGES</button>

                    </div>
                </div>
            </div>
        </>
    )
}
