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

    const {mt}                = this.props.singleNeoData;
    const dinosaurKiller      = 23900573613766.73;
    const tsarBomba           = 50.19120458891013;
    const littleBoy           = 0.013;
    const fatMan              = 0.02198852772466539;
    const dinosaurEnergyScale = d3.scaleLog().domain([0.001, dinosaurKiller]).range([1, width]);

    return(
      <Fragment>
        <div className="infoText-line-bar"><span>DANGER LEVEL:</span></div>
        <div className="line-bar-container">
          <img className='line-bar-asteroid' src="../public/assets/images/meteor.svg" style={{marginLeft: dinosaurEnergyScale(mt)}} width={50} height={50}/>
          <div className='line-bar-image' style={{marginLeft: dinosaurEnergyScale(tsarBomba)}}>
            <img  src="../public/assets/images/tsar.svg" width={70} height={50}/>
            <p>Tsar Bomba Nuke</p>
          </div>
          <div className='line-bar-image' style={{marginLeft: dinosaurEnergyScale(fatMan)}}>
            <img src="../public/assets/images/fman.svg" width={50} height={50}/>
            <p>Fat Man Atomic Bomb</p>
          </div>
          <div className='line-bar-image' style={{marginLeft: dinosaurEnergyScale(dinosaurKiller)}}>
            <img src="../public/assets/images/extinction.svg" width={50} height={50}/>
            <p>Dinosaur Extinction Event</p>
          </div>

         <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
           <rect className="line-bar-initial" width="900" y="70" height="5"/>
           <rect y={"75"} className="line-bar-dino" x={dinosaurEnergyScale(tsarBomba)} width={5} height={15}/>
           <rect y={"75"} className="line-bar-dino" x={dinosaurEnergyScale(fatMan)} width={5} height={15}/>
           <rect y={"75"} className="line-bar-dino" x={dinosaurEnergyScale(dinosaurKiller)} width={5} height={15}/>
         </svg>
       </div>
       </Fragment>
     )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    singleNeoData: state.singleNeoData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LineBar);
