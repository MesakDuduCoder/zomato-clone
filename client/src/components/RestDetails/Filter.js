import React,{useState,useEffect} from 'react'
import Header from '../Common/Header'
import '../../styles/Filter.css'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router";





export default function Filter() {
    
    const [locations, setLocations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [restaurantList, setRestaurantList] = useState([])
    const[pageCount,setPageCount]=useState(0)
    let location = useLocation()
   
    
    const[filter,setFilter]=useState({
        city:'',
        Cuisine:[],
        type:[location.state],
        lcost:'',
        hcost:'',
        sort:1
    })
   
   

    const requestOptions={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(filter)
    }

  //call API
  useEffect(() => {
   
      fetch(
        `http://localhost:5000/restaurant/filter/${currentPage}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setRestaurantList(data.data);
          setPageCount(data.totalRecords / 2);
        });
      }
  , [filter,currentPage])


  useEffect(() => {
    fetch(`http://localhost:5000/location`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.data);
      });
    }
, [locations])



const handleLocation=(event)=>{
    
    filter.city=(event.target.value)
    setFilter({...filter})
}

    const handleCuisineChange=(event)=>{
        if(event.target.checked)
          filter.Cuisine.push(event.target.name)
        else
          {
              let index= filter.Cuisine.indexOf(event.target.name)
              if(index >-1)
              filter.Cuisine.splice(index,1)
          }  
       setFilter({...filter})

    }


    const handleCostChange=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setFilter({...filter})
    }

    const handleSort=(s)=>{
      filter.sort=s;
      setFilter({...filter})
    }

   const paginationItems=[]
   for(let i=1;i<=pageCount;i++){
     paginationItems[i]= <a href="#" onClick={()=>setCurrentPage(i)}>{i}</a>
   }
   let locationList = locations.length && locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>)


    
    return (
        <div>
            <Header/>
               <div id="myId" className="heading-filter">Filter Restaurants</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <div className="filter-options">
                                <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                    data-target="#demo"></span>
                                <div id="demo" className="collapse show">
                                    <div className="filter-heading">Filters</div>
                                    
                                    <select className="Rectangle-2236" onChange={(e)=>handleLocation(e)}>
                                        <option >Select location</option>
                                        {locationList}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div>
                                        <input type="checkbox" name="North Indian"  onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="South Indian" onChange={(e)=>handleCuisineChange(e)} />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Chinese"  onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">Chinese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Fast Food" onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Street Food" onChange={(e)=>handleCuisineChange(e)} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1,500)} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(500,1000)}/>
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1000,1500)} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1500,2000)} />
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(2000,10000)} />
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost"  onChange={()=>handleCostChange(1,10000)}/>
                                        <span className="checkbox-items">All</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" checked={filter.sort===1} onChange={()=>handleSort(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" checked={filter.sort===-1} onChange={()=>handleSort(-1)}/>
                                        <span className="checkbox-items">Price high to low</span> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                            <div className="col-sm-9 col-md-9 col-lg-9 scroll">
                             {
                                 restaurantList.length > 0 ? restaurantList.map((item)=>
                                 <div className="Item" >
                                 <div className="row pl-1">
                                     <div className="col-sm-4 col-md-4 col-lg-4">
                                         <img className="img" alt="thumbs" src={item.thumb} />
                                     </div>
                                     <div className="col-sm-8 col-md-8 col-lg-8">
                                         <div className="rest-name"> 
                                            <Link to={`/details/${item.name}`} style={{textDecoration: 'none'}}>
                                                {item.name}
                                            </Link></div>
                                         <div className="res-location">{item.locality}</div>
                                         <div className="rest-address">{item.city_name}</div>
                                     </div>
                                 </div>
                                 <hr />
                                 <div className="row padding-left">
                                     <div className="col-sm-12 col-md-12 col-lg-12">
                                         <div className="rest-address">CUISINES : {item.Cuisine.length && item.Cuisine.map((item)=> item.name+'/ ')}</div>
                                         <div className="rest-address">MEALTYPE : {item.type.length && item.type.map((item)=> item.name+'/ ')}</div>
                                         <div className="rest-address">COST FOR TWO : ₹ {item.cost} </div>
                                     </div>
                                 </div>
                             </div>

                                 ):<div className="noData"> No Data Found</div>
                             }
                            
                            </div>
                            <div>
                            <div className="pagination">
                                 <a href="1">&laquo;</a>
                                 {paginationItems}
                                 <a href="2">&raquo;</a>
                            </div>
                            </div>
                            
                        
                    </div>
                </div>
            </div >
    )
}
