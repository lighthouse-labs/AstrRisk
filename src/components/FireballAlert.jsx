import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData } from '../actions/actions.js';
import * as Material from 'react-icons/lib/md'
import Fireball from './Fireball.jsx';

class FireballAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {showfireball: false};
  }

  render() {
    const { fireBallData, currentDate } = this.props;
    const { date, energy, impactEnergy } = fireBallData;
    return (
      <Fragment>
      <div className="alertContainer">
      {fireBallData[currentDate] && <Material.MdWarning className="alert" onClick={e => this.setState({showfireball: true})}/>
      }
      </div>
      {this.state.showfireball && <Fireball/>}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    fireBallData: state.fireBallData,
    testState: state.testReducer,
    currentDate: state.currentDate
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testButton,
    getNeoData,
    getFireballData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FireballAlert)