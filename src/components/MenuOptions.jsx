import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData, showHeatMapPopUp, closePopUp } from '../actions/actions';
import BarChart from './charts/BarChart.jsx';
import HeatMap from './charts/HeatMap.jsx';
import * as d3 from 'd3';
import moment from 'moment';
import * as MdIconPack from 'react-icons/lib/md'


class MenuOptions extends Component {

  render() {
    const { showHeatMap } = this.props;

    return (
      <Fragment>
        <div className="chart-icon">
          <img src='../../public/assets/images/graph-icon.svg' onClick={e => this.props.showHeatMapPopUp()} className="chart graph-icon" />
        </div>
        <div className="x-button-heatmap">
          {/* {showHeatMap && <MdIconPack.MdClear size={80} onClick={e => this.props.closePopUp()} />} */}
        </div>
        {/* {showHeatMap && <HeatMap />} */}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    annualData: state.annualData,
    showHeatMap: state.showHeatMap
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnualNeoData, showHeatMapPopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions);


