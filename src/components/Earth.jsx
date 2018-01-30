import React, {Component} from 'react';

class Earth extends Component{

  render() {
    return (
      <img src='../../public/assets/images/earth.svg' onClick={this.props.handleClick} className="earth"/>
    )
  }
}


export default Earth;