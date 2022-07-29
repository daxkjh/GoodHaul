import {useEffect, useState} from 'react'

function AllPreferredItems(){
    const[preferredItems, setPreferredItems]=useState([]);
    useEffect(()=>{
        fetch('/api/preferences',{method:'GET'})
        .then (response=>response.json())
        .then (data=>{setPreferredItems(data.data);})
    },[])
    console.log("preferred",preferredItems);

    // const ShowItems=()=>{
        
    //     const arr=preferredItems.map((x)=>{
    //     Object.keys(x).filter((y)=>{
    //          if(y!=="_id" && y!=="image" && y!=="__v"){
    //              console.log("test", y)
    //              return y;
    //          }
    //      })
    //      })
    //     console.log(arr);}
    return(
        <>
        <h1>All preferred Items</h1>
        <ul>
            <li>test</li>
            {/* {preferredItems.map((item) => { 
                Object.keys(item).filter((x) => x === "name").map( x => {<li>item[x]</li>}) })} */}
              
        </ul>
        </>
    )
}

export default AllPreferredItems;