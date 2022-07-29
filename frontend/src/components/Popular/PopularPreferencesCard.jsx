import {useNavigate} from 'react-router-dom'

function PopularPreferencesCard({detail,login}){
  const navigate=useNavigate();
// console.log("login",login);
    const handleClick = (detail) => {
        console.log("clicked");
        fetch(`/api/buyers/${login.buyer._id}`
        , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          //? need to send to buyers
          body: JSON.stringify(detail)
        }
        )
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
    
      const handleUpdate = () => {
        console.log("update");
      };
    
      const handleDelete = () => {
        console.log("delete");
        // fetch(`/api/`);
      };
      // console.log("STATUS",Object.keys(login));

      const handleDetails=(id)=>{
        console.log("details is coming");
        console.log(id);
        navigate(`/details/${id}`);
      }
  const sum = detail?.buyerList?.reduce((accumulator, object) => accumulator + parseInt(object.quantity), 0)
    return(
        <>
        <div onClick={()=>handleDetails(detail._id)} className="card-borders">
        <div className="titleBox">{detail.name}</div>
        <div style={{backgroundImage: `url("${detail?.image}")`}} alt={detail._id}  className="cardImageContainer">
        {/* <img className="cardImage" src={detail.image} alt={detail._id} /> */}
        </div>
        <div style={{position:"relative", width:"100%", marginTop:"0.5em"}}>
        <div style={{display:"inline-block", position:"relative", width:'50%'}} className="haulersIconContainer">
          <img style={{width:"30%", marginLeft:"1.5em"}} src="https://i.imgur.com/aTfhFdHs.jpg?1"/><span>{detail?.buyerList?.length}</span>
        </div>
        <div style={{display:"inline-block",position:"relative", width:'50%', textAlign:"right"}} className="haulersIconContainer">
          <img style={{width:"30%"}} src="https://i.imgur.com/h7GVern.png"/><span style={{marginRight:"1.5em"}}>{sum}</span>
        </div>
        </div>
        <div  style={{position:"relative", marginTop:"1.5em"}} className="detailBox">
        <p className="descriptionBox">
          {detail.description}
          </p>
          </div>
          <h1 style={{textAlign:"right", marginBottom:"-0.3em", marginRight:""}}>
          
          $ {detail.price}
        </h1>
        
        {/* <button onClick={()=>handleDetails(detail._id)}>Click here for more details</button> */}
        {/* {(Object.keys(login).length===0)?"":Object.keys(login)[0]==="buyer"?<button
          onClick={() => {
            handleClick(detail);
          }}
        >
          for buyer - Group Buy
        </button>:
        <><button onClick={handleUpdate}>for seller - Edit</button>
        <button onClick={handleDelete}>for seller - Delete</button></>} */}
      </div>
        </>
    )
}
export default PopularPreferencesCard;