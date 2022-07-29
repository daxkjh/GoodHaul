import BuyerNavbar from "../components/BuyerNavBar";
import SellerNavbar from "../components/SellerNavBar";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

let buyerID = 'jason123'

const PreferenceDetail = ({profile, setProfile, login}) => {
  const [showdata, setShowData] = useState({});
  const { id, usertype } = useParams();
  const [quantity, setQuantity] = useState(0);
//   const [update, setUpdate] = useState({
//     buyerList: [],
//     _id: "",
//     name: "",
//     description: "",
//     image: "",
//     category: [],
//     price: 70,
//     quantity: 10,
//     __v: 0,
//   });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/preferences/${id}`);
      const data = await response.json();
      setShowData(data.data);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setQuantity(event.target.value);
  };

//   const handleClick = (event) => {
//     const x = [...showdata.buyerList,buyerID]
// // WORK IN PROGRESS
//     // setShowData({
// 	// 	"buyerList": [...showdata.buyerList,buyerID],
// 	// 	"_id": showdata._id,
// 	// 	"name": "guinness draught beer",
// 	// 	"description": "30 x 2 bars",
// 	// 	"image": "https://m.media-amazon.com/images/I/719DpQ-StJL._AC_SX679_.jpg",
// 	// 	"category": [
// 	// 		"food",
// 	// 		"drinks"
// 	// 	],
// 	// 	"price": 70,
// 	// 	"quantity": 10,
// 	// 	"__v": 0
// 	// })
//     console.log(showdata)
//   };

const handlePreference = (showdata) => {
  console.log("clicked");
  // console.log(profile?.groups)
  // let productFound;
  //   if ( profile?.groups?.some((data) => data._id === showdata._id)) {
  //    productFound = true; 
  //   } else {
  //     productFound = false;
  //   }
  
  // if (productFound) {
  //   console.log("you have this in ur preferences alr!!!!!")
  // } else {
  // fetch(`/api/${usertype}s/${login?.[usertype]?._id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   //? need to send to buyers
  //   body: JSON.stringify({ ...profile, groups: [...profile?.groups, showdata] }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("data.data", data);
  //     console.log("showdata", showdata);
  //     console.log("profile", profile);
  //     setProfile({ ...profile, groups: [...profile?.groups, showdata] });
  //   });
  // }
};

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "lightgray",
        width: "100%",
        height: "100em",
      }}
      className="PreferenceDetailContainer"
    >
      {usertype == "buyer" ? <BuyerNavbar /> : <SellerNavbar />}
      <Link to="/preferencelist">
        <p> Back to Preferences </p>
      </Link>
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "60em",
          backgroundColor: "white",
          margin: "0 auto",
        }}
        className="PreferenceDetailItemContainer"
      >
        <div className="PreferenceDetailLeft">
          <img style={{ padding: "1em", width: "80%" }} src={showdata.image} />
          <img
            className="GoodpayProtect"
            style={{ width: "50%", height: "15%", marginTop: "-15%" }}
            src="https://i.imgur.com/2csMbLs.png?1"
          />
        </div>
        <div className="PreferenceDetailRight">
          <h1>{showdata?.name}</h1>
          <p>{showdata?.description}</p>
          <form>
            <label htmlFor="preferencesQuantity">Quantity (0-100):</label>

            <input
              onChange={handleChange}
              value={quantity}
              type="number"
              id="preferencesQuantity"
              name="quantity"
              min="0"
              max="100"
            />
            <p style={{ color: "red" }}>
              {quantity < 0 ? "Quantity cannot be less than 0" : null}
            </p>
          </form>
          <button onClick={() => handlePreference(showdata)}>Join Preference List</button>

          <ul>
            {showdata !== null && showdata.length > 0
              ? showdata?.buyerList.map((x, i) => {
                  <li key={i}>{x}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PreferenceDetail;
