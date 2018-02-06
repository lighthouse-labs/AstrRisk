import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import BarChart from './charts/BarChart.jsx';
import * as MdIconPack from 'react-icons/lib/md'
import { showPopUp } from '../actions/actions.js'

class Neo extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    const { distance, avgDiameter, speed, hazard } = this.props;
    let { name } = this.props;
    const neoName = name;
    const volume = (4/3) * Math.PI * Math.pow((avgDiameter / 2), 3);
    const mass = Math.floor(2000 * volume);
    const ke = 0.5 * mass * Math.pow(speed, 2);
    const mt = +(ke * 0.00000000023901).toFixed(2);
    const tScale = d3.scaleLinear().domain([0, 20000]).range([50, 8]);
    const time = tScale(speed);
    name = "A" + name.replace(/\s/g, '').replace(/[{()}]/g, '');
    const dScale = d3.scaleLinear().domain([6371, 54600000]).range([280, 1400]);
    const sizeScale = d3.scaleLinear().domain([])
    const scaledDistance = Math.floor(dScale(distance));
    const randomDeg = Math.pow(avgDiameter, 2);
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const keyframes = `@keyframes ${name} {
        0% {
            transform: rotate(${randomDeg}deg) translateX(${scaledDistance / 2}px) translateY(${600 * plusOrMinus}px);
            opacity: 0;

        }
        100% {
            transform: rotate(${randomDeg}deg) translateX(${scaledDistance / 2}px) translateY(0px);
            opacity: 1;
        }
      }`;

    const newclass = `.${name} {
        position: absolute;
        width: 80px;
        height: 80px;
        left: 660px;
        top: 660px;
        animation-name: ${name};
        animation-duration: 4s;
        transform-origin: 40px 40px;
        transform: rotate(${randomDeg}deg) translateX(${scaledDistance / 2}px) translateY(0px);
      }`;
        // animation-fill-mode: forwards;

    // set size of the NEO based of average diameter
    function setSize(){
      let sizeString = 'height: 80px; width: 80px;'

      if (avgDiameter <= 50){
        sizeString = 'height: 70px; width: 70px;'
      } else if (avgDiameter > 50 && avgDiameter < 300){
        sizeString = 'height: 80px; width: 80px;'
      } else if (avgDiameter > 300 && avgDiameter < 700){
        sizeString = 'height: 100px; width: 100px;'
      } else {
        sizeString = 'height: 120px; width: 120px;'
      }
      return sizeString;
    }

    const imgClass = `.${name+1} {
      transform: rotate(${-randomDeg}deg) rotateY(57deg) rotate(${randomDeg}deg);
      ${setSize()}
      cursor: pointer;
    }`;

    const orbitStyle = {
      borderRadius: "50%",
      position: "absolute",
      left: `${700 - (scaledDistance / 2)}px`,
      top: `${700 - (scaledDistance / 2)}px`,
      width: `${scaledDistance}px`,
      height: `${scaledDistance}px`,
      border: "solid 0px rgba(222, 222, 222, 0.0)",
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: "inset 0px 3px 0px 2px #734172FF",
      zIndex: "-40",
    }

    // create image scale to base images on
    function randomImage(){
      let image = '../../public/assets/images/meteor2.svg'
      const imageScale = d3.scaleLinear().domain([3, 35]).range([1,5]);
      if(speed <= 3){
        image = '../../public/assets/images/meteor.svg';
      } else if (speed > 3 && speed < 6) {
        image = '../../public/assets/images/meteor2.svg';
      } else if (speed > 6 && speed < 10){
        image = '../../public/assets/images/meteor3.svg';
      } else if (speed > 10 && speed < 14){
        image = '../../public/assets/images/meteor4.svg';
      } else if (speed > 14 && speed < 18){
        image = '../../public/assets/images/meteor5.svg';
      }

      return image;
    }

    const createNeo = () => {
      const singleNeoData = { distance, avgDiameter, speed, hazard, mt, mass, neoName, hazard };
      console.log(singleNeoData);
      const classNames = `${name +1}`
      return (
      <Fragment>
        <div style={orbitStyle}></div>
          <div className={name}>
            <div className="neo">
              <img src={randomImage()} onClick={(e) => this.props.showPopUp(singleNeoData)} className={classNames}/>
            </div>
          </div>
      </Fragment>
      )
    }

    const nearEarthObject = createNeo();
    document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length)
    document.styleSheets[0].insertRule(newclass, document.styleSheets[0].cssRules.length)
    document.styleSheets[0].insertRule(imgClass, document.styleSheets[0].cssRules.length)

    const createPopUp = () => {
      return (
        <div className="infoPopupContainer" onClick={e => this.togglePopUp()}>
          <div className="infoPopup-infoHolder">
            <div className="x-button">
              <MdIconPack.MdClear size={80} onClick={e => this.togglePopUp()}/>
            </div>
            {/* <BarChart/> */}
            <div className="infoText">
              <div className="infoText-name">{neoName}</div>
              <div className="infoText-line-item"><span>Estimated diameter:</span> <span>{avgDiameter} m</span></div>
              <div className="infoText-line-item"><span>Mass:</span> <span>{mass} kg</span></div>
              <div className="infoText-line-item"><span>Is potentially hazardous:</span> <span>{hazard}</span></div>
              <div className="infoText-line-item"><span>Miss distance:</span> <span>{distance} km</span></div>
              <div className="infoText-line-item"><span>Relative velocity:</span> <span>{Math.floor(speed * 1000)} m/s</span></div>
              <div className="infoText-line-item"><span>Energy (Megatons):</span> <span>{mt} Mt</span></div>
            </div>
            <div className="infoImage-container">
              {/* <img src='../../public/assets/images/meteor2-face.svg' className="infoPopup-image" /> */}
              <RadarChart speed={speed} distance={distance} mt={mt} diameter={avgDiameter} mass={mass} />
            </div>
          </div>
        </div>
      )
    }



    const popUp = createPopUp();

    return (
      <Fragment>
        {nearEarthObject}
        {/* {this.state.showPopUP && popUp} */}
        {/* {this.state.showPopUP && <BarChart/> } */}
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
  return bindActionCreators({ showPopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Neo);
