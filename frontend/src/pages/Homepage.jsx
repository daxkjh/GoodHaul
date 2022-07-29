import MainNavbar from "../components/MainNavbar";
import BuyerNavbar from "../components/BuyerNavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PopularPreferencesCard from "../components/Popular/PopularPreferencesCard";
import PopularListingsCard from "../components/Popular/PopularListingsCard";
import SellerNavbar from "../components/SellerNavBar";
import EndofSaleButton from "../components/EndofSaleButton";
import useCheckExpiry from "../hooks/useCheckExpiry";
import Carousel from "../components/Carousel";


const ImageData = ["cat", "dog","rat","pig"];

function Homepage({ login, setLogin }) {
  const [popularPreferences, setPopularPreferences] = useState([]);
  const [popularListings, setPopularListings] = useState([]);

  useCheckExpiry();
  useEffect(() => {
    fetch("/api/preferences/popular", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => setPopularPreferences(data));

    // fetch("/api/preferences", {
    //   method: "get",
    // })
    //   .then((response) => response.json())
    //   .then((data) => setPopularListings(data?.data))
    //   .then(()=>console.log(popularListings))
  }, []);

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch("/api/preferences")
      const data = await response.json()
      setPopularListings(data?.data.filter((x)=>x?.seller!=""))
      console.log("testing",data)
     }
   fetchData()
  },[])


  // console.log("references", popularPreferences);
  // console.log("listings", popularListings);
  // console.log("login", login);
  return (
    <>
      {Object.keys(login).length === 0 ? (
        <MainNavbar login={login} setLogin={setLogin} />
      ) : Object.keys(login)[0] === "buyer" ? (
        <BuyerNavbar login={login} setLogin={setLogin} />
      ) : (
        <SellerNavbar login={login} setLogin={setLogin} />
      )}

        <h1 style={{marginLeft: "1em", marginTop: "1em", fontSize:"2em"}}>Popular Choices</h1>
        <div className="card-list">
        {popularPreferences.map((x)=>{
            return <PopularPreferencesCard key={x._id} login={login} detail={x}/>
        })}
      </div>
      <h1 style={{marginTop: "3em", padding:"1em"}}>
        
          Fast Deal Zone - Seller Accepted Offer
        
      </h1>
      <div className="card-list">
        {popularListings.map((x) => {
          return <PopularListingsCard key={x._id} login={login} detail={x} />;
        })}
      </div>
        {/* <Carousel slides={ImageData}/> */}
      {/* <Outlet/> */}
    </>
  );
}

export default Homepage;

// function Homepage ({login}){
//     const [popularPreferences, setPopularPreferences]=useState([])
//     const [popularListings, setPopularListings]=useState([])
//     const [listings, setListings]=useState([])

//         useEffect(()=>{
//             fetch('/api/preferences/popular',{
//                 method:'get'
//             })
//             .then((response)=>response.json())
//             .then((data)=>setPopularPreferences(data));

//             fetch('/api/listings/popular',{
//                 method:'get'
//             })
//             .then((response)=>response.json())
//             .then((data)=>setPopularListings(data))

//             fetch('/api/listings/',{
//                 method:'get'
//             })
//             .then((response)=>response.json())
//             .then((data)=>setListings(data.data))
//     },[])

//     console.log("references", popularPreferences);
//     console.log("listings",popularListings);
//     console.log("login",login);
//         return(
//             <>
//             {(Object.keys(login).length===0)?<MainNavbar login={login}/>:Object.keys(login)[0]==="buyer"?
//             <BuyerNavbar login={login} />:<SellerNavbar login={login}/>}
//             <EndofSaleButton listings={listings}/>

//             <h1><Link to={"/preferences"}>Fancy these?</Link></h1>
//             {popularPreferences.map((x)=>{
//                 return <PopularPreferencesCard key={x.name} login={login} detail={x}/>
//             })}
//             <h1><Link to={"/listedproducts"}>Featured Deals, Complete the group buy!</Link></h1>
//             {popularListings.map((x)=>{
//                 return <PopularListingsCard key={x.name} login={login} detail={x}/>
//             })}

//             {/* <Outlet/> */}
//             </>
//         )
//     }

//     export default Homepage
