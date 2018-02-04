import React, {Component} from 'react';
import Orbit from './Orbit.jsx';
import Earth from './Earth.jsx';
import FireballAlert from './FireballAlert.jsx';



class EarthSystem extends Component{

  render() {
    return (
      <div className="earth-system">
        <Orbit/>
        <Earth/>
        {/* <div className="blur-filter"></div> */}
        <FireballAlert/>
      </div>
    )
  }
}

export default EarthSystem;
