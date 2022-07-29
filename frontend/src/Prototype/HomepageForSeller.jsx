import SellerNavbar from "../components/SellerNavBar"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckExpiry from "../hooks/useCheckExpiry";

const HomepageForSeller =({login, setLogin})=>{
    const [availableList,setAvailableList] = useState([])
    const [ownedListing, setOwnedListing]=useState([])
    const [pendingShip, setPendingShip]= useState([])
    // const [saleHistory, setSaleHistory] = useState([])

 const navigate = useNavigate()
    useCheckExpiry();
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/preferences`);
        const data = await response.json();
        setAvailableList(data.data.filter((x)=> x?.seller==""));
        setOwnedListing(data.data.filter((x)=>x?.seller===login?.seller?._id));
      };
      const fetchData2 = async ()=> {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        console.log("product",data.data)
        setPendingShip(data.data.filter((x)=>x?.seller===login?.seller?._id && x.fulfilled === false))
        // setSaleHistory(data.data.filter((x) => x?.seller === login?.seller?._id && x.fulfilled === true))
      }
      fetchData();
      fetchData2()
    }, []);



    if (Object.keys(login)[0] != "seller") {
        return (
          <>
            <h1>Sorry, you are not Logged In as Seller</h1>
            <Link to="/login">BACK</Link>
          </>
        );
      } else {

    return(
        <div className="HomepageForSellerContainer">
            <SellerNavbar login={login} setLogin={setLogin}/>
            <h1 className="WelcomeSeller">Welcome Back, {login?.seller?.username}</h1>
            <div className="statsContainer">
                <div onClick={()=>navigate("/preferencelist")} className="stat1">
                    <img className="statIcon" src="https://i.imgur.com/upgBCXD.png"/>
                    <h2 className="statHeader">Available Listings</h2>
                    <h1 style={{fontSize:"4em"}}>{availableList.length}</h1>
                </div>
                <div onClick={()=>navigate(`/seller/choped/${login?.seller?._id}`)} className="stat2"> 
                <img className="statIcon" src="https://i.imgur.com/M093ty2.png"/>
                <h2 className="statHeader">My Owned Listings</h2>
                <h1 style={{fontSize:"4em"}}>{ownedListing.length}</h1>
                </div>
                <div onClick={()=>navigate(`/seller/shipping/${login?.seller?._id}`)} className="stat3">
                    <img style={{width:'60%'}} className="statIcon" src="https://i.imgur.com/bzm0JzE.png"/>
                    <h2 className="statHeader">Pending Shipping</h2>
                    <h1 style={{fontSize:"4em"}}>{pendingShip.length}</h1>
                </div>
            </div>
        </div>
    )
}
}
export default HomepageForSeller