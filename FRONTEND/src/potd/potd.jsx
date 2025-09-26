import { NavBar2 } from "../navBar2/navBar2.jsx";
import { useState, useEffect, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DotGrid from '../DotGrid/DotGrid.jsx';
import DomeGallery from '../domeGallery/domeGallery.jsx';

export default function Potd() {
    const navigate = useNavigate();
    const [condition, setCondition] = useState(false);
    const [potdImages, setPotdImages] = useState([]);
    const remPart = useRef();

    useEffect(() => {
        async function fetchPotdImages() {
            try {
                const res = await axios.get("https://kheti-yda3.vercel.app/potd/potdImages", {
                    headers: { authorization: "Bearer " + localStorage.getItem("token") }
                });

                if (res.data.success && res.data.images.length > 0) {
                    // Transform to DomeGallery expected format
                    const formattedImages = res.data.images.map(url => ({ src: url, alt: "POTD" }));
                    setPotdImages(formattedImages);
                } else {
                    toast.info("No POTD images available");
                    setPotdImages([]);
                }
            } catch (err) {
                console.error(err);
                toast.error("Unable to fetch POTD images");
            }
        }

        fetchPotdImages();
    }, []);

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
                <DomeGallery images={potdImages} />
            </div>
        </div>
    );
}
