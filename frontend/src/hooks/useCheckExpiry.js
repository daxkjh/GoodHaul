

// const checkExpiry=(productArr)=>{
// const currentTime=new Date();
// const currentSeconds=currentTime.getTime();
// // console.log(currentTime.getTime());
// // const x= {date:new Date()};
// // console.log(x.date.getTime())
// // console.log(typeof currentTime);
// // console.log(typeof (productArr[0].dateExpiry))
// const invalidProducts=productArr.filter((x)=>{
//     let date=new Date(x["dateExpiry"]);
//     let compareSeconds=date.getTime();
//     if (x["dateExpiry"]&&compareSeconds<currentSeconds){
//         // if (x["dateExpiry"]){
//         return x;
//     }

// })
// // const invalidProducts=productArr.map((x)=>{
// //    if(x.dateExpiry){
// //     console.log(x.dateExpiry.getTime())
// //    }

// // })
// console.log("original products",productArr);
// console.log("invalidProducts", invalidProducts);

// fetch("/api/preferences/", {
//     method:"DELETE",
//     headers:{
//       "Content-Type":"application/json",
//     },
//     body:JSON.stringify(invalidProducts)
//   })
//   .then((response)=>response.json())
//   .then((data)=>{ fetch(`/api/products/new`, {
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
//     },
//     body:JSON.stringify(data)
//   })
//   .then((response)=>response.json())
//   .then((data)=>{console.log("data new",data)})

//   })

// }

// export default checkExpiry;


import {useState,useEffect} from 'react'
const useCheckExpiry = () => {
  const [productArr, setProductArr] = useState([]);
  const currentTime = new Date();
  const currentSeconds = currentTime.getTime();

  useEffect(()=>{
    fetch("/api/preferences/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
      
        // console.log(currentTime.getTime());
        // const x= {date:new Date()};
        // console.log(x.date.getTime())
        // console.log(typeof currentTime);
        // console.log(typeof (productArr[0].dateExpiry))
  
        // const invalidProducts=productArr.map((x)=>{
        //    if(x.dateExpiry){
        //     console.log(x.dateExpiry.getTime())
        //    }
  
        // })
        fetch("/api/preferences/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            data.data?.filter((x) => {
              let date = new Date(x["dateExpiry"]);
              let compareSeconds = date.getTime();
              if (x["dateExpiry"] && compareSeconds < currentSeconds) {
                // if (x["dateExpiry"]){
                return x;
              }
            })
          ),
        })
          .then((response) => response.json())
          .then((data) => {
            fetch("/api/products/new", {
              method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data.data?.filter((x) => {
                  let date = new Date(x["dateExpiry"]);
                  let compareSeconds = date.getTime();
                  if (x["dateExpiry"] && compareSeconds < currentSeconds) {
                    // if (x["dateExpiry"]){
                    return x;
                  }
                })),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("data new", data);
                });
            
          })
          
          
        });

  },[])
  
};

export default useCheckExpiry;
