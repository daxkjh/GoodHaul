import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/MainNavbar'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Profilepage from './pages/Profilepage'
import Tabs from './components/Tabs'
import SignUpLandingPage from './pages/signup/SignUpLandingPage'
import BuyerSignUp from './pages/signup/BuyerSignUp'
import SellerSignUp from './pages/signup/SellerSignUp'
import Details from './pages/Details'
import AllListedItems from './pages/All/AllListedItems'
import AllPreferredItems from './pages/All/AllPreferredItems'
import Preference from './pages/Preference'
import PreferenceDetail from './pages/PreferenceDetail'
import AddPreference from './pages/AddPreference'
import ListedItem from './pages/ListedItem'
import DetailForSeller from './Prototype/DetailForSeller'
import MyChopedDeals from './pages/MyChopedDeals'
import ChangePassword from './pages/ChangePassword'
import Shipping from './pages/Shipping'
import SaleHistory from './pages/SaleHistory'
import HomepageForSeller from './Prototype/HomepageForSeller'


const App = () => {
  const [login, setLogin] = useState({});
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "", accountType: "" });
  const [profile, setProfile] = useState()


  useEffect(() => {
    fetch(`/api/${Object.keys(login)[0]}s/${login?.[Object.keys(login)[0]]?._id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data.data", data.data);
        // console.log(id);
        setProfile(data?.data);
      });
  }, [login]);
  
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Homepage login={login} setLogin={setLogin}/>}/>
      <Route path="/login" element={<Login login={login} setLogin={setLogin} loginDetails={loginDetails} setLoginDetails={setLoginDetails}/>}/>
      <Route path="/details/:id" element={<Details profile={profile} setProfile={setProfile} login={login} setLogin={setLogin}/>} />
      {/* <Route path="/listed" element={<AllListedItems/>}/> */}

    {/* might need to remove some links, some were used for testing */}
      <Route path="/preferences" element={<AllPreferredItems/>}/>
      <Route path="/changepassword" element={<ChangePassword login={login}/>} />
      {/* on log in you need to route properly (buyer/seller) */}

      {/* DAX */}
      <Route path="/signup" element={<SignUpLandingPage />}/>
      <Route path="/signup/buyer" element={<BuyerSignUp/>}/>
      <Route path="/signup/seller" element={<SellerSignUp/>}/>
      <Route path="/preferencelist" element={<Preference setLogin={setLogin} login={login}/>}/>
      <Route path="/preferencelist/new" element={<AddPreference profile={profile} setProfile={setProfile} login={login} setLogin={setLogin}/>}/>
      <Route path="/preferencelist/:usertype/:id" element={<PreferenceDetail/>}/>
      <Route path="/listeditem" element={<ListedItem login={login} setLogin={setLogin}/>}/>
      <Route path="/seller/details/:id" element={<DetailForSeller login={login} setLogin={setLogin}/>}/>
      <Route path="/seller/choped/:id" element={<MyChopedDeals login={login} setLogin={setLogin}/>}/>
      <Route path="/seller/shipping/:id" element={<Shipping login={login} setLogin={setLogin}/>}/>
      <Route path="/seller/history/:id" element={<SaleHistory login={login} setLogin={setLogin}/>} />
      <Route path="/seller/home/:id" element={<HomepageForSeller login={login} setLogin={setLogin}/>}/>
     

    {/* WEIWEN */}
      <Route path="/:user/:id" element={<Profilepage login={login} setLogin={setLogin}/>}>  
      <Route path=":tab" element={<Tabs profile={profile} setProfile={setProfile} login={login} setLogin={setLogin}/> } />
        {/* <Route path="listings" element={<Listings />} />
        <Route path="groups" element={<Groups />}/>
        <Route path="history" element={<SaleHistory />}/> */}
        </Route>
      {/* <Route path="/seller/:id/:tab" element={<Tabs />} /> */}
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
