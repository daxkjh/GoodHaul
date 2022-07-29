import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavBar";

const Profilepage = ({login, setLogin}) => {
    const { user, id } = useParams();
    // const [profile, setProfile] = useState()
    // useEffect(() => {
    //     fetch(`/api/${login}s/${id}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         setProfile(data?.data)})
    // }, [id])

    return (
        <>
            <div className="HomepageForSellerContainer">
            {Object.keys(login)[0] === "buyer" ? <BuyerNavbar login={login} setLogin={setLogin}/> : null}
                <h1 className="WelcomeSeller">Welcome Back, {login?.[user]?.username}</h1>
            </div>
            <div>
                <div className="statsContainer">
                {/* ! preferably tabs CSS */}
               {/* { user === "seller" ? 
                <ul>
                    <li><Link to={`/seller/${id}/listings`}>Listings</Link></li>
                    <li><Link to={`/seller/${id}/groups`}>Groups</Link></li>
                    <li><Link to={`/seller/${id}/history`}>Sale History</Link></li>
                </ul> :  */}
            
                    <div className="stat1"> <Link to={`/buyer/${id}/groups`}>
                        <img className="statIcon" src="https://i.imgur.com/M093ty2.png" />
                        <h2 className="statHeader">
                            Pending Group Buy / Groups </h2></Link></div>
                    {/* <div className="stat2"><Link to={`/buyer/${id}/wishlists`}>WishLists</Link></div> */}
                    {/* <div className="stat3"><Link to={`/buyer/${id}/history`}>Purchase History</Link></div> */}
            
    {/* } */}
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Profilepage;