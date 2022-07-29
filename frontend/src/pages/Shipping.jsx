import SellerNavbar from "../components/SellerNavBar"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

const Shipping = ({ login, setLogin }) => {
    const { id } = useParams();
    const [profile, setProfile] = useState([])
    useEffect(() => {
        fetch(`/api/sellers/${id}`, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                console.log("shipping", data?.data)
                setProfile(data?.data)
            })
    }, [])

    const handleClick = (detail) => {
        const pos = profile?.listings.findIndex((d) => d._id === detail._id);
        console.log("handleClick", detail)
        console.log("pos", pos)
        fetch(`/api/sellers/shipping/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...profile,listings: [...profile?.listings.slice(0, pos), {...detail, fulfilled: true}, ...profile?.listings.slice(pos + 1)]})
        })
        .then((response) => response.json())
        .then((data) => {
            setProfile(data?.data)
            fetch(`/api/preferences/${detail._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({...detail, fulfilled: true})
            }).then((response) => response.json())
            .then((data) => {
                console.log("preferences", data)
                const buyerArr = data?.data?.buyerList.map((buy) => buy.buyer)
                console.log("buyerarr", buyerArr)
            })
        })
    }


    if (Object.keys(login)[0] !== "seller") {
        return (
            <>
                <h1>Sorry, you are not Logged In as Seller</h1>
                <Link to="/login">BACK</Link>
            </>
        )
    } else {
        return (
            <>
                <div className="ShippingContainer">
                    {Object.keys(login)?.[0] === "seller" ? <SellerNavbar login={login} setLogin={setLogin} /> : null}
                </div>
                <div className="ShippingHeader">
                    <h1> Shipping </h1>
                </div>
                <div className="ShippingBody">
                    <div className="card-list">
                        {profile?.listings?.length === 0 ? "" : (profile?.listings?.filter((x) => x.fulfilled === false).map((detail) => (<>
                    <div className="card-borders">
                        <h1>{detail.name}</h1>
                        <img src={detail.image} alt={detail._id}/>
                        <p>{detail.description === undefined ? "" : `Description: ${detail.description}`}{" "}<br/>
                        Quantity: {detail.buyerList.reduce((a, b) => a + b, 0)}
                        </p>
                                <button onClick={() => {
                                    console.log("clicked")
                                    handleClick(detail)
                                    }}>ORDER FULFILLED</button>
                    </div>
                    </>)
                    ))}
                  
                </div>
                </div>

            </>
        )
    }
}


export default Shipping;