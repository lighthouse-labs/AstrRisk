import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Neo extends Component {
  constructor() {
    super();
    this.state = {
      showPopUP: false
    }
  }

  componentDidMount() {
  }

  randomImage(){
    let image = '../../public/assets/images/meteor2.svg';
    const randomNum = Math.floor((Math.random() * 2) + 1 );
    switch(randomNum){
      case 1:
        image = '../../public/assets/images/meteor.svg';
        break;
      case 2:
        image = '../../public/assets/images/meteor2.svg';
        break;
    }
    return image;
  }

  togglePopUp() {
    this.setState({ showPopUP: !this.state.showPopUP });
  }

  render() {

    const { distance, avgDiameter, speed, hazard } = this.props;
    let { name } = this.props;
    const neoName = name;

    const tScale = d3.scaleLinear().domain([0, 20000]).range([50, 8]);
    const time = tScale(speed);
    name = "A" + name.replace(/\s/g, '').replace(/[{()}]/g, '');
    const dScale = d3.scaleLinear().domain([6371, 54600000]).range([280, 1400]);
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
    let width = '10px';
    let height = '10px';
    if (avgDiameter <= 50){
      width = "40px";
      height ="40px";
    } else if (avgDiameter > 50 && avgDiameter < 300){
      width = "60px";
      height ="60px";
    } else if (avgDiameter > 300 && avgDiameter < 700){
      width = "80px";
      height ="80px";
    } else {
      width = "100px";
      height ="100px";
    }

    const imgClass = `.${name+1} {
      transform: rotate(${-randomDeg}deg) rotateY(57deg);
      width: ${width};
      height: ${height};
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



    const createNeo = () => {
      return (<Fragment>
        <div style={orbitStyle}></div>
        <div className={name} onClick={e => this.togglePopUp()}>
        <img src={this.randomImage()}  className={name+1}/>
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
            <div className="infoText">
              <div className="infoText-name">{neoName}</div>
              <div className="infoText-line-item"><span>Estimated diameter:</span> <span>{avgDiameter} m</span></div>
              <div className="infoText-line-item"><span>Is potentially hazardous:</span> <span>{hazard}</span></div>
              <div className="infoText-line-item"><span>Relative velocity:</span> <span>{Math.floor(speed * 1000)} m/s</span></div>
              <div className="infoText-line-item"><span>Miss distance:</span> <span>{distance} km</span></div>
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
