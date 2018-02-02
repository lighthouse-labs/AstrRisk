import React, {Component, Fragment} from 'react';
import Earth from './Earth.jsx'
import Neo from './Neo.jsx'
import Fireball from './Fireball.jsx'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Orbit extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {


    return (<Fragment>

      <div className="moon-orbit">
        <img src='../../public/assets/images/moon.svg' className="moon"/>
      </div>

      <div className="orbit">
        <img src='../../public/assets/images/mars.svg' className="mars" onClick={this.handleClick}/>
      </div>

      {/* <div className='fireball-path'>
        <Fireball/>
      </div> */}

        {
          this.props.neoData.map(function(neo, i) {
            const distance = neo.close_approach_data[0].miss_distance.kilometers;
            const avgDiameter = Math.floor((neo.estimated_diameter.meters.estimated_diameter_min + neo.estimated_diameter.meters.estimated_diameter_max) / 2);
            const speed = neo.close_approach_data[0].relative_velocity.kilometers_per_second;
            const name = neo.name;
            const hazard = neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No';
            
            return (
              <Neo key={i} name={name} distance={distance} avgDiameter={avgDiameter} speed={speed} hazard={hazard}></Neo>
            )
              
          })
        }
      

    </Fragment>)
  }
}

function mapStateToProps(state) {
  return {neoData: state.neoData, testState: state.testReducer}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orbit);
