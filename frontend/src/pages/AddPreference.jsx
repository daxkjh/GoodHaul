import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavBar";

const AddPreference = ({ profile, setProfile, login, setLogin }) => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    price: null,
    buyerList: [{ buyer: login.buyer._id,
                    quantity :0}]
  });

  useEffect(() => {
    if (Object.keys(login)[0] !== "buyer") {
      navigate("/");
    }
  });

  const handleClick =(event)=>{
    event.preventDefault()
    fetch("/api/preferences/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("newData", data);
            if (data.status==="success"){
                alert("Item Created!")
              fetch(`/api/buyers/${login?.buyer?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({...profile, groups: [...profile.groups, data?.data]})
              }).then((response) => response.json())
                .then((data) => setProfile(data?.data))
                navigate("/preferencelist")
            } else {
                alert("STATUS: 404. Try Again")
            }
        });
    
    

  }

  const handleChange_Name = (event) => {
    event.preventDefault();
    setNewData({ ...newData, name: event.target.value });
  };

  const handleChange_Desc = (event) => {
    event.preventDefault();
    setNewData({ ...newData, description: event.target.value });
  };

  const handleChange_Image = (event) => {
    event.preventDefault();
    setNewData({ ...newData, image: event.target.value });
  };

  const handleChange_Price = (event) => {
    event.preventDefault();
    setNewData({ ...newData, price: event.target.value });
    console.log(newData.buyerList[0].quantity)
  };

  const handleChange_Quantity = (event) => {
    event.preventDefault();
    let x = [{...newData.buyerList[0], quantity: event.target.value}]
    setNewData({...newData, buyerList : x})
  };

  const handleChange_Category=(event)=>{
    event.preventDefault()
    setNewData({...newData, category : event.target.value})
  }

  return (
    <div className="AddPreferenceContainer">
      <BuyerNavbar login={login} setLogin={setLogin} />
      <h1>Not seeing what you want?</h1>
      <h3>Create your own listing!</h3>
      <div
        style={{ textAlign: "center" }}
        className="addPreferenceFormContainer"
      >
        <form style={{ width: "60em", margin: "0 auto", borderRadius: "2em" }}>
          <fieldset>
            <legend>New Listing</legend>

            <input
              required
              value={newData.name}
              type="text"
              id="itemname"
              name="name"
              onChange={handleChange_Name}
              placeholder="Item Name"
              style={{ width: "30em", height: "3em", borderRadius: "1em" }}
            />
            <br></br>

            <textarea
              rows="8"
              cols="48"
              value={newData.description}
              required
              type="text"
              id="itemdesc"
              name="description"
              onChange={handleChange_Desc}
              placeholder="Product Description"
              style={{ borderRadius: "1em" }}
            />
            <br></br>

            <input
              required
              value={newData.image}
              type="text"
              id="image"
              name="image"
              onChange={handleChange_Image}
              placeholder="Copy Image Link here"
              style={{ width: "30em", height: "3em", borderRadius: "1em" }}
            />
            <br></br>
            <label
              style={{
                fontSize: "smaller",
                color: "red",
                position: "absolute",
                margin: "-0.2em 0 0 1.5em",
              }}
              htmlFor="price"
            >
              {newData.price < 0 ? "Price cannot be less than 0" : null}
            </label>
            <span>$</span>
            <input
              style={{
                width: "14em",
                height: "3em",
                marginTop: "1em",
                marginRight: "0.5em",
                borderRadius: "1em",
              }}
              onChange={handleChange_Price}
              type="number"
              min="0"
              id="price"
              name="price"
              placeholder="Set Price"
            />
            <label
              style={{
                fontSize: "smaller",
                color: "red",
                position: "absolute",
                margin: "-0.2em 0 0 1.5em",
              }}
              htmlFor="quantity"
            >
              {newData.buyerList[0].quantity < 0 ? "Quantity cannot be less than 0" : null}
            </label>
            <input
              style={{
                width: "14em",
                height: "3em",
                marginLeft: "0.5em",
                borderRadius: "1em",
              }}
              onChange={handleChange_Quantity}
              type="number"
              min="0"
              id="quantity"
              name="quantity"
              placeholder="Set Quantity"
            />
            <p style={{ fontSize: "smaller", color: "red" }}>
              {newData.price < 0 ? "Price cannot be less than 0" : null}
            </p>
            <p style={{ fontSize: "smaller", color: "red" }}>
              {newData.quantity < 0 ? "Quantity cannot be less than 0" : null}
            </p>
            <label htmlFor="category"></label>
            <select required style={{textAlign:"center"}} onChange={handleChange_Category} id="category" name="category">
                <option value="">- select -</option>
                <option>Food</option>
                <option>Drinks</option>
                <option>Snacks</option>
                <option>Women's Apparel</option>
                <option>Men's Apparel</option>
                <option>Mobile & Gadgets</option>
                <option>Electrical Appliances</option>
                <option>Computer & Laptops</option>
                <option>Home</option>
                <option>Sports & Outdoor</option>
                <option>Books</option>
                <option>Babies</option>
                <option>Pets</option>
            </select>
          </fieldset>
          <button onClick={handleClick}>Create List</button>
        </form>
      </div>
    </div>
  );
};

export default AddPreference;
