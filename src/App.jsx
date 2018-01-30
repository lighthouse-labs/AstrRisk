import React, {Component} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData } from './actions/actions.js';

class App extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (<div>
      <h1>ASTRRISK</h1>
      <EarthSystem />
      {/* <h2>{this.props.testState}</h2>
      <button onClick={() => this.props.getNeoData('1990-01-0')}>LOAD NEO DATA</button>
      <button onClick={() => this.props.testButton('HELLO')}>TEST BUTTON</button> */}
    </div>);
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
    testButton, //Usage: test('string to display');
    getNeoData  //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
