import { Link, useNavigate } from "react-router-dom";

const SignUpLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="SignUpLandingPage">
      <div
        style={{
          position: "relative",
          width: "30%",
          margin: " 0 auto",
          textAlign: "center",
        }}
      >
        <Link to="/">
          <img className="SignUpPageLogo" />
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "5% auto 0 auto ",
        }}
      >
        <div
          onClick={() => navigate("/signup/buyer")}
          className="SignUpImageBuyer"
        >
          <div className="SignUpImageBuyerCover"><div style={{marginTop:"50%"}}><span style={{fontWeight:"bold", fontSize:"2em"}}>Buyer</span></div></div>
        </div>

        <div
          onClick={() => navigate("/signup/seller")}
          className="SignUpImageSeller"
        >
          <div className="SignUpImageBuyerCover"><div style={{marginTop:"50%"}}><span style={{fontWeight:"bold", fontSize:"2em"}}>Seller</span></div></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLandingPage;
