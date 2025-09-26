import { SideBar } from "../sideBar/sideBar.jsx";
import { NavBar2 } from "../navBar2/navBar2.jsx"
import { useState, useEffect, useRef } from "react";
import "./farmerDashboard.css"
import User from "./user.png";
import { Slider } from "../slider/slider.jsx"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import bannerImg from "./banner.jpg"
import khetiCoin from "./khetiCoin.png"
import CircularGallery from '../gallery/gallery.jsx'

export default function FarmerDashboard() {
    let navigate = useNavigate();
    let location = useLocation();
    
    const [farmerData, setFarmerData] = useState({});
    const [dashboardStats, setDashboardStats] = useState({});
    const [recentOrders, setRecentOrders] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [reRun, setRerun] = useState(true);
    const [loading, setLoading] = useState(true);

    // Fetch farmer dashboard data
    useEffect(() => {
        if (!reRun) return;
        async function fetchDashboardData() {
            try {
                setLoading(true);
                let response = await axios.get(`http://localhost:3000/farmer/dashboard`, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                
                setFarmerData(response.data.farmerInfo);
                setDashboardStats(response.data.stats);
                setRecentOrders(response.data.recentOrders);
                setWeatherData(response.data.weather);
                setNotifications(response.data.notifications);
                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                if (err.response && err.response.data.signedOut) {
                    toast.error("Please set up your account first!!");
                    navigate("/signup");
                    return;
                }
                // else if (err.response) toast.error(err.response.data.message);
                // else if (err.request) toast.error("Server can't be reached at the moment!!")
                // else toast.error("Internal Error!!");
                // navigate("/products");
            }
        }
        fetchDashboardData();
        setRerun(false);
    }, [reRun]);

    // Sample gallery items for farmer activities
    const farmActivities = [
        { image: bannerImg, text: "Harvest Season - Oct 2024" },
        { image: bannerImg, text: "Wheat Planting - Nov 2024" },
        { image: bannerImg, text: "Irrigation Setup - Dec 2024" },
        { image: bannerImg, text: "Crop Monitoring - Jan 2025" },
        { image: bannerImg, text: "Fertilizer Application - Feb 2025" },
        { image: bannerImg, text: "Pest Control - Mar 2025" },
        { image: bannerImg, text: "Soil Testing - Apr 2025" },
        { image: bannerImg, text: "Equipment Maintenance - May 2025" },
        { image: bannerImg, text: "Market Visit - Jun 2025" },
        { image: bannerImg, text: "Crop Planning - Jul 2025" },
        { image: bannerImg, text: "Seed Selection - Aug 2025" },
        { image: bannerImg, text: "Field Preparation - Sep 2025" }
    ];

    if (loading) {
        return (
            <div className="farmerDashboard">
                <div className="loadingContainer">
                    <div className="loadingText">Loading Dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="farmerDashboard">
            {/* Header Section with Farmer Info */}
            <div className="bannerAndInfo">
                <div className="bannerProfile">
                    <div className="points">
                        <img src={khetiCoin} alt="" />
                        <div className="countPoints">× {dashboardStats.khetiCoins || 10} KHETI COINS</div>
                    </div>
                    <img src={bannerImg} alt="" />
                </div>
                <div className="infoProfile">
                    <div className="photoProfile">
                        <img src={farmerData.avatar || User} alt="" />
                    </div>
                    <div className="infoo">
                        <div className="nameProfile">{farmerData.name || "Farmer Name"}</div>
                        <div className="usernameProfile">@{farmerData.username || "farmer"}</div>
                        <div className="farmLocation">{farmerData.location || "Farm Location"}</div>
                    </div>
                    <div className="button" onClick={() => { navigate("/editprofile") }}>EDIT PROFILE</div>
                </div>
            </div>

            {/* Dashboard Stats Cards */}
            <div className="dashboardStats">
                <div className="statCard">
                    <div className="statTitle">TOTAL PRODUCTS</div>
                    <div className="statValue">{dashboardStats.totalProducts || 0}</div>
                </div>
                <div className="statCard">
                    <div className="statTitle">ACTIVE ORDERS</div>
                    <div className="statValue">{dashboardStats.activeOrders || 0}</div>
                </div>
                <div className="statCard">
                    <div className="statTitle">MONTHLY SALES</div>
                    <div className="statValue">₹{dashboardStats.monthlySales || 0}</div>
                </div>
                <div className="statCard">
                    <div className="statTitle">FARM AREA</div>
                    <div className="statValue">{dashboardStats.farmArea || "0"} Acres</div>
                </div>
            </div>

            {/* Weather Widget */}
            <div className="weatherSection">
                <div className="sectionTitle">TODAY'S WEATHER</div>
                <div className="weatherCard">
                    <div className="weatherInfo">
                        <div className="temperature">{weatherData.temperature || "25"}°C</div>
                        <div className="weatherDesc">{weatherData.description || "Sunny"}</div>
                        <div className="humidity">Humidity: {weatherData.humidity || "65"}%</div>
                        <div className="rainfall">Rainfall: {weatherData.rainfall || "0"}mm</div>
                    </div>
                    <div className="weatherAdvice">
                        <div className="adviceTitle">Farm Advice:</div>
                        <div className="adviceText">{weatherData.advice || "Good weather for irrigation and field work."}</div>
                    </div>
                </div>
            </div>

            {/* Farm Activities Gallery */}
            <div className="roll" style={{ font: '500 14px "Roboto Mono", monospace', height: '600px', position: 'relative' }}>
                <CircularGallery items={farmActivities} bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>

            {/* Recent Orders Section */}
            <div className="myProduct">RECENT ORDERS</div>
            <div className="ordersContainer">
                {recentOrders && recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                        <OrderCard key={order._id} orderInfo={order} setRerun={setRerun} />
                    ))
                ) : (
                    <div className="nameProfile">No recent orders</div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="quickActions">
                <div className="myProduct">QUICK ACTIONS</div>
                <div className="actionButtons">
                    <button className="actionBtn" onClick={() => navigate("/addproduct")}>
                        ADD NEW PRODUCT
                    </button>
                    <button className="actionBtn" onClick={() => navigate("/orders")}>
                        VIEW ALL ORDERS
                    </button>
                    <button className="actionBtn" onClick={() => navigate("/inventory")}>
                        MANAGE INVENTORY
                    </button>
                    <button className="actionBtn" onClick={() => navigate("/analytics")}>
                        VIEW ANALYTICS
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="myProduct">NOTIFICATIONS</div>
            <div className="notificationsContainer">
                {notifications && notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationCard key={notification._id} notification={notification} />
                    ))
                ) : (
                    <div className="nameProfile">No new notifications</div>
                )}
            </div>

            {/* Contact Section */}
            <div className="lastSpace"></div>
            <div className="myProduct">CONTACT DETAILS</div>
            <div className="contact">{farmerData.contact || "Contact information"}</div>
            <div className="farmDetails">
                <div className="detailItem">
                    <span className="detailLabel">Farm Type:</span>
                    <span className="detailValue">{farmerData.farmType || "Mixed Farming"}</span>
                </div>
                <div className="detailItem">
                    <span className="detailLabel">Experience:</span>
                    <span className="detailValue">{farmerData.experience || "5"} Years</span>
                </div>
                <div className="detailItem">
                    <span className="detailLabel">Certification:</span>
                    <span className="detailValue">{farmerData.certification || "Organic Certified"}</span>
                </div>
            </div>
            <div className="lastSpace"></div>
        </div>
    )
}

