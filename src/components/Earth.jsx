import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData, showNeoData } from '../actions/actions.js';
import * as d3 from 'd3';
import moment from 'moment';

class Earth extends Component {


  render() {
    return (
      <div className={"earth"}>
        <div className={"cube"}>
          <div className={"face1"}><img src="../../public/assets/images/canada-russia.svg"/></div>
          <div className={"face2"}><img src="../../public/assets/images/oceania.svg"/></div>
          <div className={"face3"}><img src="../../public/assets/images/southpacific.svg"/></div>
          <div className={"face4"}></div>
          <div className={"face5"}><img src="../../public/assets/images/murica-southmurica.svg"/></div>
          <div className={"face6"}><img src="../../public/assets/images/africa.svg"/></div>
        </div>

	    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    fireBallData: state.fireBallData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Earth)
