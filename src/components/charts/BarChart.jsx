import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
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
    const barNeoData = [
      [{ x: 200 }, { x: 80 }, { x: 100 }, { x: 20 }, { x: 180 }, { x: 200 }, { x: 200 }, { x: 80 }, { x: 100 }, { x: 20 }, { x: 180 }, { x: 200 }],
      [{ x: 20 }, { x: 45 }, { x: 170 }, { x: 80 }, { x: 10 }, { x: 170 }, { x: 20 }, { x: 45 }, { x: 170 }, { x: 80 }, { x: 10 }, { x: 170 }]]

    const axisTicks = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const xScale = d3.scaleTime().domain([new Date('2018-01-01'), new Date('2018-12-31')]).range([0, 1000]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([800, 0]);

    const xNode = this.refs.xAxis;
    const yNode = this.refs.yAxis;

    const xAxis = d3.select(xNode)
      .attr('stroke', '#42f498')
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')).ticks(12));

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
    if (!this.props.annualData.length) {
      console.log('empty!');
    } else {
      console.log('not empty!')
    }

    let dailyNeoCount = [];
    for (let date in this.props.annualData) {
      let length = this.props.annualData[date].length
      // console.log('length: ', length,)
      dailyNeoCount.push({length: length, dayOfYear: moment(date).dayOfYear() });
    }
    
    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = 1200 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3['schemeCategory20'])

    // Bar charts for monthly/annual data
    const barNeoData = [
      [{ x: 200 }, { x: 80 }, { x: 100 }, { x: 20 }, { x: 180 }, { x: 200 }, { x: 200 }, { x: 80 }, { x: 100 }, { x: 20 }, { x: 180 }, { x: 200 }],
      [{ x: 20 }, { x: 45 }, { x: 170 }, { x: 80 }, { x: 10 }, { x: 170 }, { x: 20 }, { x: 45 }, { x: 170 }, { x: 80 }, { x: 10 }, { x: 170 }]]
    const barScale = d3.scaleLinear().domain([0, 30]).range([0, 800]);
    const bars = (
      // barNeoData[0].map((neo, i) => (
        dailyNeoCount.map((day, i) => (
      //   console.log()
        <rect width={2} height={barScale(day.length)} y={10 - barScale(day.length)} x={day.dayOfYear * 4} stroke={'#42f498'} fill={'#42f498'} fillOpacity={0.4} />
        // <rect width={2} height={barScale(neo.x)} y={50 - barScale(neo.x)} x={i} stroke={'#42f498'} fill={'#42f498'} fillOpacity={0.4} />
      ))
    )

    const chartLine = d3.line()
                        .y(d => { return d.x })
                        .x((d,i) => { return d.dayOfYear })
                        // .curve(d3.curveBasis)

    const generatedLine = chartLine(dailyNeoCount);



    return (
      <Fragment>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={"translate(" + -180 + "," + 740 + ")"}>
            <path transform={"translate(" + (margin.left + 20) + "," + -50 + ")"} fill={'#42f498'} key={24219} d={generatedLine} fillOpacity={1}/>
            {bars}
          </g>
          <g className="x-axis" ref="xAxis" transform={"translate(" + (margin.left + 20) + "," + height + ")"}></g>
          <g className="y-axis" ref="yAxis" transform={"translate(" + margin.left + "," + 300 + ")"}></g>
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


