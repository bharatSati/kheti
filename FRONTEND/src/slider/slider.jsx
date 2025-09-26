
import "./slider.css";
import "../productDetail/productDetailSlider.css"
import left from "./left.png"
import right from "./right.png";
import back from "./back.png"
import forward from "./forward.png";
import { useRef } from "react";


export function Slider(props){
    let refSlider = useRef();
    let count = props.info.length;
    let counter = 0;
    return(
        <div className = "parentSlider">
            <div className="effectSlider"></div>

        <div className="sidebarSlider" onClick={()=>{
            counter--;
            if(counter==-1) counter = count-1;
            refSlider.current.style.transform = `translateX(-${counter * (100/count)}%)`;

        }} ><img src={left} className = "sliderImg" alt="" /></div>


        <div className="slider">

            
            
                <div className="childSlider" ref = {refSlider}  style={{ "--count": count }}>
                {props.info.map((value,key)=>(
                <div key = {key} className="sliderBody">
                <div className="headingSlider">{value.title}</div>
                <div className="subTopicSlider">{value.content}</div>
                <div className="boxSlider">
                    <div className="boxConatinerSlider">{value.description}</div>
                </div>
                </div>
        ))}
                </div>
       </div>
            <div className="sidebarSlider"   onClick={()=>{
            counter++;
            if(counter==count) counter = 0;
            refSlider.current.style.transform = `translateX(-${counter * (100/count)}%)`;

        }}><img src={right} className = "sliderImg" alt="" /></div>
        </div>

    )
}