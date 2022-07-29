import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import LoginButton from "./LoginButton";

const MainNavbar = ({ login, setLogin }) => {
  const navigate = useNavigate()

  return (
    <div style={{width:'100%', backgroundColor:"white"}} className="MainNavbarContainer">
      <img className="NavBarLogo" />
      <div style={{ position: "absolute", margin: "2em", right: "0" }}>
        
          <LoginButton login={login} setLogin={setLogin}/>
        
      </div>
      <div className="NavListContainer">
        <div onClick={()=> navigate("/")} className="MainNavBarList">Home</div>
        {/* <div onClick={()=> navigate("/")} className="MainNavBarList">All Products</div> */}
        {/* <div className="MainNavBarList">Featured Deals</div> */}
        <div className="MainNavBarList"><Link to="/preferencelist">GroupBuy</Link></div>
        {/* {Object.keys(login)[0] === "seller" ? ( */}
         {Object.keys(login).length === 0 ? "" : 
          <li className="MainNavBarList">
            <Link to={`/${Object.keys(login)[0]}/${login?.[Object.keys(login)[0]]?._id}`}>Profile</Link>
          </li>
        }
        {/* ) : ( */}
          {/* <li className="MainNavBarList">
            <Link to={`/buyer/${login?.buyer?._id}`}>
              Testing Purposes Only
            </Link>
          </li>
        )} */}
        {/* testing purposes only */}

        <Link to="/signup">
          <div className="MainNavBarList">Sign Up</div>
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
