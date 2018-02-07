import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import BarChart from './charts/BarChart.jsx';
import * as MdIconPack from 'react-icons/lib/md'
import { closePopUp, showNeoPopUp  } from '../actions/actions.js'
import HeatMap from './charts/HeatMap.jsx';

class PopUp extends Component {

  render() {
    const { showNeoPopUp, showHeatMap } = this.props;
    const createNeoPopUp = () => {
      const { speed, distance, mt, avgDiameter, mass, neoName, hazard } = this.props.singleNeoData;
      console.log('props', this.props.singleNeoData)
      return (
          <div>
            <div className="infoText">
              <div className="infoText-name">{neoName}</div>
              <div className="infoText-line-item"><span>Estimated Diameter:</span> <span>{avgDiameter} m</span></div>
              <div className="infoText-line-item"><span>Estimated Mass:</span> <span>{mass} kg</span></div>
              <div className="infoText-line-item"><span>Potentially Hazardous:</span> <span>{hazard}</span></div>
              <div className="infoText-line-item"><span>Miss Distance:</span> <span>{Number(distance)} km</span></div>
              <div className="infoText-line-item"><span>Relative Velocity:</span> <span>{Math.floor(speed * 1000)} m/s</span></div>
              <div className="infoText-line-item"><span>Energy (Megatons):</span> <span>{mt} Mt</span></div>
              {/* <div className="infoText-line-item"><span>Estimated Diameter:</span> <span>{avgDiameter.toLocaleString('en')} m</span></div>
              <div className="infoText-line-item"><span>Estimated Mass:</span> <span>{mass.toLocaleString('en')} kg</span></div>
              <div className="infoText-line-item"><span>Potentially Hazardous:</span> <span>{hazard}</span></div>
              <div className="infoText-line-item"><span>Miss Distance:</span> <span>{Number(distance).toLocaleString('en')} km</span></div>
              <div className="infoText-line-item"><span>Relative Velocity:</span> <span>{Math.floor(speed * 1000).toLocaleString('en')} m/s</span></div>
              <div className="infoText-line-item"><span>Energy (Megatons):</span> <span>{mt} Mt</span></div> */}
            </div>
            <div className="infoImage-container">
              <RadarChart speed={speed} distance={distance} mt={mt} diameter={avgDiameter} mass={mass} />
            </div>
          </div>
      )
    }

    const neoPopUp = createNeoPopUp();

    return (
      <Fragment>
        <div className="info-bg">
          <div className="infoPopupContainer">
            <div className="infoPopup-infoHolder">
              <div className="x-button">
                <MdIconPack.MdClear size={80} onClick={e => this.props.closePopUp()} />
              </div>
              {showNeoPopUp && neoPopUp}
              {showHeatMap && <HeatMap />}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer,
    singleNeoData: state.singleNeoData,
    showNeoPopUp: state.showNeoPopUp,
    showHeatMap: state.showHeatMap
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closePopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
