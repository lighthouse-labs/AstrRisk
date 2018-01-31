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
const dScale = d3.scaleLinear().domain([6371,54600000]).range([280,1400]);
const scaledDistance = Math.floor(dScale(distance));
const keyframes = `@keyframes ${name} {
        0% {
            transform: rotateZ(0deg) translateX(${scaledDistance / 2}px) rotateZ(0deg) rotateX(0deg);
        }
        100% {
            transform: rotateZ(360deg) translateX(${scaledDistance / 2}px) rotateZ(-360deg) rotateX(0deg);
        }    
    }`;

const newclass = `.${name} { position: absolute;
    width: 30px;
    height: 50px;
    left: 685px;
    top: 675px;
    cursor: pointer;
    animation: ${name} ${speed}s infinite linear;
    z-index: 300;}`;

const hoverpause = `.${name}:hover {
  animation-play-state: paused;
}`


const orbitStyle = {
    borderRadius: "50%",
    position: "absolute",
    left: `${700-(scaledDistance/2)}px`,
    top: `${700-(scaledDistance/2)}px`,
    width: `${scaledDistance}px`,
    height: `${scaledDistance}px`,
    border: "dashed 2px #ccc",
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: "0",
    opacity: "0.6",
}

const createNeo = () => {
   return (<Fragment><div style={orbitStyle}>
            
          </div><img src='../../public/assets/images/neo.svg' className={name}/></Fragment>)
} 
const nearEarthObject = createNeo();
document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length)
document.styleSheets[0].insertRule(newclass, document.styleSheets[0].cssRules.length)
document.styleSheets[0].insertRule(hoverpause, document.styleSheets[0].cssRules.length)

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


