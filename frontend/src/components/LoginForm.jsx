import { useNavigate } from "react-router-dom";

function LoginForm({ login, setLogin, loginDetails, setLoginDetails }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        setLogin(data.data);
        if (data.status === "login success"){
          if ( Object.keys(data?.data)[0]==="buyer") {
          navigate("/");
        } else {
          navigate(`/seller/home/${data?.data?.seller?._id}`)
          // console.log("loginpage",data.data)
        } 
      } else {
        alert("User does not exist or Password is Incorrect")
        location.reload()
        }
      });
  };

  console.log("login", login);
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <fieldset> */}
        <legend
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: "2em",
            marginTop: "1em",
            marginBottom: "1em",
          }}
        >
          Login
        </legend>
        <label style={{ fontWeight: "bold", color: "white" }} htmlFor="login">
          User <span></span>
        </label>
        <select
        required
          style={{ fontWeight: "bold" }}
          name="Choose"
          id="choice"
          onChange={(event) =>
            setLoginDetails({
              accountType: event.target.value,
              username: loginDetails.username,
              password: loginDetails.password,
            })
          }
        >
          <option value="">Select one</option>
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>
        <br></br>
        <input
          style={{
            textAlign: "center",
            fontSize: "1em",
            marginTop: "2em",
            width: "15em",
            height: "1.5em",
            borderRadius: "0.5em",
          }}
          id="username"
          name="username"
          placeholder="Enter username"
          value={loginDetails.username}
          onChange={(event) =>
            setLoginDetails({
              username: event.target.value,
              password: loginDetails.password,
              accountType: loginDetails.accountType,
            })
          }
        />
        <br></br>
        <input
          style={{
            textAlign: "center",
            fontSize: "1em",
            marginTop: "1em",
            width: "10em",
            height: "1.5em",
            borderRadius: "0.5em",
          }}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={loginDetails.password}
          onChange={(event) =>
            setLoginDetails({
              username: loginDetails.username,
              password: event.target.value,
              accountType: loginDetails.accountType,
            })
          }
        />
        <br></br>
        <button
          style={{
            borderRadius: "1em",
            fontSize: "20px",
            marginTop: "25px",
            paddingLeft: "0.75em",
            paddingRight: "0.75em",
          }}
          className="LoginPageButton"
        >
          Login
        </button>
        {/* </fieldset> */}
      </form>
    </>
  );
}

export default LoginForm;
