import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {

    const {  } = this.props;

    const node = this.node;
    const dataMax = d3.max(this.props.data);
    const yScale = d3.scaleLinear().domain([0, dataMax]).range([0, this.props.size[1]]);

    d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#f39922')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)

    d3.select(node).append('svg')
      .attr('width', 1000)
      .attr('height', 30)
      .append('g')
      .attr('transform', 'translate(50,3)')
      .call(d3.axisBottom)
  }

  render() {
    return <svg ref={node => this.node = node} width={500} height={500}></svg>
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

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);


