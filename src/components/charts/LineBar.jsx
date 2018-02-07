import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import * as d3 from 'd3';
import { closePopUp, showNeoPopUp  } from '../../actions/actions.js'

class LineBar extends Component {
  render(){
    const mt             = this.props.singleNeoData.mt;
    const dinosaurKiller = 23900573613766.73;
    const tsarBomba      = 50.19120458891013;
    const littleBoy      = 0.017925430210325048;
    const fatMan         = 0.02198852772466539
    const energyScale    = d3.scaleLinear().domain([0, dinosaurKiller]).range([0, 50]);

    console.log(mt);

    const lineGraph = d3.select(".line")
     .append("svg:svg")
     .attr("width", 500)
     .attr("height", 200);

     const myLine = lineGraph.append("svg:line")
     .attr("x1", 40)
     .attr("x2", 400)
     .style("stroke", "rgb(255,0,0)");

     myLine.style("stroke-width", 24);

     const mtScale = lineGraph.append("svg:line")
     .attr("x1", 40)
     .attr("x2", {mt})
     .style("stroke", "rgb(255,255,255)");
     mtScale.style("stroke-width", 24);

     return(
       <Fragment>
         <div className="line"></div>
       </Fragment>
     )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    singleNeoData: state.singleNeoData,
    testState: state.testReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LineBar);
