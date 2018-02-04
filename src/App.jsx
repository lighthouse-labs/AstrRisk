import React, {Component, Fragment} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import SliderBar from './components/SliderBar.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {testButton, getNeoData, getFireballData} from './actions/actions.js';
import BarChart from './components/BarChart.jsx';
import PieChart from './components/PieChart.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.getFireballData();
    this.props.getNeoData(this.props.currentDate);
    document.getElementById("loader").className += " hidden";
  }


  render() {

    return (<Fragment>
        {/* <EarthSystem neodata={this.state}/>
        <SliderBar /> */}
        <PieChart/>
        {/* <BarChart data={[5, 10, 1, 3]} size={[500, 500]} /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {neoData: state.neoData, testState: state.testReducer, fireBallData: state.fireBallData, currentDate: state.currentDate}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testButton, //Usage: test('string to display');
    getNeoData, //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
    getFireballData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
