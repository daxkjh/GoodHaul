import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerNavbar = ({ login, setLogin }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsActive(!isActive);
  };

  const handleSettings=()=>{
    navigate('/changepassword');
  }
  
  const handleLogOut = () => {
    setLogin({});
    navigate("/");
  };

  return (
    <div
      style={{ width: "100%", backgroundColor: "white" }}
      className="SellerNavbar"
    >
      <img className="NavBarLogo" />
      <div className="dropdown">
        <button className="dropbtn"></button>
        <div className="dropdown-content">
          {login ? (
            <h3 style={{ marginLeft: "1em" }}>Hi {login?.seller?.username}!</h3>
          ) : null}
          {login ? (
            <Link
              // to={`/${Object.keys(login)[0]}/${
              //   login?.[Object.keys(login)[0]]?._id
              // }`}

              to={`/seller/home/${login?.seller?._id}`}
            >
              Profile
            </Link>
          ) : null}
          <a style={{cursor:"pointer"}} onClick={handleSettings}>Settings</a>
          <a style={{cursor:"pointer"}} onClick={handleLogOut}>Logout</a>
        </div>
      </div>
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundImage: `url("https://i.imgur.com/x5vYMy0.png")`,
          backgroundSize: "contain",
          cursor: "pointer",
        }}
        onClick={toggleSideNav}
      ></div>
     
      <div className="SellerNavListContainer">
        <div
          id="mySidenav"
          className="sidenav"
          style={{ width: isActive ? "250px" : "0px" }}
        >
          <a className="closebtn" onClick={toggleSideNav}>
            &times;
          </a>
          
          <Link style={{marginTop:"3em"}} to={`/seller/home/${login?.seller?._id}`}><div>Home</div></Link>
          
          {/* <a href="#">All Products</a> */}
          {/* <a>
            <Link to="/listeditem">Listed Item</Link>
          </a> */}
          
          <Link style={{marginTop:"1rem"}} to="/preferencelist"> GroupBuy List </Link>
         
         {(login) ? <Link style={{marginTop:"1rem"}} to={`/seller/choped/${login?.seller?._id}`}>My Choped Deals</Link> : null }
          {(login) ? <Link style={{marginTop:"1rem"}} to={`/seller/shipping/${login?.seller?._id}`}>Shipping</Link> : null}
          {(login) ? <Link style={{marginTop:"1rem"}} to={`/seller/history/${login?.seller?._id}`}>Sale History</Link> : null}

          {/* <div onClick={handleLogOut}>
            <a>Log Out</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SellerNavbar;
