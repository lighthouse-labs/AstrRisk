import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData, getNeoData } from '../../actions/actions';
import * as d3 from 'd3';
import moment from 'moment';

class HeatMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataset: 0
    }
  }

  componentDidMount() {
    this.makeHeatMap(this.props.annualData);
  }

  componentWillReceiveProps({ annualData }) {
    this.makeHeatMap(annualData);
  }

  // componentDidUpdate() {
  //   this.makeHeatMap(this.props.annualData);
  // }

  shouldComponentUpdate() {
    return false
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dat !== this.props.)
  // }



  makeHeatMap(data2) {
    // Margin for the graph
    const marginAll = 100;
    const margin = { top: marginAll, right: marginAll, bottom: marginAll, left: marginAll },
      width = 1400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    const axisTicks = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Scales x-axis & y-axis to the width and height
    const xScale = d3.scaleTime().domain([new Date('2018-01-01'), new Date('2018-12-31')]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 20]).range([height, 0]);

    const heatMapNode = this.refs.heatMap;

    const g = d3.select(heatMapNode);

   

    // const xAxis = d3.select(heatMapNode)
    //   .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')))
    //   .selectAll("text")
    //   .attr('stroke', '#fff')
    //   .attr('class', 'axis')
    //   .attr('transform', 'translate(50, 0)');


    ////////////////////////////////////////////////////////////////////////////

    const gridSize = Math.floor(width / 31),
      bucket = 8,
      colors = ['#fff7f3',' #fde0dd','#fcc5c0',' #fa9fb5', '#f768a1', "#dd3497", "#ae017e", "#7a0177"], // dark purple
      // colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // blue
      // colors = [ "#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f"], // light purple
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const spectral = d3.scaleOrdinal(d3.schemeBlue);

    // Y-Axis
    const yAxis = g.selectAll('.heatmap-yAxis')
      .data(months)
      .enter()
      .append('text')
      .text(d => { return d })
      .attr('x', 0)
      .attr('y', (d, i) => { return i * (gridSize + 3)})
      .attr('transform', 'translate(' + -10 + "," + 25 + ")")
      .attr('class', 'heatmap-axis');

    // X-Axis
    const xAxis = g.selectAll('.heatmap-xAxis')
      .data(days)
      .enter()
      .append('text')
      .text(d => { return d })
      .attr('x', (d, i) => { return i * (gridSize + 3)})
      .attr('y', 0)
      .attr('transform', 'translate(' + 20 + "," + -8 + ")")
      .attr('class', 'heatmap-axis heatmap-xAxis');

    const heatMapChart = (data) => {

      const colorScale = d3.scaleQuantile().domain([0, 24]).range(colors);
      // const colorScale = d3.scaleOrdinal().domain(this.props.annualData).range(d3.schemeBlue);

      // console.log(colorScale(10));

      const tiles = g.selectAll('.day')
        .data(data, (d) => { return d.month + ':' + d.day });

      const tooltip = g.append('div')

      tiles.enter().append('rect')
        .attr('x', d => { return (d.day - 1) * (gridSize + 3) })
        .attr('y', d => { return (d.month - 1) * (gridSize + 3) })
        .attr('rx', 4) // rectangle radius
        .attr('ry', 4)
        .attr('class', 'grid-border')
        .attr('width', gridSize)
        .attr('height', gridSize)
        .style('fill', d => { colors[0] })//return colorScale(d.value) })//colors[0]);
        .on('click', d => { this.props.getNeoData(d.date) })
        .attr('class', d => { return `heatmap-squares S${d.date}`})
        .on('mouseover', d => {

          const target = d3.select('.S2015-01-02')

            target
              .transition()
              .duration(1000)
              .attr('width', 200)
              .attr('fill', colors[0]);

          // console.log('d3 this: ', d3.select(this))
          // console.log('d3 tiles: ', d3.select(tiles))
          // console.log('d3 day: ', d3.select('.S2015-01-02'))
          // console.log('d3 rect: ', d3.select(this.refs.rect));
          // d3.select(tiles)
          //   .transition()
          //   .easeCubicInOut(0.5)
          //   .duration(1000)
          //   .attr('fill', colors[2]);

          // tiles
          //   .transition()
          //   .duration(1000)
          //   .attr('width', d => {
          //     return 100
          //   })
        })
        .transition()
          .duration(1250)
          .ease(d3.easeCubic)
          .style('fill', d => { return colorScale(d.value) });

      function transition() {
        console.log('hi');
      }  

      // tiles.transition().duration(1000)
      //   .style('fill', d => { return colorScale(d.value) });

      tiles.exit().remove();

    }

    heatMapChart(this.props.annualData);

  }


// class Chart extends Component {
//   constructor(props) {
//     super(props);
//     this.update = this.update.bind(this);
//   }
//   componentDidMount() {
//     const { dataset } = this.props;
//     this.update(dataset);
//   }
//   componentWillReceiveProps({ dataset }) {
//     this.update(dataset);
//   }
//   shouldComponentUpdate() {
//     return false;
//   }
//   update(dataset) {
//     const { onClick } = this.props;
//     const selection = select("#chart")
//       .selectAll(".bar").data(dataset)
//       .style("height", function (d) {
//         // HAvE TO USE PX WITH NPM VERSION
//         return `${d.toString()}px`;
//       })
//       .style("margin-top", function (d) {
//         return `${(MAX_HEIGHT - d).toString()}px`;
//       });
//     selection.enter()
//       .append("div").attr("class", "bar")
//       .style("height", function (d) {
//         return `${d.toString()}px`;
//       })
//       .style("margin-top", function (d) {
//         return `${(MAX_HEIGHT - d).toString()}px`;
//       })
//       .on("click", function (_, i) {
//         onClick(i);
//       })
//       .transition()
//       .style('background-color', 'red')
//       .duration(2000);
//     selection.exit().remove();
//   }
//   render() {
//     return (
//       <div id="chart" />
//     );
//   }
// }
// Chart.propTypes = {
//   dataset: PropTypes.array.isRequired,
//   onClick: PropTypes.func.isRequired,
// }
// export default Chart;

  render() {
    const marginAll = 50;
    const margin = { top: marginAll, right: marginAll, bottom: marginAll, left: marginAll },
          width = 1400 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;

    ////////////////////////////////////////////////////////////////

    return (
      <Fragment>
        <div className="test-button heatmap">
            <svg className="test-button" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
              <g className="heat-map" ref="heatMap" transform={"translate(" + margin.left + "," + 200 + ")"}></g>
            </svg>
        </div>
        <div>
          <button className="test-button" onClick={e => this.changeDataSet()}>Change Dataset</button>
        </div>
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
    getAnnualNeoData, getNeoData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);


