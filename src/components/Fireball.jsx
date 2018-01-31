import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData } from '../actions/actions.js';
import * as d3 from 'd3';
import moment from 'moment';


class Fireball extends Component {
  //Fields: 0-Date, 1-Energy, 2-impact-energy,
  //fireBallData.ta

  render() {
    return (
      <Fragment>
          <img src='../../public/assets/images/neo.svg' className="fireball" />
          {/* {this.props.fireBallData['2018-01-22'] && this.props.fireBallData['2018-01-22'][1]} */}
      </Fragment>
    )
  }

}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    fireBallData: state.fireBallData,
    testState: state.testReducer,
    currentYear: state.currentYear
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testButton, //Usage: test('string to display');
    getNeoData,  //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
    getFireballData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Fireball)