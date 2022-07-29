import SellerNavbar from "../components/SellerNavBar"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ChopedDealCards from "../components/ChopedDealsCard"

const MyChopedDeals = ({login, setLogin})=>{
const [myChopedList, setMyChopedList] = useState()
// const [unfilteredData, setUnfilteredData] = useState()
const [allBuyerData, setAllBuyerData] = useState([])


useEffect(()=>{
     
const fetchData = async ()=>{
const response = await fetch(`/api/preferences`)
const data = await response.json()
const unfilteredData = await data?.data
console.log("data.data", unfilteredData)
let x = unfilteredData.filter((x)=> x.seller==login?.seller?._id && x.fulfilled === false)
console.log("x",x)
setMyChopedList(x)
}
fetchData()
},[])  

useEffect(()=>{
    const fetchData = async()=>{
        const response = await fetch(`/api/buyers`)
        const data = await response.json()
        setAllBuyerData(data.data)
    }
    fetchData()
},[])




    if (Object.keys(login)[0] != "seller") {
        return (
          <>
            <h1>Sorry, you are not Logged In as Seller</h1>
            <Link to="/login">BACK</Link>
          </>
        );
      } else {
    
    return(
        <div className="MyChopedDealsContainer">
              {Object.keys(login)[0] === "seller" ? <SellerNavbar login={login} setLogin={setLogin}/> : null}
            <div className="MyChopedDealsHeader">
                <h1>My Choped Deals</h1>
            </div>
            <div style={{backgroundColor:"#F0EFEF", padding:"5%", width:"100%"}} className="MyChopedDealsBody">
                <div style={{width:"80%", margin:"0 auto"}} className="ChopeDealsCardContainer">
            
            {myChopedList?.map((x, i)=> <ChopedDealCards key={i} data={x} index={i} buyers={allBuyerData}/>)}
        
                </div>
            </div>
        </div>
    )
}
}
export default MyChopedDeals