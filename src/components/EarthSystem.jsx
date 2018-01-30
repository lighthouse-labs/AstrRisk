import React, {Component} from 'react';
import Orbit from './Orbit.jsx'


class EarthSystem extends Component{

  render() {
    return (
      <div className="earth-system">
        <Orbit onClick={this.props.handleClick}/>
      </div>
    )
  }

}

export default EarthSystem;
