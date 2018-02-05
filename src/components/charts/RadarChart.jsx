import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import * as d3 from 'd3';

class RadarChart extends Component {
  render() {
    const { speed, distance, diameter, mt, mass } = this.props;

    const distanceScale = d3.scaleLinear().domain([0, 55000000]).range([0, 1]);
    const diameterScale = d3.scaleLinear().domain([0, 800]).range([0, 1]);
    const massScale = d3.scaleLinear().domain([0, 9100000000]).range([0, 1]);
    const velocityScale = d3.scaleLinear().domain([0, 17000]).range([0, 1]);
    const energyScale = d3.scaleLinear().domain([0, 100]).range([0, 1]);

    const data = [
      [
        { axis: 'Distance', value: valueParser(distanceScale(distance)) },
        { axis: 'Diameter', value: valueParser(diameterScale(diameter)) },
        { axis: 'Mass', value: valueParser(massScale(mass)) },
        { axis: 'Relative Velocity', value: valueParser(velocityScale(speed * 1000)) },
        { axis: 'Energy (megatons)', value: valueParser(energyScale(mt)) }
      ]
    ]

    function valueParser (value) {
      if (value > 1) return 1
      if (value < 0.1) return 0.1
      else return value
    }

    var color = d3.scaleOrdinal(d3['schemeCategory20'])

    const width = 640,
      height = 300,
      radius = Math.min(width, height) / 2;

    const angleSlice = Math.PI * 2 / 5;

    const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

    const cx = (value, i) => { return rScale(value) * Math.cos(angleSlice * i - Math.PI / 2) };
    const cy = (value, i) => { return rScale(value) * Math.sin(angleSlice * i - Math.PI / 2) };
    const lx = (value, i) => { return rScale(1) * Math.cos(angleSlice * i * 2 - Math.PI / 2) };
    const ly = (value, i) => { return rScale(1) * Math.sin(angleSlice * i * 2 - Math.PI / 2) };

    var radarLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(d => { return rScale(d.value) })
      .angle((d, i) => { return i * angleSlice });

    const axisLines = d3.line()
      .x(d => { return d.x })
      .y(d => { return d.y })

    var radarDataPath = radarLine(data[0])

    const graphGrid = (
      [1, 2, 3].map((item, i) => (
        <circle cx={0} cy={0} r={radius * (i + 1) / 3} key={Math.floor(Math.random() * 800)} stroke={"#CDCDCD"} fillOpacity={0} />
      ))
    )

    var gridLines = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(d => { return rScale(d.value) })
      .angle((d, i) => { return i * angleSlice });

    const graphAxis = (
      [1, 2, 3, 4, 5].map((item, i) => (
        axisLines([{ x: 0, y: 0 }, { x: lx(1, i), y: ly(1, i) }])
      ))
    )

    const dataDots = (
      data[0].map((item, i) => (
        <circle cx={cx(item.value, i)} cy={cy(item.value, i)} r={3} key={Math.floor(Math.random() * 800)} stroke={color(16)} fill={color(16)} />
      ))
    )

    return (
      <Fragment>
        <svg width={width} height={height}>
          <g transform={"translate(" + width / 3 + "," + height / 2 + ")"}>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
            <path fill={color(16)} key={29} d={radarDataPath} fillOpacity={0.6} />
            <path fill={color(16)} key={2999} stroke={'#CDCDCD'} d={radarDataPath} fillOpacity={0.7} fill={'none'} filter={'url(#blurMe)'} />
            <path stroke={'#CDCDCD'} key={19090} d={graphAxis} fillOpacity={0.2} />
            {graphGrid}
            {dataDots}
            <text x={radius + 20} y={0} fontFamily="Verdana" fontSize="10">1111</text>
            <text x={-(radius) - 20} y={0} fontFamily="Verdana" fontSize="10">2222</text>
            <text x={0} y={radius + 20} fontFamily="Verdana" fontSize="10">3333</text>
            <text x={0} y={-(radius) - 20} fontFamily="Verdana" fontSize="10">4444</text>
          </g>
        </svg>
        <button onClick={e => this.changeDataSet()}>Change dataset</button>
      </Fragment>
    )


  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RadarChart);


