import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavBar";
import SellerNavbar from "../components/SellerNavBar";
import MainNavbar from "../components/MainNavbar";

function Details({ profile, setProfile, login, setLogin }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  // const [count, setCount] = useState(0);
  const navigate = useNavigate();
console.log("login",login)
  //fetching data from preferences database, if not present, fetch data from listings database
  //and then save it to product.

  useEffect(() => {
    fetch(`/api/preferences/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((dataPreferences) => {
        console.log(dataPreferences.data);
        if (!dataPreferences.data) {
          fetch(`/api/listings/${id}`, { method: "GET" })
            .then((response) => response.json())
            .then((dataListings) => {
              setProduct(dataListings.data);
            });
        } else {
          setProduct(dataPreferences.data);
        }
      });
  }, []);
  console.log("product", product);
  console.log("arr", Object.keys(product));

  const handleAdd = (product) => {
if (Object.keys(login).length<1){ 
  
   alert("Please Login to Start Shopping!")
   navigate("/login")

} else {

    fetch(`/api/buyers/${login?.buyer?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...profile, groups: [...profile.groups, product]}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("test profile", data)
      setProfile(data?.data)
    })
    fetch(`/api/preferences/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, buyerList: [...product?.buyerList, { buyer: login?.buyer?._id, quantity: 0 }] })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("test product", data.data)
        setProduct(data?.data)
      })
    navigate(`/buyer/${login?.buyer?._id}/groups`)
  }};

  return (
    <>
    {Object.keys(login).length === 0 ? (
        <MainNavbar login={login} setLogin={setLogin} />
      ) : Object.keys(login)[0] === "buyer" ? (
        <BuyerNavbar login={login} setLogin={setLogin} />
      ) : (
        <SellerNavbar login={login} setLogin={setLogin} />
      )}
      {/* {Object.keys(login)[0] === "buyer" ? <BuyerNavbar login={login} setLogin={setLogin}/> : <SellerNavbar login={login} setLogin={setLogin}/>} */}
      <Link to="/preferencelist">
        <p style={{color:"transparent"}}> Back to Preferences </p>
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
        {(product.seller !== "")? <img style={{width:"40%", position:"absolute", right:"0", top:"-2em"}} src="https://i.imgur.com/cOBhKJD.png"/>: null}
          <img style={{ padding: "1em", width: "80%" }} src={product.image} />
          <img
            className="GoodpayProtect"
            style={{ width: "50%", height: "15%", marginTop: "-15%" }}
            src="https://i.imgur.com/2csMbLs.png?1"
          />
        </div>
        <div className="PreferenceDetailRight">
          <h1>{product?.name}</h1>
          <ul>
            
            <h2>
              {(product.seller !== "")
                ? "HOT SALE! A Seller had accepted this Item!"
                : "Item is seeking more Buyers"}
            </h2>
            {Object.keys(product)
              .filter((x) => {
                if (
                  x!=="name" &&
                  x !== "_id" &&
                  x !== "sellerId" &&
                  x !== "image" &&
                  x !== "buyerList" &&
                  x !== "__v" &&
                  x !== "sku" &&
                  // x !== "seller" && 
                  x !== "quantity"
                ) {
                  return x;
                }
              })
              .map((x, i) => {
                return (
                  <li className="ProductDetails" key={i}>
                    {x}: {product[x]}
                  </li>
                );
              })}
            <li style={{fontSize:"1.2em", fontWeight:"bolder", marginTop:"1em"}}>Quantity: {product?.buyerList?.reduce((accumulator, object) => accumulator + parseInt(object.quantity), 0)}</li>
            {/* <img src={product["image"]}></img> */}

            {profile?.groups?.some((data) => data._id === product._id) ? (
              <>
                <br />
                <button  onClick={() => navigate(`/buyer/${login?.buyer?._id}/groups`)}>
                GO TO PRODUCT IN YOUR LIST
                </button>
              </>
            ) : (
              <>
                <button style={{marginTop:"2em"}} className="DetailButton" onClick={() =>(!login)? navigate("/login").then(alert("Login to Start Shopping")) : handleAdd(product)}>Add Product</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Details;

  //     body: JSON.stringify({
  //   ...profile,
  //   groups: [
  //     ...profile?.groups.slice(0, pos),
  //     product,
  //     ...profile?.groups.slice(pos + 1),
  //   ],
  // })

// const replaceItem = (product) => {
//   // need the ._id
//   const pos = profile?.groups.findIndex((d) => d._id === product._id);
//   setProfile({
//     ...profile,
//     groups: [
//       ...profile?.groups.slice(0, pos),
//       product,
//       ...profile?.groups.slice(pos + 1),
//     ],
//   });
// };

// const handlePreference = (product, count) => {
//   console.log("clicked");
//   // console.log(profile?.groups);

//   if (profile?.groups?.some((data) => data._id === product._id)) {
//     console.log("you have this in ur preferences alr!!!!!");
//     console.log("change quantity here");
//   } else {
//     fetch(`/api/preferences/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...product,
//         quantity: product.quantity + count,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data product", data);
//         setProduct({ ...product, quantity: product.quantity + count });
//       });

//     fetch(
//       `/api/${Object.keys(login)[0]}s/${login?.[Object.keys(login)[0]]?._id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         //? need to send to buyers
//         body: JSON.stringify({
//           ...profile,
//           groups: [
//             ...profile?.groups,
//             { ...product, quantity: product.quantity + count },
//           ],
//         }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data.data", data);
//         console.log("product", product);
//         console.log("profile", profile);
//         replaceItem({ ...product, quantity: product.quantity + count });
//       });
//   }
// };
