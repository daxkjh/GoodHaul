import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginButton =({login,setLogin})=>{
  const [loginState, setLoginState] = useState(false)
  const navigate = useNavigate()
    
const handleClick =()=>{
if (Object.keys(login).length===0 ){
  navigate("/login")
} else {
  setLogin({})
  navigate("/")
}
}



    return(
        <>
        <button className='LoginButton'
        onClick={handleClick} style={{
          backgroundColor: "black",
          width: "7rem",
          height: "2rem",
          borderRadius: "1rem",
        }}>{(Object.keys(login)===1) ? "Logout" : "Login"}</button>
        </>
    )
}

export default LoginButton;