// Order Card Component
function OrderCard({ orderInfo, setRerun }) {
    let navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12';
            case 'confirmed': return '#27ae60';
            case 'delivered': return '#2ecc71';
            case 'cancelled': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    return (
        <div className="orderCard">
            <div className="orderHeader">
                <div className="orderId">Order #{orderInfo.orderId}</div>
                <div 
                    className="orderStatus" 
                    style={{ color: getStatusColor(orderInfo.status) }}
                >
                    {orderInfo.status?.toUpperCase()}
                </div>
            </div>
            <div className="orderDetails">
                <div className="orderItem">{orderInfo.productName}</div>
                <div className="orderQuantity">Qty: {orderInfo.quantity}</div>
                <div className="orderAmount">₹{orderInfo.amount}</div>
            </div>
            <div className="orderDate">{new Date(orderInfo.orderDate).toLocaleDateString()}</div>
            <div className="orderActions">
                <button 
                    className="viewOrderBtn"
                    onClick={() => navigate("/order-details", { 
                        state: { orderId: orderInfo._id } 
                    })}
                >
                    VIEW DETAILS
                </button>
            </div>
        </div>
    );
}

// Notification Card Component
function NotificationCard({ notification }) {
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order': return '📦';
            case 'weather': return '🌤️';
            case 'payment': return '💰';
            case 'system': return '⚙️';
            default: return '📢';
        }
    };

    return (
        <div className="notificationCard">
            <div className="notificationIcon">
                {getNotificationIcon(notification.type)}
            </div>
            <div className="notificationContent">
                <div className="notificationTitle">{notification.title}</div>
                <div className="notificationMessage">{notification.message}</div>
                <div className="notificationTime">
                    {new Date(notification.createdAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
}