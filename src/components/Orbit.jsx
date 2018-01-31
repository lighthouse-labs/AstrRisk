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

  componentDidMount() {}

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

      <div className="neo-orbit">
        {
          this.props.neoData.map(function(neo, i) {
            return (

              <Neo key={i} name={neo.name}></Neo>)
          })
        }
      </div>

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
