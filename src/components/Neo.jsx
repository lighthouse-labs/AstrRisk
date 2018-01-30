import React, {Component, Fragment} from 'react';

class Neo extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
    console.log(this.props.distance);
  }


  render(){
    return(
      <Fragment>
        <img src='../../public/assets/images/neo.svg' className="neo"/>
      </Fragment>

    )
  }

}

export default Neo;
