import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData, toggleGraph } from '../actions/actions';
import BarChart from './charts/BarChart.jsx';
import * as d3 from 'd3';
import moment from 'moment';

class MenuOptions extends Component {

  render() {
    const { showGraph } = this.props;

    return (
      <Fragment>
        <div className="chart-icon">
          <img src='../../public/assets/images/graph-icon.svg' onClick={e => this.props.toggleGraph()} className="chart graph-icon" />
        </div>
        {showGraph && <BarChart />}
      </Fragment>
    )


  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    annualData: state.annualData,
    showGraph: state.showGraph
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnualNeoData, toggleGraph
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions);


