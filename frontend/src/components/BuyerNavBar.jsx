import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const BuyerNavbar = ({ login, setLogin }) => {
  //onClick={()=> navigate("/")}
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsActive(!isActive);
    console.log("loginOBJ", login);
  };

  const handleLogOut = () => {
    setLogin({});
    navigate("/");
  };

  return (
    <div
      style={{ width: "100%", backgroundColor: "white", position: "relative" }}
      className="BuyerNavbar"
    >
      <img className="NavBarLogo" />
      <div className="dropdown">
        <button className="dropbtn"></button>
        <div className="dropdown-content">
          {login ? (
            <h3 style={{ marginLeft: "1em" }}>Hi {login.buyer.username}!</h3>
          ) : null}
          {login ? (
            <Link
              to={`/${Object.keys(login)[0]}/${
                login?.[Object.keys(login)[0]]?._id
              }`}
            >
              Profile
            </Link>
          ) : null}
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Settings
          </a>
          <a style={{ cursor: "pointer" }} onClick={handleLogOut}>
            Logout
          </a>
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

      <div className="BuyerNavListContainer">
        <div
          id="mySidenav"
          className="sidenav"
          style={{ width: isActive ? "250px" : "0px" }}
        >
          <a className="closebtn" onClick={toggleSideNav}>
            &times;
          </a>

          <Link style={{ marginTop: "3rem" }} to="/">
            Home
          </Link>

          <Link style={{ marginTop: "1rem" }} to="/preferencelist">
            GroupBuy List
          </Link>

          <Link
            style={{ marginTop: "1rem" }}
            to={`/buyer/${login?.buyer?._id}/groups`}
          >
            My Items
          </Link>

          <Link style={{ marginTop: "1rem" }} to="/changepassword">
            Settings
          </Link>

          <a onClick={handleLogOut} style={{ marginTop: "3rem" }}>
            Log Out
          </a>

          {/* <Link style={{marginTop:"1rem"}} to="/history">Purchase History</Link>
          
          
            <Link style={{marginTop:"1rem"}} to="/favourites">Favourites</Link> */}

          {/* {Object.keys(login).length === 0 ? null :
            <a>
              <Link to={`/${Object.keys(login)[0]}/${login?.[Object.keys(login)[0]]?._id}`}>Profile</Link>
            </a>
          } */}
          {/* <div style={{ cursor: "pointer" }} onClick={handleLogOut}>
            <a>Log Out</a>
          </div> */}

          {/* <a><Link to={`/buyer/${login?.[Object.keys(login)[0]]?._id}`}>Profile</Link></a> */}
        </div>
      </div>
    </div>
  );
};

export default BuyerNavbar;
