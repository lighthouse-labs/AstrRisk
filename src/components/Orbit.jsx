import React, {Component} from 'react';
import Earth from './Earth.jsx'


class Orbit extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);



  }

  handleClick() {
    console.log(this.props.neodata);
  }

  render() {
    return (
      <div>
        <div className="orbit">
          <img src='../../public/assets/images/mars.svg' className="mars"/>
          <div className="moon-orbit">
            <img src='../../public/assets/images/moon.svg' className="moon" onClick={this.handleClick} />
            <Earth/>
          </div>
        </div>
      </div>
    )
  }

}

export default Orbit;
