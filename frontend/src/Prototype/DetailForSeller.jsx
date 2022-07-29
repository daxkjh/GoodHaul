import SellerNavbar from "../components/SellerNavBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailForSeller = ({ login, setLogin }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [addSeller, setAddSeller] = useState({})
  const [addProductToSellerList, setAddProductToSellerList] = useState()
  const [totalQuantity, setTotalQuantity] = useState(0)
  const navigate=useNavigate();

  useEffect(() => {
    fetch(`/api/preferences/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((dataPreferences) => {
        // console.log(dataPreferences.data);
        setProduct(dataPreferences.data);
        let quantity = 0
        for(const element of dataPreferences?.data?.buyerList){
          quantity += parseInt(element?.quantity)
        }
        setTotalQuantity(quantity)
      });
  }, []);

  const handleClick =()=>{
   
    fetch(`/api/preferences/addtimestamp/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...product, seller:login.seller._id, fulfilled: false}),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("test", data);
            // fetch("/api/buyers/shiftToListed", {
            //   method:"PUT",
            //   headers:{
            //     "Content-Type":"application/json",
            //   },
            //   body:JSON.stringify(data.data)
            // })
            // .then((response)=>response.json())
            // .then((data)=>{console.log("data new",data)})

            if (data.status==="success"){
                alert("Item Choped!")
                fetch(`/api/sellers/${login.seller._id}`, {
                  method:"PUT",
                  headers:{
                    "Content-Type":"application/json",
                  },
                  body:JSON.stringify(data.data)
                })
                .then((response)=>response.json())
                .then((data)=>{console.log("data new",data)})
                .then(navigate("/preferencelist"));
            } else {
                alert("STATUS: 404. Try Again")
            }

        })
    }

    console.log("addSeller",addSeller);
    console.log("product", product);
    console.log("product seller", product.seller)

    






  if (Object.keys(login)[0] != "seller") {
    return (
      <>
        <h1>Sorry, you are not Logged In as Seller</h1>
        <Link to="/login">BACK</Link>
      </>
    );
  } else {
    return (
      <div>
        
        {Object.keys(login)[0] === "seller" ? <SellerNavbar login={login} setLogin={setLogin}/> : null}
        <Link to="/preferencelist">
          <p> Back to Preferences </p>
        </Link>
        <h1>Detail for Seller</h1>
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
                {product?.seller === ""
                  ? "Item is AVAILABLE" : product?.seller === login?.seller?._id ? "Congratulations! You're the owner of this listing!"
                   : "Someone has taken this order, chope faster next time!"}
              </h2>
              {Object.keys(product)
                .filter((x) => {
                  if (
                    x !== "_id" &&
                    x !== "sellerId" &&
                    x !== "image" &&
                    x !== "buyerList" &&
                    x !== "__v" &&
                    x !== "sku" && 
                    x !== "fulfilled"
                  ) {
                    return x;
                  }
                })
                .map((x, i) => {
                  return (
                    <li key={i}>
                      {x}: {product[x]}
                    </li>
                  );
                })}
                <li>Total Quantity: {totalQuantity}</li>
            </ul>
            {<button className="DetailButton" disabled={(!product?.seller)?false:true} onClick={handleClick}>Chope Listing!</button>}
          </div>
        </div>
      </div>
    );
  }
};

export default DetailForSeller;
