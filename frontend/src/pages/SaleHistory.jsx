import SellerNavbar from "../components/SellerNavBar";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

const SaleHistory = ({ login, setLogin }) => {

    const { id } = useParams();
    const [ profile, setProfile] = useState([])
    useEffect(() => {
        fetch(`/api/sellers/${id}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log("sale history", data?.data)
            setProfile(data?.data)
        })
    }, [])

    console.log(profile.listings);
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
                <div className="HistoryContainer">
                    {Object.keys(login)?.[0] === "seller" ? <SellerNavbar login={login} setLogin={setLogin} /> : null}
                </div>
                <div className="HistoryHeader">
                    <h1> Sale History </h1>
                </div>
                <div className="HistoryBody">
                    <div className="card-list">
                        {profile?.listings?.length === 0 ? "" :  ( profile?.listings?.filter((x) => x.fulfilled === true).map((detail) => ( <div className="card-borders">
                                <h1>{detail.name}</h1>
                                <img src={detail.image} alt={detail._id} />
                                <p>{detail.description === undefined ? "" : `Description: ${detail.description}`}
                                </p>
                            </div>
                            
                        )
                        ))}
                    </div>
                </div>
                </>
                )
}}

export default SaleHistory;