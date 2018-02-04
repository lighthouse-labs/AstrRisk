import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import * as d3 from 'd3';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataset: 'apples',
       data: [
      { apples: 53245, oranges: 200 },
      { apples: 28479, oranges: 200 },
      { apples: 19697, oranges: 200 },
      { apples: 24037, oranges: 200 },
      { apples: 40245, }
      ],
      dataset2: 0
    }
  }

  changeDataSet() {
    this.state.dataset === 'oranges' ? this.setState({ dataset: 'apples' }) : this.setState({dataset: 'oranges'});
    this.state.dataset2 === 0 ? this.setState({ dataset2: 1 }) : this.setState({dataset2: 0 });

  }

  render() {
    const width = 640,
         height = 300,
         radius = Math.min(width, height) / 2;
         
         var color = d3.scaleOrdinal(d3['schemeCategory20'])

         var pie = d3.pie()
          .value(d => d[this.state.dataset]) // the numeric value of the arc.
          .sort(null);

         var arc = d3.arc()
            .innerRadius(radius - 80)
            .outerRadius(radius - 20)
            .cornerRadius(3)
            .padAngle(0.04)

        var displayedData = pie(this.state.data);
        // console.log('displayedData is: ', displayedData);


        // Spiderchart //////////////////////////////////

        var data2 = [ 
          [ { axis: "Battery Life", value: 0.22 }, 
            { axis: "Brand", value: 0.28 }, 
            { axis: "Contract Cost", value: 0.29 }, 
            { axis: "Design And Quality", value: 0.17 }, 
            { axis: "Have Internet Connectivity", value: 0.22 }, 
            { axis: "Large Screen", value: 0.02 }, 
            { axis: "Price Of Device", value: 0.21 }, 
            { axis: "To Be A Smartphone", value: 0.50 } ], 
            [ { axis: "Battery Life", value: 0.27 }, 
              { axis: "Brand", value: 0.16 }, 
              { axis: "Contract Cost", value: 0.35 }, 
              { axis: "Design And Quality", value: 0.13 }, 
              { axis: "Have Internet Connectivity", value: 0.20 }, 
              { axis: "Large Screen", value: 0.13 }, 
              { axis: "Price Of Device", value: 0.35 }, 
              { axis: "To Be A Smartphone", value: 0.38 } ], [ { axis: "Battery Life", value: 0.26 }, { axis: "Brand", value: 0.10 }, { axis: "Contract Cost", value: 0.30 }, { axis: "Design And Quality", value: 0.14 }, { axis: "Have Internet Connectivity", value: 0.22 }, { axis: "Large Screen", value: 0.04 }, { axis: "Price Of Device", value: 0.41 }, { axis: "To Be A Smartphone", value: 0.30 } ] ];

        const angleSlice = Math.PI * 2 / 8;

        const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius * 2]);

        const diameterScale = d3.scaleLinear().domain([0, 800]).range([0, radius]);
        const velocityScale = d3.scaleLinear().domain([0, 17000]).range([0, radius]);
        const distanceScale = d3.scaleLinear().domain([0, 55000000]).range([0, radius]);
        const energyScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

        const cx = (value, i) => { return rScale(value) * Math.cos(angleSlice*i - Math.PI / 2)};
        const cy = (value, i) => { return rScale(value) * Math.sin(angleSlice*i - Math.PI / 2)};
        const lx = (value, i) => { return rScale(0.5) * Math.cos(angleSlice*i * 2 - Math.PI / 2)};
        const ly = (value, i) => { return rScale(0.5) * Math.sin(angleSlice*i * 2 - Math.PI / 2)};
        
        console.log('rscale value is: ', rScale(0.35));

        var radarLine = d3.lineRadial()
            // .curveLinearClosed()
            .curve(d3.curveCardinalClosed)
            .radius(d => { return rScale(d.value)})
            .angle((d,i) => { return i * angleSlice });

        const axisLines = d3.line()
            // .x((d,i) => { console.log('i is: ', i); return d })
            .x(d => { console.log('d.x is: ', d.x); return d.x })
            .y(d => { return d.y })

        var spiderChartData = radarLine(data2[this.state.dataset2])
        // console.log('spiderchartdata is: ', spiderChartData);

        const graphGrid = (
          [1, 2, 3, 4].map((item, i) => (
            <circle cx={0} cy={0} r={radius * (i + 1) / 4} key={Math.floor(Math.random() * 800)} stroke={"#CDCDCD"} fillOpacity={0}/>
          ))
        )

        var gridLines = d3.lineRadial()
          // .curveLinearClosed()
          .curve(d3.curveCardinalClosed)
          .radius(d => { return rScale(d.value) })
          .angle((d, i) => { return i * angleSlice });

        const graphAxis = (
          [1,2,3,4].map((item, i) => (
          //   axisLines({x: i*30, y: i * 10})
          axisLines([{x: 0, y: 0}, {x: lx(1, i), y: ly(1, i)} ])
          ))
        )

        const dataDots = (
          data2[this.state.dataset2].map((item, i) => (
            <circle cx={cx(item.value, i)} cy={cy(item.value, i)} r={3} key={Math.floor(Math.random() * 800)} stroke={color(16)} fill={color(16)}/>
          ))
        )


        console.log('graph grid is: ', graphGrid);

    return (
      <Fragment>
          <svg width={width} height={height}>
            <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
              {displayedData.map((slice, i) =>
                <Motion key={i} 
                  defaultStyle={{ startAngle: slice.startAngle, endAngle: slice.endAngle, padAngle: slice.padAngle, }} 
                  style={{ startAngle: spring(slice.startAngle), endAngle: spring(slice.endAngle), padAngle: spring(slice.padAngle) }}>
                    {value => <path fill={color(i)} d={arc(value)} />
                }</Motion>
              )}
                {/* <path fill={color(i)} key={i} d={arc(slice)} /> */}
              )}        
            </g>
          </svg>
          <button onClick={e => this.changeDataSet()}>Change dataset</button>
          <svg width={width} height={height}>
            <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>

              <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
              </filter>

              <path fill={color(16)} key={29} d={spiderChartData} fillOpacity={0.6}/>
              <path fill={color(16)} key={2999} stroke={'#CDCDCD'} d={spiderChartData} fillOpacity={0.7} fill={'none'} filter={'url(#blurMe)'}/>
              <path stroke={'#CDCDCD'} key={19090} d={graphAxis} fillOpacity={0.2}/>
              {graphGrid}
              {dataDots}
              <text x={radius + 20} y={0} fontFamily="Verdana" fontSize="10">1111</text>
              <text x={-(radius) - 20} y={0} fontFamily="Verdana" fontSize="10">2222</text>
              <text x={0} y={radius + 20} fontFamily="Verdana" fontSize="10">3333</text>
              <text x={0} y={-(radius) - 20} fontFamily="Verdana" fontSize="10">4444</text>
            </g>
          </svg>
        <svg width={width} height={height}>
          <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
          </g>
        </svg>
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

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);


