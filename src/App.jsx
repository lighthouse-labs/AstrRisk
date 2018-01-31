import React, {Component, Fragment} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData } from './actions/actions.js';
import * as d3 from 'd3';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFireballData();
  }

  render() {

    const scaleTime = d3.scaleTime().domain([new Date(2015, 0, 1), new Date(2015, 11, 31)]).range([1,365]); // domain is the date range, range should match the slider min/max

    return (
      <Fragment>
        <EarthSystem neodata={this.state}/>
        {/* <h2>{this.props.testState}</h2> */}
        {/* <button onClick={() => this.props.getNeoData('1990-01-0')}>LOAD NEO DATA</button> */}
        {/* <button onClick={() => this.props.testButton('HELLO')}>TEST BUTTON</button> */}

        <div className="range-slider">
          <p className="range-slider-date">{this.props.neoData[0].close_approach_data[0].close_approach_date}</p>
          <ul className="range-slider-months">
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </ul>
          <input
            type='range'
            min='1'
            max='365'
            step='1'
            className='slider'
            onChange={e => this.props.getNeoData(moment(scaleTime.invert(e.currentTarget.value)).format('YYYY-MM-DD'))}>
          </input>
        </div>


      </Fragment>);
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
