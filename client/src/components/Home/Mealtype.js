import React from 'react'
import { Link } from 'react-router-dom';

export default function(props) {
    const{name,content,image}=props.item 
   
   
  return (
    <div className="col-sm-12 col-md-12 col-lg-4">
        <div className="tileContainer">
        
            <div className="tileComponent1">
           
            <img src={require('../../'+ image)} alt="meals" height="150" width="140" />
            </div>
               
          
            <div className="tileComponent2">
                <div className="componentHeading" >
               <Link to="/filter"
                        state={props.item.name}
                        style={{textDecoration: 'none'}}>
               
               {name}
               </Link>
               
                </div>
             
                <div className="componentSubHeading">
                    {content}
                </div>
            </div>
        </div>
    </div>
     
  )

}