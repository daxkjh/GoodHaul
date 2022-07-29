import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword({ login }) {
  console.log(Object.keys(login)[0]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const handleChangePassword = (event) => {
    event.preventDefault();
    fetch("/api/passwordchange", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newPassword: password,
        status: Object.keys(login)[0],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.status);
      })
      .then(navigate("/"));
  };
  return (
    <>
      <div className="ChangePasswordPageContainer">
        <img className="SignUpPageLogo" />
      <div className="video-container">
        <video
          src="https://i.imgur.com/iqnjyeB.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
        />
      </div>
      <div className="ChangePasswordContainer">
      <form onSubmit={handleChangePassword}>
          <legend
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "2em",
              marginTop: "1em",
              marginBottom: "1em",
            }}
          >Password Change</legend>
        <input
            style={{
              textAlign: "center",
              fontSize: "1em",
              marginTop: "2em",
              width: "15em",
              height: "1.5em",
              borderRadius: "0.5em",
            }}
          placeholder="Enter new password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <br />
        <input
            style={{
              textAlign: "center",
              fontSize: "1em",
              marginTop: "2em",
              width: "15em",
              height: "1.5em",
              borderRadius: "0.5em",
            }}
          placeholder="Confirm new password"
          type="password"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
        />
        <br />
        {confirmedPassword === "" ? null : confirmedPassword !== "" &&
          password === confirmedPassword ? (
          <span style={{ color: "green" }}> OK</span>
        ) : (
          <span style={{ color: "red" }}> Password is not the same</span>
        )}
        <br />
          <button style={{
            borderRadius: "1em",
            fontSize: "20px",
            marginTop: "25px",
            paddingLeft: "0.75em",
            paddingRight: "0.75em",
          }}  
        className="ChangeButton">Change</button>
      </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
