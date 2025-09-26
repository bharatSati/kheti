import { SideBar } from "../sideBar/sideBar.jsx";
import { NavBar2 } from "../navBar2/navBar2.jsx";
import { useState, useEffect } from "react";
import "./profile.css";
import User from "./user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import bannerImg from "./banner.jpg";
import khetiCoin from "./khetiCoin.png";
import CircularGallery from '../gallery/gallery.jsx';

export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const askedId = location.state?.productOwner || null;

    const [finalUser, setFinalUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [products, setProducts] = useState([]);
    const [userPOTD, setUserPOTD] = useState([]);
    const [reRun, setRerun] = useState(true);

    
    useEffect(() => {
        if (!reRun) return;

        async function profileInfo() {
            try {
                const response = await axios.get(`https://kheti-yda3.vercel.app/users/profile?id=${askedId}`, {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });

                setUserId(response.data.reqId);
                setFinalUser(response.data.finalUser);
            } catch (err) {
                if (err.response && err.response.data.signedOut) {
                    toast.error("Please set up your account first!!");
                    navigate("/signup");
                } else if (err.response) toast.error(err.response.data.message);
                else if (err.request) toast.error("Server can't be reached at the moment!!");
                else toast.error("Internal Error!!");
                navigate("/products");
            }
        }

        profileInfo();
    }, [reRun, askedId, navigate]);

   
    useEffect(() => {
        if (!userId) return;

        async function productFinder() {
            try {
                const response = await axios.get(`https://kheti-yda3.vercel.app/products/productsInfo?userId=${userId}`, {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });
                setProducts(response.data);
            } catch (err) {
                if (err.response) toast.error(err.response.data.message);
                else if (err.request) toast.error("Server can't be reached at the moment!!");
                else toast.error("Internal Error!!");
                navigate("/products");
            }
        }

        productFinder();
    }, [userId, reRun, navigate]);

  
    useEffect(() => {
        if (!userId) return;

        async function fetchPOTD() {
            try {
                const response = await axios.get(`https://kheti-yda3.vercel.app/potd/userPotd?userId=${userId}`, {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });

                setUserPOTD(response.data || []);
            } catch (err) {
                if (err.response) toast.error(err.response.data.message);
                else if (err.request) toast.error("Server can't be reached at the moment!!");
                else toast.error("Internal Error!!");
            }
        }

        fetchPOTD();
    }, [userId]);

    return (
        <div className="profilePage">
            <div className="bannerAndInfo">
                <div className="bannerProfile">
                    <div className="points">
                        <img src={khetiCoin} alt="" />
                        <div className="countPoints">× {finalUser.points || "10"} KHETI COINS</div>
                    </div>
                    <img src={bannerImg} alt="" />
                </div>

                <div className="infoProfile">
                    <div className="photoProfile">
                        <img src={finalUser.avatar || User} alt="" />
                    </div>
                    <div className="infoo">
                        <div className="nameProfile">{finalUser.name || " "}</div>
                        <div className="usernameProfile">@{finalUser.username || " "}</div>
                    </div>

                    {finalUser.same ? (
                        <div className="button" onClick={() => navigate("/editprofile")}>EDIT &nbsp; PROFILE</div>
                    ) : (
                        <div className="button">{finalUser.city || "Almora"}</div>
                    )}
                </div>
            </div>

        
            <div className="roll" style={{ font: '500 14px "Roboto Mono", monospace', height: '600px', position: 'relative' }}>
                <CircularGallery
                    items={userPOTD.length ? userPOTD : [{ image: bannerImg, text: "No Images Addded Yet" }]}
                    bend={0}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                />
            </div>

           
            <div className="myProduct">MY PRODUCTS</div>
            <div className="cardContainerProfile">
                {products.length ? (
                    products.map((val) => (
                        <CardRendererProfile
                            setRerun={setRerun}
                            key={val._id}
                            productInfo={val}
                            finalUser={finalUser}
                        />
                    ))
                ) : (
                    <div className="nameProfile">You have no live product</div>
                )}
            </div>

            <div className="lastSpace"></div>
            <div className="myProduct">CONTACT ME</div>
            <div className="contact">{finalUser.contact || "Not Provided"}</div>
            <div className="lastSpace"></div>
        </div>
    );
}

function CardRendererProfile({ finalUser, productInfo, setRerun }) {
    const navigate = useNavigate();
    const productId = productInfo._id;

    return (
        <div className="cardProfile">
            <div className="productImgProfile"><img src={productInfo.image} alt="" /></div>
            <div className="titleProfile">{productInfo.title}</div>

            {finalUser.same ? (
                <div className="buttonHolderr">
                    <button onClick={async () => {
                        try {
                            await axios.delete(`https://kheti-yda3.vercel.app/products/delete`, {
                                data: { productId },
                                headers: { authorization: "Bearer " + localStorage.getItem("token") }
                            });
                            toast.success("Product successfully deleted!!");
                            setRerun(prev => !prev);
                        } catch (err) {
                            if (err.response) toast.error(err.response.data);
                            else if (err.request) toast.error("Server can't be reached at the moment!!");
                            else toast.error("Internal error!!");
                        }
                    }}>Delete</button>
                </div>
            ) : (
                <div className="buttonHolderr">
                    <button onClick={() => navigate("/productdetail", { state: { productDetail: productInfo } })}>
                        VIEW DETAILS
                    </button>
                </div>
            )}
        </div>
    );
}
