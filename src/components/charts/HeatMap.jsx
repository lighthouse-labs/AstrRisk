import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import { getAnnualNeoData, getNeoData, closePopUp, changeSlider } from '../../actions/actions';
import * as d3 from 'd3';
import moment from 'moment';

class HeatMap extends Component {
  componentDidMount() {
    this.makeHeatMap(this.props.annualData);
  }

  componentWillReceiveProps({ annualData }) {
    this.makeHeatMap(annualData);
  }

  shouldComponentUpdate() {
    return false
  }

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

    ////////////////////////////////////////////////////////////////////////////

    const gridSize = Math.floor(width / 31),
      bucket = 8,
      // colors = ['#fff7f3',' #fde0dd','#fcc5c0',' #fa9fb5', '#f768a1', "#dd3497", "#ae017e", "#7a0177"], // dark purple
      // colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // blue
      // colors = [ "#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f"], // light purple
      // colors = ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b"],
      // colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84"],
      // colors = ['#fcfbfd','#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'], // dark purple
      colors = ['#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f'], // red green and blue
      
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      legendLabels = ['0-3', '4-6', '7-9', '10-12', '13-15', '16-19', '20-23', '24+'];

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

    // Legend

    const legendNode = d3.select(heatMapNode)
    const legends = legendNode.selectAll('.heatmap-legend')
      .data(legendLabels)
      .enter()
      .append('text')
      .text(d => { return d })
      .attr('x', (d, i) => { return (gridSize * 2 * i) })
      .attr('y', 0)
      // .attr('transform', 'translate(' + 38 + "," + (height - 20) + ")")
      .attr('transform', 'translate(' + 38 + "," + (height) + ")")
      .attr('class', 'heatmap-legend-text')

    const legendTitle = d3.select(heatMapNode)
        .append('text')
        .text('Number of NEOs near Earth')
        .attr('transform', 'translate(' + 120 + "," + (height - 50) + ")")
        .attr('class', 'heatmap-legend-text')

    const legendBars = d3.select(heatMapNode)
      legendBars.selectAll('.heatmap-legend-bar')
        .data(colors)
        .enter()
        .append('rect')
        .attr('x', (d,i) => { return gridSize * 2 * i })
        .attr('y', (height - 40))
        .attr('width', gridSize *2 )
        .attr('height', gridSize / 2)
        .style('fill', d => { return d })
        .attr('class', 'heatmap-legend-bar')


    const heatMapChart = (data) => {

      const colorScale = d3.scaleQuantile().domain([0, 24]).range(colors);
      // const colorScale = d3.scaleOrdinal().domain(this.props.annualData).range(d3.schemeBlue);

      // console.log(colorScale(10));

      const tiles = g.selectAll('.day')
        .data(data, (d) => { return d.month + ':' + d.day });

      const tooltip = d3.select('.heatmap-tooltip-node')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'heatmap-tooltip')

      tiles.enter().append('rect')
        .attr('x', d => { return (d.day - 1) * (gridSize + 3) })
        .attr('y', d => { return (d.month - 1) * (gridSize + 3) })
        .attr('rx', 4) // rectangle radius
        .attr('ry', 4)
        .attr('class', 'grid-border')
        .attr('width', gridSize)
        .attr('height', gridSize)
        .style('fill', d => { colors[0] })//return colorScale(d.value) })//colors[0]);
        .on('click', d => { 
          const target = d3.select(`.S${d.date}`)
          target
            .attr('width', gridSize)
            .attr('height', gridSize)
          d3.selectAll(`.heatmap-squares`)
            .transition()
            .duration(1500)
            .ease(d3.easeCubic)
            .style('fill', 'black')
          d3.selectAll(`.heatmap-legend-bar`)
            .transition()
            .duration(1500)
            .ease(d3.easeCubic)
            .style('fill', 'black')
          setTimeout(() => {
            this.props.getNeoData(d.date); 
            this.props.closePopUp(); 
            this.props.changeSlider(moment(d.date).dayOfYear()); 
          }, 1175);
        })
        .attr('class', d => { return `heatmap-squares S${d.date}`})
        .on('mouseover', d => {
          const target = d3.select(`.S${d.date}`)
            target
              .transition()
              .duration(300)
              .attr('width', (gridSize * 0.9))
              .attr('height', (gridSize * 0.9))
              .style('fill', 'white');
          tooltip.transition()
            .duration(200)
            .style('opacity', 1);
          tooltip.html(`${d.value}`)
            .style('left', (d.day) * (gridSize + 3) + -4 + "px")
            .style('top', (d.month + 4) * (gridSize + 3) + 4 + "px")
        })
        .on('mouseout', d => {
          const target = d3.select(`.S${d.date}`)
            target
              .transition()
              .duration(1200)
              .attr('width', gridSize)
              .attr('height', gridSize)
              .style('fill', d => { return colorScale(d.value) });
          tooltip
            .transition()
            .duration(300)
            .style('opacity', 0);
        })
        .transition()
          .duration(1300)
          .ease(d3.easeCubic)
          .style('fill', d => { return colorScale(d.value) });

      tiles.exit().remove();

    }
    heatMapChart(this.props.annualData);

  }
  render() {
    const marginAll = 50;
    const margin = { top: marginAll, right: marginAll, bottom: marginAll, left: marginAll },
          width = 1400 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;

    return (
      <Fragment>
        <div className="heatmap">
            <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
              <g className="heatmap" ref="heatMap" transform={"translate(" + margin.left + "," + 0 + ")"}></g>
            </svg>
            <div className="heatmap-tooltip-node"/>
            <div/>
        </div>
      </Fragment>
    )

  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    annualData: state.annualData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnualNeoData, getNeoData, closePopUp, changeSlider
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);


