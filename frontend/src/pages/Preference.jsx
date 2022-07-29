import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavBar";
import MainNavbar from "../components/MainNavbar";
import PreferenceCard from "../components/PreferenceCard";
import SellerNavbar from "../components/SellerNavBar";
import useCheckExpiry from '../hooks/useCheckExpiry'

const Preference = ({ login, setLogin }) => {
  console.log("Preference", login);
  const [preferenceData, setPreferenceData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [dataToBeMap, setDataToBeMap] = useState([]);
  const navigate = useNavigate();
  
  useCheckExpiry();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/preferences`);
      const data = await response.json();
      setDataToBeMap(data.data);
      setPreferenceData(data.data);
    };
    fetchData();
  }, []);
  

  console.log("dataToBeMap",dataToBeMap);
  console.log("preferenceData", preferenceData);

  const handleSearch = (event) => {
    let search = event.target.value;
    event.preventDefault();
    setSearchTerm(search);
    setDataToBeMap(preferenceData.filter((x) => x.name.includes(search)));
    console.log(dataToBeMap);
  };

  return (
    <div className="PreferenceContainer">
      {Object.keys(login).length === 0 ? (
        <MainNavbar login={login} setLogin={setLogin} />
      ) : Object.keys(login)[0] === "buyer" ? (
        <BuyerNavbar login={login} setLogin={setLogin} />
      ) : (
        <SellerNavbar login={login} setLogin={setLogin} />
      )}
      <div className="PreferenceHeader">
        {Object.keys(login)[0] === "buyer" ? (
          <button
            style={{ position: "absolute", right: "2em" }}
            onClick={() => navigate("/preferencelist/new")}
          >
            {" "}
            + Create New GroupBuy
          </button>
        ) : null}
        <h1>GroupBuy Listings </h1>
        <h3>Join the list and buy cheaper with others!</h3>
        <form className="preferenceSearchBar">
          <input
            onChange={handleSearch}
            type="text"
            id="preferenceSearchInput"
            name="preferenceSearch"
            placeholder="Type here to begin search"
            value={searchTerm}
          ></input>
        </form>
      </div>
      <div className="PreferenceBody">
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

export default Preference;
