import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Neo extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
  }


  render(){
const distance = this.props.distance;
const speed = this.props.speed;
const tScale = d3.scaleLinear().domain([0,20000]).range([80,8]);
const time = tScale(speed);
const name = "A" + this.props.name.replace(/\s/g, '').replace(/[{()}]/g, '');
const dScale = d3.scaleLinear().domain([6371,54600000]).range([80,1400]);
const scaledDistance = Math.floor(dScale(distance));
const keyframes = `@keyframes ${name} {
        0% {
            transform: rotateZ(0deg) translateX(${scaledDistance}px) rotateZ(0deg) rotateX(0deg);
        }
        100% {
            transform: rotateZ(360deg) translateX(${scaledDistance}px) rotateZ(-360deg) rotateX(0deg);
        }
    }`;
//`${distance} + px`,
//`${distance} + px`,
const style = {
    position: "absolute",
    width: "30px",
    height: "50px",
    animation: `${name} ${time}s infinite linear`,
    marginLeft: "auto",
    marginRight: "auto",
    left: `((${scaledDistance} / 2) - 15) + px`,
    top: `((${scaledDistance} / 2) - 25) + px`,
}
//left: (($mars-orbit/2) - ($neo-orbit/2)) + px;
    // top: (($mars-orbit/2) - ($neo-orbit/2)) + px;
    // width: $neo-orbit + px;
    // height: $neo-orbit + px;
const orbitStyle = {
    width: `${scaledDistance}px`,
    height: `${scaledDistance}px`,
    borderRadius: "50%",
    left: `${700-(scaledDistance/2)}px`,
    top: `${700-(scaledDistance/2)}px`,
    border: "solid 2px #ccc",
    marginLeft: "auto",
    marginRight: "auto"
}
const createNeo = () => {
   return (<div style={orbitStyle}>
            <img src='../../public/assets/images/neo.svg' className="neo" style={style}/>
          </div>)
} 
const nearEarthObject = createNeo();
document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length)

    return(
      <Fragment>
        {nearEarthObject}
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

export default connect(mapStateToProps, mapDispatchToProps)(Neo);


