import MainNavbar from "../components/MainNavbar";
import BuyerNavbar from "../components/BuyerNavBar";
import SellerNavbar from "../components/SellerNavBar";
import { useState, useEffect } from "react";
import PreferenceCard from "../components/PreferenceCard";

const ListedItem = ({ login, setLogin }) => {
  const [listedData, setListedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [dataToBeMap, setDataToBeMap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/listings`);
      const data = await response.json();
      setDataToBeMap(data.data);
      setListedData(data.data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    let search = event.target.value;
    event.preventDefault();
    setSearchTerm(search);
    setDataToBeMap(listedData.filter((x) => x.name.includes(search)));
    console.log(dataToBeMap);
  };

  return (
    <div className="ListedItemContainer">
      {Object.keys(login).length === 0 ? (
        <MainNavbar login={login} setLogin={setLogin} />
      ) : Object.keys(login)[0] === "buyer" ? (
        <BuyerNavbar login={login} setLogin={setLogin} />
      ) : (
        <SellerNavbar login={login} setLogin={setLogin} />
      )}
      <div style={{ textAlign: "center" }} className="ListedItemHeader">
        <h1>Listed Items</h1>
        <h3>Join the GroupBuy before its gone!</h3>
        <form className="ListedSearchBar">
          <input
            onChange={handleSearch}
            type="text"
            id="listedSearchInput"
            name="listedSearch"
            placeholder="Type here to begin search"
            value={searchTerm}
          ></input>
        </form>
      </div>
      <div style={{textAlign:"center"}} className="ListedItemBody">
        {dataToBeMap.length > 0 ? (
          dataToBeMap.map((x, i) => (
            <PreferenceCard key={i} data={x} login={login} />
          ))
        ) : (
          <h1>
            -- No Results -- <br></br>
            <br></br>
            <span style={{ fontSize: "medium" }}>Try other search terms</span>
          </h1>
        )}
      </div>
    </div>
  );
};
export default ListedItem;
