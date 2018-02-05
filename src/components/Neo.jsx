import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import BarChart from './charts/BarChart.jsx';

class Neo extends Component {
  constructor() {
    super();
    this.state = {
      showPopUP: false
    }
  }

  componentDidMount() {
  }



  togglePopUp() {
    this.setState({ showPopUP: !this.state.showPopUP });
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
        cursor: pointer;
        padding: 20px;
        animation-name: ${name};
        animation-duration: 4s;
        transform-origin: 40px 40px;
        transform: rotate(${randomDeg}deg) translateX(${scaledDistance / 2}px) translateY(0px);
      }`;
        // animation-fill-mode: forwards;

    // set size of the NEO based of average diameter
    function setSize(){
      let width = '10px';
      let height = '10px';

      let sizeString = 'height: 80px; width: 80px;'
      if (avgDiameter <= 50){
        sizeString = 'height: 50px; width: 50px;'
      } else if (avgDiameter > 50 && avgDiameter < 300){
        sizeString = 'height: 65px; width: 65px;'
      } else if (avgDiameter > 300 && avgDiameter < 700){
        sizeString = 'height: 80px; width: 80px;'
      } else {
        sizeString = 'height: 100px; width: 100px;'
      }
      return sizeString;
    }

    const imgClass = `.${name+1} {
      transform: rotate(${-randomDeg}deg) rotateY(57deg);
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
      border: "dashed 4px #7E004E",
      marginLeft: "auto",
      marginRight: "auto",
      zIndex: "-40",
    }

    // create image scale to base images on
    function randomImage(){
      let image = '../../public/assets/images/meteor2.svg'
      const imageScale = d3.scaleLinear().domain([3, 35]).range([1,5]);
      switch(Math.floor(imageScale(speed))){
        case 1:
          image = '../../public/assets/images/meteor2.svg';
          break;
        case 2:
          image = '../../public/assets/images/meteor3.svg';
          break;
        case 3:
          image = '../../public/assets/images/meteor4.svg';
          break;
        case 4:
          image = '../../public/assets/images/meteor5.svg';
          break;
      }
      return image;
    }



    const createNeo = () => {
      return (<Fragment>
        <div style={orbitStyle}></div>
        <div className={name} onClick={e => this.togglePopUp()}>
        <img src={randomImage()}  className={name+1}/>
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
              <img src='../../public/assets/images/meteor2-face.svg' className="infoPopup-image" />
            </div>
          </div>
        </div>
      )
    }

    const popUp = createPopUp();

    return (
      <Fragment>
        {nearEarthObject}
        {this.state.showPopUP && popUp}
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
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Neo);
