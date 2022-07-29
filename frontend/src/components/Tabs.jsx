import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicCard from "./BasicCard";

const Tabs = ({ profile, setProfile, login }) => {
    const navigate = useNavigate();
    const { user, id, tab } = useParams();
    // const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`/api/${user}s/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data.data", data.data);
                console.log(id);
                setProfile(data?.data);
            });
    }, [tab]);

    return (
        <>
            {/* <h1>{tab}</h1> */}
            <div className="card-list">
                {/* if person log in as a buyer */}
                {profile?.[tab].length === 0 ? 
                        <>
                            <p>What are you waiting for! </p>
                            <button onClick={() => navigate("/preferencelist")}>Shop Now</button>
                        </>
                 : (
                    profile?.[tab].map((detail, index) => (
                        <BasicCard
                            index={index}
                            // handleDelete={handleDelete}
                            // handleClick={handleClick}
                            // handleUpdate={handleUpdate}
                            user={user}
                            login={login}
                            profile={profile}
                            setProfile={setProfile}
                            key={detail._id}
                            detail={detail}
                            // product={product}
                            // setProduct={setProduct}
                        />
                    ))
                )}
                {tab === "listings" && profile?.[tab].length === 0 ? (
                    <button onClick={() => navigate("/listings")} className="card">
                        Add to Listings
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Tabs;


// const replaceItem = detail => {
//     const pos = profile?.groups.findIndex(d => d._id === detail._id)
//     setProfile({
//         ...profile, groups: [
//             ...profile?.groups.slice(0, pos),
//             detail,
//             ...profile?.groups.slice(pos + 1)
//         ]
//     })
// }