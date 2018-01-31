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

    this.goBackOneDay = this.goBackOneDay.bind(this);
    this.getCurrentYear = this.getCurrentYear.bind(this);

  }

  componentDidMount() {
    this.props.getFireballData();
    this.props.getNeoData(this.props.currentYear);

  }

  // goes back one day in the current year timeline
  goBackOneDay(){
    if(this.props.currentYear !== `${this.getCurrentYear()}-01-01`) {
      return this.props.getNeoData(moment(this.props.currentYear).subtract('1', 'days').format('YYYY-MM-DD'));
    }
  }

  // returns only the Year of the current date
  getCurrentYear(){
    return Number(moment(this.props.currentYear).format("YYYY"));
  }

  render() {
    const scaleTime = d3.scaleTime().domain([new Date(this.getCurrentYear(), 0, 1), new Date(this.getCurrentYear(), 11, 31)]).range([1,365]); // domain is the date range, range should match the slider min/max

    return (
      <Fragment>
        <EarthSystem neodata={this.state}/>
        <div className="range-slider">
          <button onClick={e => this.goBackOneDay()}>Go Back</button>
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
