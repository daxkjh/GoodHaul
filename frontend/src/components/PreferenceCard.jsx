import { Link } from "react-router-dom";

const PreferenceCard = ({ data, login }) => {
  const handleClick = () => {};

  return (
    <div
      style={{
        borderTop:(data?.seller=="")?  "7px solid green" : "7px solid orange"
        // borderWidth: "5px",
        // borderColor: data.seller == "" ? "green" : "orange",
      }}
      className="PreferenceCard"
    >
      <div style={{ position: "relative" }}>
        <img className="PreferenceCardImg" src={data.image} />
        <img
          className="GoodpayProtect"
          src="https://i.imgur.com/2csMbLs.png?1"
        />
      </div>
      <div style={{ margin: "0px", padding: "0px" }}>
        <ul style={{ textAlign: "left" }}>
          <div>
          <li className="PreferenceCardHeader">{data.name}</li>
          </div>
          {/* <li>{data.description}</li> */}
          <li
            style={{
              position: "absolute",
              fontWeight: "bold",
              fontSize: "1.7rem",
              right: "0.5rem",
              bottom: "2.5rem",
            }}
          >
            {" "}
            $ {data.price}
          </li>
        </ul>
      </div>
      <div></div>

      <Link
        to={
          Object.keys(login).length == 0
            ? "/login"
            : Object.keys(login) == "buyer"
            ? `/details/${data._id}`
            : `/seller/details/${data._id}`
        }
      >
        <button className="moreDetailsButton">More Details</button>
      </Link>
    </div>
  );
};

export default PreferenceCard;
