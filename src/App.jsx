import React, {Component, Fragment} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import SliderBar from './components/SliderBar.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {testButton, getNeoData, getFireballData, getAnnualNeoData } from './actions/actions.js';
import BarChart from './components/charts/BarChart.jsx';
import PopUp from './components/PopUp.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFireballData();
    this.props.getNeoData(this.props.currentDate);
    this.props.getAnnualNeoData(this.props.currentDate);
    document.getElementById("loader").className += " hidden";
  }

  render() {

    return (<Fragment>
        <EarthSystem />
        <SliderBar />
        {this.props.showPopUp && <PopUp />}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {neoData: state.neoData, testState: state.testReducer, fireBallData: state.fireBallData, currentDate: state.currentDate, annualData: state.annualData, showPopUp: state.showPopUp}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNeoData, //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
    getFireballData,
    getAnnualNeoData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
