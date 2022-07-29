import LoginForm from "../components/LoginForm";
import { useState } from "react";

//created by Clivan for testing purposes
function Login({ login, setLogin, loginDetails, setLoginDetails }) {
  return (
    <>
      <div className="LoginPageContainer">
        <img className="SignUpPageLogo" />
        <div className="video-container">
          <video
            src="https://i.imgur.com/iqnjyeB.mp4"
            autoPlay={true}
            loop={true}
            muted={true}
          />
        </div>
        <div className="LoginFormContainer">
        <LoginForm
          login={login}
          setLogin={setLogin}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
        />
        </div>
      </div>
    </>
  );
}

export default Login;

// import {useEffect, useState} from 'react'

// const Login = () => {

// const [buyer,setBuyer]=useState({})

//   useEffect(() => {
//     fetch("/api/buyers/62ab64ca63e255a446ccb66b")
//       .then((response) => response.json())
//       .then((data) => setBuyer(data.data));
//   }, []);

//     return (
//         <div>

//         </div>
//     )
// }

// export default Login
