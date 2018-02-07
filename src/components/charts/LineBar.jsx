import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import * as d3 from 'd3';
import { closePopUp, showNeoPopUp  } from '../../actions/actions.js'

class LineBar extends Component {
  render(){
    const marginAll = 30;
    const margin = { top: marginAll, bottom: marginAll, left: marginAll, right: marginAll },
          height = 300 - margin.top - margin.bottom,
          width = 700 - margin.left - margin.right;


    const mt             = this.props.singleNeoData.mt;
    const dinosaurKiller = 23900573613766.73;
    const tsarBomba      = 50.19120458891013;
    const littleBoy      = 0.017925430210325048;
    const fatMan         = 0.02198852772466539
    const dinosaurEnergyScale     = d3.scaleLog().domain([0.001, dinosaurKiller]).range([1, width]);

     return(
       <Fragment>
         <div className="line-bar-container">
           <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
             <rect className="line-bar-initial" width="900" height="40"/>
             <g>
               <svg src="../public/assets/images/meteor.svg" x={dinosaurEnergyScale(mt)} width={10} height={10}></svg>
             </g>
             <rect y={"10"} className="line-bar-mt" x={dinosaurEnergyScale(mt)} width={10} height={10}/>
             <rect y={"10"} className="line-bar-dino" x={dinosaurEnergyScale(tsarBomba)} width={10} height={10}/>
             <rect y={"10"} className="line-bar-dino" x={dinosaurEnergyScale(fatMan)} width={10} height={10}/>
             <rect y={"10"} className="line-bar-dino" x={dinosaurEnergyScale(littleBoy)} width={10} height={10}/>
             <rect y={"10"} className="line-bar-dino" x={dinosaurEnergyScale(dinosaurKiller)} width={10} height={10}/>
           </svg>
           <svg src="../public/assets/images/meteor.svg" x={dinosaurEnergyScale(mt)} width={10} height={10}></svg>
           <div className="line-dtext">Dinosaurs</div>

         </div>
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
