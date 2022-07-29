import { useEffect } from "react";
import { useState } from "react";

const BasicCard = ({
  index,
//   handleClick,
  user,
  login,
  detail,
  profile,
  setProfile,
  //   product,
  //   setProduct,
}) => {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`/api/preferences/${detail?._id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data?.data);
      });
  }, []);
  console.log("product", product);
  const handleChange = (event) => {
    event.preventDefault();
    setCount(event.target.value);
  };
  const posBuyer = product?.buyerList?.findIndex(
    (d) => d.buyer === login?.buyer?._id
  );
  const handleAdd = (detail, num) => {
    const pos = profile?.groups.findIndex((d) => d._id === detail._id);
    console.log("update");
    fetch(`/api/buyers/${login?.buyer?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...profile,
        groups: [
          ...profile?.groups.slice(0, pos),
          { ...detail, buyerList: [...detail.buyerList, { buyer: login?.buyer?._id, quantity: num }]},
          ...profile?.groups.slice(pos + 1),
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("update quantity", data);
        setProfile(data?.data);
      });
    fetch(`/api/preferences/${detail._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...detail,
        quantity: detail.quantity + num,
        buyerList: [
          ...detail?.buyerList.slice(0, posBuyer),
          { buyer: login?.buyer?._id, quantity: num },
          ...detail?.buyerList.slice(posBuyer + 1),
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("pref update", data);
        setProduct(data?.data);
        console.log("handle update product", product);
      });
    // const posSeller = profile?.listings.findIndex((d) => d._id === detail._id);
    // fetch(`/api/sellers/shipping/${id}`), {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json"},
    //   body: JSON.stringify({...profile, listings: [...profile?.listings.slice(0, posSeller), {...detail, fulfilled: true}, ...profile?.listings.slice(posSeller + 1)]})
    // }
    // .then((response)=> response.json())
    // .then((data) => console.log("basic card", data))
  };

  const handleDelete = (product, num, qty) => {
    // console.log("index", num);

    // const pos = product?.buyerList.findIndex(x => x.buyerList === detail._id)
    fetch(`/api/preferences/${product?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        quantity: product.quantity - qty,
        buyerList: product?.buyerList.filter(
          (item) => item.buyer !== login?.[user]?._id
        ),
        // buyerList: [...product?.buyerList.slice(0, posBuyer), ...product?.buyerList.slice(posBuyer + 1)]
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete from pref", data);
        setProduct(data?.data);
      });

    fetch(`/api/buyers/${login?.[user]?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...profile,
        groups: profile?.groups.filter((item, index) => index !== num),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete data", data);
        setProfile(data?.data);
      });
  };

  const sum = product?.buyerList?.reduce(
    (accumulator, object) => accumulator + parseInt(object.quantity),
    0
  );
  // console.log("sum", sum)

const handleClick = (detail) => {
       
    };


  // const handleQty = (num) => {
  //     console.log("clicked");
  //     // buyer 
  //     {
  //         profile?.groups.some(d => d._id === detail._id) ? "" :
  //             fetch(`/api/${user}s/${login?.[user]?._id}`, {
  //                 method: "PUT",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //                 //? need to send to buyers
  //                 body: JSON.stringify({ ...profile, groups: [...profile.groups, detail] }),
  //             })
  //                 .then((response) => response.json())
  //                 .then((data) => {
  //                     console.log("data.data", data);
  //                     console.log("detail", detail);
  //                     console.log("profile", profile);
  //                     setProfile(data?.data);
  //                 })
  //     }
  // };

  console.log("profile", profile);
  console.log("pos", posBuyer);

  return (
    <>
      <div className="basiccard-borders">
        <h1>{detail.name}</h1>
        <img src={detail.image} alt={detail._id} />
        <p>
          {detail.description === undefined
            ? ""
            : `Description: ${detail.description}`}{" "}
          <br />
          {product?.buyerList?.length === 0
            ? ""
            : `Total Quantity: ${sum}  `}{" "}
          <br />
          Price: {detail.price}
        </p>

        {user === "buyer" ? (
          <>
            {/* group buy this function is to add to an array ???? */}
            {profile?.groups.some((d) => d._id === detail._id) ? (
              ""
            ) : (
              <button
                onClick={() => {
                  handleClick(detail);
                }}
              >
                Solo Buy
              </button>
            )}
            <br />
            Quantity you currently want:{" "}
            {product?.buyerList?.[posBuyer]?.["quantity"]}
            <br/>
            {/*  this function is to add amount u want to buy for group buy */}
            {product?.buyerList?.[posBuyer]?.["quantity"] === 0 ? (
              <>
              
                <form>
                  <label htmlFor="preferencesQuantity">Quantity (0-100):</label>
                  <input
                    onChange={handleChange}
                    value={count}
                    type="number"
                    id="preferencesQuantity"
                    name="quantity"
                    min="0"
                    max="100"
                  />
                  <p style={{ color: "red" }}>
                    {count < 0 ? "Quantity cannot be less than 0" : null}
                  </p>
                </form>
                <br />
                {/* Quantity to buy: {count}
                        <button onClick={() => setCount(count + 1)}>+</button>
                        <button onClick={() => {count === 0 ? setCount(0) : setCount(count - 1)}}>-</button> */}
                <button
                  onClick={() => {
                    console.log("count", typeof count, count);
                    handleAdd(detail, parseInt(count));
                  }}
                >
                  Add Quantity for Group Buy
                </button>
              </>
            ) : ( ""
              // <button
              //   onClick={() => {
              //     handleQty(parseInt(count));
              //   }}
              // >
              //   {" "}
              //   Change Quantity{" "}
              // </button>
            )}
            <button
              onClick={() => {
                handleDelete(
                  product,
                  index,
                  product?.buyerList?.[posBuyer]?.["quantity"]
                );
              }}
            >
              {" "}
              Remove Buy
            </button>
          </>
        ) : (
          <>
            {/* <button onClick={handleUpdate(parseInt(count))}>
              for seller - Edit
            </button> */}
            {/* <button onClick={handleDelete}>for seller - Delete</button> */}
          </>
        )}
      </div>
    </>
  );
};

export default BasicCard;

// const handleClick = (detail) => {
//     console.log("clicked");
//     fetch(`/api/buyers/${login?.[user]?._id}`
//         , {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             //? need to send to buyers
//             body: JSON.stringify(detail)
//         }
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             console.log("detail", detail)
//             addGroupBuy(detail)
//         });
// };

// const handleUpdate = () => {
//     console.log("update");
// };

// const handleDelete = (num) => {
//     console.log("index", num)
//     fetch(`/api/buyers/${login?.[user]?._id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({})
//     }
//     )
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)
//         removeGroupBuy(num)
//     })
// };

// const handleAddQuantity = (product, num) => {
//     fetch(`/api/preferences/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...product, quantity: product.quantity + num }),
//     })
//         .then((response) => response.json())
//         .then((data) =>
//             // console.log("testproduct", data?.data?.quantity)
//             setProduct(data?.data)
//         );
// };
