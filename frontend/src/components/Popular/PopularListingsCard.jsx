//CLIVAN- References cards and listings cards seems to be the same, to explore if can combine, depends on the button.
//Cards are incomplete
import {useNavigate} from 'react-router-dom'

function PopularListingsCard({detail,login}){
const navigate=useNavigate();
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

      const handleDetails=(id)=>{
        // console.log("details is coming");
        // console.log(id);
        navigate(`/details/${id}`);
      };

      const sum = detail?.buyerList?.reduce((accumulator, object) => accumulator + parseInt(object.quantity), 0)
    return(
        <div style={{maxWidth:"16.8em"}}>
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
        </div>
        </div>
    )
}

export default PopularListingsCard;