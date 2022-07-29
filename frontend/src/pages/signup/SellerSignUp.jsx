import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SellerSignUp = () => {
  const navigate = useNavigate()
  const [isUnique, setIsUnique] = useState(true); // used for checking if username is unique
  const [passwordCheck, setPasswordCheck] = useState(""); //controlled form password checking input
  const [emailmsg, setEmailMsg] = useState("");
  const [sellerData, setSellerData] = useState({
    username: "",
    shopname:"",
    password: "",
    emailAddress: "",
    address: "",
  });

  // const handleClick =()=>{
  //   fetch "/api/buyers"
  //   methose post
  // }

  // "/api/buyers"
  // useEffect(() => {});

  //INPUT FOR USERNAME
  const handleChange_UserID = (event) => {
    event.preventDefault();
    let id = event.target.value;

    setSellerData({ ...sellerData, username: id });
  };

  //INPUT FOR SHOP NAME
  const handleChange_ShopName = (event) => {
    event.preventDefault();
    let sn = event.target.value;
    setSellerData({ ...sellerData, shopname: sn });
  };
  //INPUT FOR PASSWORD
  const handleChange_Password = (event) => {
    event.preventDefault();
    let pw = event.target.value;

    setSellerData({ ...sellerData, password: pw });
  };

  //INPUT FOR CHECK PASSWORD
  const handleChange_PasswordCheck = (event) => {
    event.preventDefault();
    let pwc = event.target.value;
    setPasswordCheck(pwc);
  };

  //INPUT FOR EMAIL
  const handleChange_Email = (event) => {
    event.preventDefault();
    let eml = event.target.value;
    if (eml !== "") {
      if (
        eml.split("").filter((x) => x === "@").length !== 1 ||
        eml.indexOf(".") === -1
      ) {
        setEmailMsg("Incorrect Email Format");
      } else {
        setEmailMsg("OK");
      }
    } else {
      setEmailMsg(null);
    }
    setSellerData({ ...sellerData, emailAddress: eml });
  };

  //INPUT FOR ADDRESS
  const handleChange_Address = (event) => {
    event.preventDefault();
    let add = event.target.value;

    setSellerData({ ...sellerData, address: add });
  };

  //CLICK TO POST DATA TO BACKEND SERVER
  const handleClick = (e) => {
    e.preventDefault();
    if (
      passwordCheck === sellerData.password &&
      sellerData.emailAddress.split("").filter((x) => x === "@").length == 1 &&
      sellerData.emailAddress.indexOf(".") !== -1
    ) {
      console.log(sellerData);
      fetch("/api/sellers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellerData),
      })
        .then((response) => response.json())
        .then((data) => console.log(data.data))
        // .then((data) =>  (data.status ==="success") ? navigate("/login") : alert ("Error: Account Creation failed"));
    }
   navigate("/login")
  };

  return (
    <div className="BuyerSignUpContainer">
      <div
        style={{
          position: "relative",
          width: "30%",
          margin: " 0 auto",
          textAlign: "center",
        }}
      >
        <Link to="/">
          <img className="SignUpPageLogo" />
        </Link>
      </div>
      <div className="BuyerFormContainer">
        <form className="BuyerForm">
          <fieldset>
            <legend>
              <h2>Sign Up & Sell!</h2>
            </legend>
            <label htmlFor="user_id">User ID : </label>
            <input
              onChange={handleChange_UserID}
              value={sellerData.username}
              type="text"
              id="user_id"
              name="user_id"
              placeholder="Enter your user ID"
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="shopname">Shop Name : </label>
            <input
              onChange={handleChange_ShopName}
              value={sellerData.shopname}
              type="text"
              id="shopname"
              name="shopname"
              placeholder="Enter your shop name"
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="password">Password : </label>
            <input
              onChange={handleChange_Password}
              value={sellerData.password}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="passwordCheck">Confirm Password : </label>
            <input
              onChange={handleChange_PasswordCheck}
              value={passwordCheck}
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              placeholder="Confirm your password"
              required
            />
            {passwordCheck === "" ? null : passwordCheck !== "" &&
              sellerData.password === passwordCheck ? (
              <span style={{ color: "green" }}> OK</span>
            ) : (
              <span style={{ color: "red" }}> Password is not the same</span>
            )}
            <br></br>
            <br></br>
            <label htmlFor="email">Email : </label>
            <input
              onChange={handleChange_Email}
              value={sellerData.emailAddress}
              type="email"
              id="email"
              name="email"
              placeholder="example@myEmail.com"
              required
            />
            <>{emailmsg}</>
            <br></br>
            <br></br>
            <label htmlFor="address">Address : </label>
            <input
              onChange={handleChange_Address}
              value={sellerData.address}
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              required
            />
            <br></br>
            <br></br>
          </fieldset>
          <button className="submitButton" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default SellerSignUp;
