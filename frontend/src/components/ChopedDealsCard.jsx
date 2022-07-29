import { useState, useEffect } from "react";

const ChopedDealCards = ({ index, data, buyers }) => {
  const [isActive, setIsActive] = useState(false);

  console.log(
    "test",
    buyers.find((x, i) => i == 1)
  );

  return (
    <div
      style={{ backgroundColor: "white" }}
      className="ChopedDealCardAccordion"
    >
      <div style={{ position: "relative" }} className="accordionHeader">
        <div
          onClick={() => setIsActive(!isActive)}
          className="accordionExpand"
          style={{ position: "absolute", right: "1rem" }}
        >
          {isActive ? "−" : "+"}
        </div>
        <img
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
          src={data.image}
        />
        <div
          style={{
            marginLeft: "2rem",
            display: "inline-block",
            verticalAlign: "top",
          }}
          className="accordionHeaderText"
        >
          <h1 style={{}}>{`${index + 1}.  ${data.name}`}</h1>
          <h3>
            Total Quantity:{" "}
            {(data.buyerList.length>0)?data.buyerList.map((x) => x.quantity).reduce((a, b) => a + b): 0}
          </h3>
          <h3>Total Buyers: {data?.buyerList?.length}</h3>
          {/* <h3>{data.date}</h3> */}
        </div>
      </div>
      <div
        style={{
          height: isActive ? "300px" : "0px",
          opacity: isActive ? 1 : 0,
        }}
        className="accordionBody"
      >
        <div className="accordionBodyBuyerList">
          <ol>
            {data?.buyerList.map((x, i) => {
              return (
                <li>
                  <div>
                    <h5>
                      Buyer: {(buyers.find((y) => y._id === x.buyer))?.username}
                    </h5>
                    <p>Quantity: {x.quantity}</p>
                    <p>Address: {(buyers.find((y) => y._id === x.buyer))?.address}</p>
                    <p>Contact: {(buyers.find((y) => y._id === x.buyer))?.emailAddress}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default ChopedDealCards;

// let quantity = 0
// for(const element of dataPreferences?.data?.buyerList){
//     quantity += element?.quantity
//   }
//   setTotalQuantity(quantity)
