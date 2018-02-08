import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import RadarChart from './charts/RadarChart.jsx';
import * as MdIconPack from 'react-icons/lib/md'
import { closePopUp, showNeoPopUp } from '../actions/actions.js'
import LineBar from './charts/LineBar.jsx';


class NeoPopUp extends Component {

  render() {
    const { showNeoPopUp } = this.props;
    const createNeoPopUp = () => {
      const { speed, distance, mt, avgDiameter, mass, neoName, hazard } = this.props.singleNeoData;
      return (
        <div>
          <LineBar />

          <div className="infoText">
            <div className="infoText-name">{neoName}</div>
            <div className="infoText-line-item"><span>Estimated Diameter:</span> <span>{avgDiameter.toLocaleString('en')} m</span></div>
            <div className="infoText-line-item"><span>Estimated Mass:</span> <span>{mass.toLocaleString('en')} kg</span></div>
            <div className="infoText-line-item"><span>Potentially Hazardous:</span> <span>{hazard}</span></div>
            <div className="infoText-line-item"><span>Miss Distance:</span> <span>{Number(distance).toLocaleString('en')} km</span></div>
            <div className="infoText-line-item"><span>Relative Velocity:</span> <span>{Math.floor(speed * 1000).toLocaleString('en')} m/s</span></div>
            <div className="infoText-line-item"><span>Energy (Megatons):</span> <span>{mt} Mt</span></div>
            <br />
            <div className="infoText-line-item"><span>DANGER LEVEL:</span></div>

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
              {neoPopUp}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    singleNeoData: state.singleNeoData,
    showNeoPopUp: state.showNeoPopUp,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closePopUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NeoPopUp);
