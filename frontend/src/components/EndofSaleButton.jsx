function EndofSaleButton({listings}){

    const handleTransfer = () => {
        console.log("transferred!");
        
        fetch ('/api/products/new', {method:"POST", headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(listings)    
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .then(
        fetch (`/api/listings/${listings[0]._id}`, {method:"DELETE", headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(listings)    
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    )
        // console.log("index", num);
        // fetch(`/api/buyers/${login?.[user]?._id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     ...profile,
        //     groups: profile?.groups.filter((item, index) => index !== num),
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("delete data", data);
        //     setProfile({
        //       ...profile,
        //       groups: profile?.groups.filter((item, index) => index !== num),
        //     });
        //   });
      };

      
    return(
        <button onClick={handleTransfer}>
            TRANSFER
        </button>
    )
}

export default EndofSaleButton;