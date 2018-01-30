import React, {Component, Fragment} from 'react';
import Earth from './Earth.jsx'
import Neo from './Neo.jsx'

class Orbit extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {

  }

  render() {

    return (
      <Fragment>
      <div className="orbit">
        <img src='../../public/assets/images/mars.svg' className="mars" onClick={this.handleClick}/>
        <div className="moon-orbit">
          <img src='../../public/assets/images/moon.svg' className="moon"/>

          <Earth/>
      </div>
      <div className="neo-orbit">
        {this.props.neodata.neodata.neodata.map(function(neo, i){
          return <Neo key={i} distance={neo.close_approach_data[0].miss_distance.kilometers}>{neo}</Neo>;
          })}
        </div>
      </div>
    </Fragment>)
  }

}

export default Orbit;
