import React, {Component} from 'react';

class Neo extends Component{
  constructor(){
    super();
  }

  // gets orbit based on data pulled in
  getOrbit(){
    // change css here to new NEO orbit
  }

  render(){
    return(
      <div>
        <img src='../../public/assets/images/neo.svg' className="neo" />
      </div>
    )
  }

}
