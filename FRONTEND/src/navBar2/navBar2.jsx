import "./navBar2.css";
import User from "./user.png";
import Menu from "./menu.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import FlowingMenu from '../FlowingMenu/flowingMenu.jsx';

export function NavBar2() {
  const [userImg, setUserImg] = useState(User);
  const [menuOpen, setMenuOpen] = useState(false); // <-- menu state
  const navigate = useNavigate();

  useEffect(() => {
    async function avatarFinder() {
      try {
        let response = await axios.get("https://kheti-yda3.vercel.app/users/me", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setUserImg(response.data.avatar);
      } catch (err) { }
    }
    avatarFinder();
  }, []);

  const demoItems = [
    { link: "/", text: 'H O M E', image: '' },
    { link: "/feed", text: 'F E E D', image: '' },
    { link: "/products", text: 'S T O R E', image: '' },
    { link: "/profile", text: 'P R O F I L E', image: '' },
    { link: "/potd", text: 'P O T D', image: '' },
    { link: "/postfeed", text: 'P O S T', image: '' },
    { link: "/create", text: 'L I S T\u00A0\u00A0P R O D U C T', image: '' },

    
  ];

  return (
    <div>
      <div className="navBody">
        <img className="menuu" onClick={() => setMenuOpen(true)} src={Menu} alt="Menu"/>
        <img className="avatar" onClick={() => navigate("/profile")} src={userImg} alt="User"/>
      </div>
      
      {menuOpen && (
        <div className="flow">
          <FlowingMenu items={demoItems} />

      
          <button className="closeButton"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '4px'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
