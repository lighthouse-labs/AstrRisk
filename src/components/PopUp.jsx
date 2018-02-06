import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import BarChart from './charts/BarChart.jsx';
import * as MdIconPack from 'react-icons/lib/md'
import { closePopUp } from '../actions/actions.js'
import HeatMap from './charts/HeatMap.jsx';

class PopUp extends Component {

  render() {

    const createPopUp = () => {
      const { speed, distance, mt, avgDiameter, mass, neoName, hazard } = this.props.singleNeoData;

      return (
        <div className="infoPopupContainer">
          <div className="infoPopup-infoHolder">
            <div className="x-button">
              <MdIconPack.MdClear size={80} onClick={e => this.props.closePopUp()} />
            </div>
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
        {popUp}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    singleNeoData: state.singleNeoData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closePopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
