import React, { Component } from 'react'
import Mealtype from './Mealtype';
import '../../styles/wallpaper.css'

export default class extends Component {

constructor(){
  super();
  this.state={
    mealtypes:[],
    
  }
  
}

componentDidMount(){
  fetch("http://localhost:5000/mealtype", { method: "GET" })
    .then((response) => response.json())
    .then((data) => this.setState({ mealtypes: data.data }));
}

  render() {

    let quickSearchList= this.state.mealtypes.length && this.state.mealtypes.map((item)=><Mealtype item={item} value={item.name} key={item.name}></Mealtype>)
    
 
    return (
      <div>
         
        <div className="quicksearch">
          
              <p className="quicksearchHeading">
                  Quick Searches
              </p>
              <p className="quicksearchSubHeading">
                  Discover restaurants by type of meal
              </p>
              {/* <!-- Creating CSS Grid - Rows & Columns -->
              <!-- Creating CSS Responsive Conatiner --> */}
              <div className="container-fluid">
                  {/* <!-- Adding Row --> */}
                  <div className="row" >
                  
            {quickSearchList}
                     
                  </div>
              </div>
        </div>
      </div>
    )
  }
}

