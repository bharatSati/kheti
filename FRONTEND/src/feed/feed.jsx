import { NavBar2 } from "../navBar2/navBar2.jsx";
import { useState, useRef, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DotGrid from '../DotGrid/DotGrid.jsx';
import "./feed.css"
import SpotlightCard from '../cardSpotlight/cardSpotlight.jsx';
import Farm from "./bgHero.jpg";
import User from "./user.png";

export default function Feed() {
    const navigate = useNavigate();
    const [condition, setCondition] = useState(false);
    const [feed, setFeed] = useState([]);
    const remPart = useRef();

   
    const [potdFile, setPotdFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

   
    useEffect(() => {
        fetchFeed();
    }, []);

    async function fetchFeed() {
        try {
            const userRes = await axios.get("https://kheti-yda3.vercel.app/users/me", {
                headers: { authorization: "Bearer " + localStorage.getItem("token") },
            });

            const { latitude, longitude } = userRes.data;
            if (!latitude || !longitude) {
                toast.error("Your location is not set!");
                return;
            }

            const feedRes = await axios.get(
                `https://kheti-yda3.vercel.app/feed/getFeed?latitude=${latitude}&longitude=${longitude}`,
                { headers: { authorization: "Bearer " + localStorage.getItem("token") } }
            );

            if (feedRes.data.posts && feedRes.data.posts.length) {
                setFeed(feedRes.data.posts);
            } else {
                toast.info("No feed posts found nearby.");
                setFeed([]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Could not fetch feed!");
        }
    }


    async function submitPotd() {
        if (!potdFile) {
            toast.error("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("image", potdFile);

        try {
            setIsSubmitting(true);
            toast.info("Submitting POTD...");

            const res = await axios.post("https://kheti-yda3.vercel.app/potd/addPotd", formData, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("POTD submitted successfully! +1 KHETI COIN");
            navigate("/potd");

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Submission failed!");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="page">
            <DotGrid
                dotSize={6}
                gap={15}
                baseColor="#002a03ff"
                activeColor="#14ff4b"
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
            />

            <NavBar2 condition={condition} setCondition={setCondition} />

            <div className="productPage" ref={remPart}>

                
                <div className="potdCard">
                    <div className="blurHolder"></div>
                    <div className="questionSection">
                        Your task today is to showcase a cultural or traditional aspect of farming in your area that continues to inspire modern practices.
                    </div>
                    <div className="submissisonSection">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPotdFile(e.target.files[0])}
                            disabled={isSubmitting}
                        />
                        <div
                            className={`submitPotd ${isSubmitting ? "disabled" : ""}`}
                            onClick={submitPotd}
                        >
                            {isSubmitting ? "Submitting..." : "SUBMIT"}
                        </div>
                        <div className="pointsGain"></div>
                    </div>
                </div>

               
                <div className="feedContainer">
                    {feed.map((post, index) => (
                        <FeedCard
                            key={index}
                            image={post.image || Farm}
                            description={post.details || "No description provided"}
                            city={post.city || "Unknown"}
                            name={post.ownerName || "Anonymous"}
                            avatar={post.ownerAvatar || User}
                            date={post.createdOn ? new Date(post.createdOn).toLocaleDateString() : ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FeedCard({ image, description, city, name, avatar, date }) {
    return (
        <div className="main">
            <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(33, 207, 255, 0.3)"
            >
                <div className="imageFeed"><img src={image} alt="feed" /></div>
                <div className="contentFeed">
                    <div className="descriptionFeed">{description}</div>
                    <div className="cityFeed">-from {city}</div>
                    <div className="personalFeed">
                        <div className="photoFeed"><img src={avatar} alt="User" /></div>
                        <div className="nameDateFeed">
                            <div className="nameFeed">{name}</div>
                            <div className="dateFeed">{date}</div>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
}
