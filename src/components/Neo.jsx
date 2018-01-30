import React, {Component} from 'react';

class Neo extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
    console.log(this.props.distance);
  }


  render(){
    return(
      <div className="neo">
        <img src='../../public/assets/images/neo.svg' className="neo"/>
        <p>{this.props.distance}kms</p>
      </div>

    )
  }

}

export default Neo;
