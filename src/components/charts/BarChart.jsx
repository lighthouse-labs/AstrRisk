import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData } from '../../actions/actions';
import * as d3 from 'd3';
import moment from 'moment';

class BarChart extends Component {

  componentDidMount() {
    this.makeAxis();
  }

  componentDidUpdate() {
    this.makeAxis();
  }

  makeAxis() {
    // Margin for the graph
    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 1200 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;

    const axisTicks = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Scales x-axis & y-axis to the width and height
    const xScale = d3.scaleTime().domain([new Date('2018-01-01'), new Date('2018-12-31')]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 25]).range([height, 0]);

    const xNode = this.refs.xAxis;
    const yNode = this.refs.yAxis;

    const xAxis = d3.select(xNode)
      .attr('stroke', '#42f498')
      .call(d3.axisBottom(xScale).ticks(12).tickFormat(d3.timeFormat('%b')))
      .selectAll("text")
      .attr('transform', 'translate(50, 0)');

    const yAxis = d3.select(yNode)
      .attr('stroke', '#42f498')
      .call(d3.axisLeft(yScale).ticks(4));

  }

  printData() {
    console.log('result: ', moment('2015-03-03').dayOfYear());
    let dailyNeoCount = [];
    for (let date in this.props.annualData) {
      const length = this.props.annualData[date].length
      // const theDate = date;
      dailyNeoCount.push({[date]: length});
      // console.log(`date is: ${theDate}, count is: ${length}`);
    }
    console.log(dailyNeoCount);
  }
  // // }

  render() {
    // Margin for the graph
    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 1200 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;

    // Creates array for d3 to generate data from
    let dailyNeoCount = [];
    for (let date in this.props.annualData) {
      const dayOfYear = moment(date).dayOfYear();
      if (dayOfYear % 2 !== 0) {
        const length = this.props.annualData[date].length
        dailyNeoCount.push({length: length, dayOfYear: dayOfYear });
      }
    }
    
    // Sorts array based on day of year
    dailyNeoCount.sort((a, b) => {
      const keyA = a.dayOfYear,
            keyB = b.dayOfYear;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    var color = d3.scaleOrdinal(d3['schemeCategory20'])

    // Scales points along y-axis
    const barScale = d3.scaleLinear().domain([0, 25]).range([0, height]);
    // Scales points along the x-axis
    const horizontalScale = d3.scaleLinear().domain([1,365]).range([0, width])
    const bars = (
        dailyNeoCount.map((day, i) => (
        <rect width={1} height={barScale(day.length)} y={10 - barScale(day.length)} x={horizontalScale(day.dayOfYear)} stroke={'#42f498'} fill={'#42f498'} fillOpacity={0.4} />
      ))
    )

    // Generates single chart line
    const chartLine = d3.line()
                        .y(d => { console.log('y', barScale(d.length)); return (barScale(d.length) * -1) })
                        .x((d, i) => { console.log('x', horizontalScale(d.dayOfYear)); return horizontalScale(d.dayOfYear)})
    //                     .x((d,i) => { return i + 105})
    //                     // .curve(d3.curveBasis)

    console.log(dailyNeoCount);

    const generatedLine = chartLine(dailyNeoCount);
    // const generatedLine = chartLine(barNeoData[0]);



    return (
      <Fragment>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={"translate(" + (margin.left + 1) + "," + (height - 10) + ")"}>
            <path transform={"translate(" + 0 + "," + -300 + ")"} stroke={'#f4e842'} fill={'none'} key={24219} d={generatedLine} strokeOpacity={0.9}/>
            {bars}
          </g>
          <g className="x-axis" ref="xAxis" transform={"translate(" + margin.left + "," + height + ")"}></g>
          <g className="y-axis" ref="yAxis" transform={"translate(" + margin.left + "," + 0 + ")"}></g>
        </svg>
        {/* <button onClick={e => this.changeDataSet()}>Change dataset</button> */}
        <button onClick={e => this.printData()}>Reload Data</button>
      </Fragment>
    )


  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    annualData: state.annualData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnualNeoData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


