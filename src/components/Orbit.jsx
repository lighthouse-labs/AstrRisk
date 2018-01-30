import React, {Component} from 'react';
import Earth from './Earth.jsx'


class Orbit extends Component {

  render() {
    return (
      <div>
        <div className="orbit">
          <img src='../../public/assets/images/mars.svg' className="mars"/>
          <div className="moon-orbit">
            <img src='../../public/assets/images/moon.svg' className="moon"/>
          </div>
        </div>

      </div>
    )
  }

}

export default Orbit;
