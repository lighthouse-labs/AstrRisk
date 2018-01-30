import React, {Component} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction, loadData } from './actions/actions.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      neoData: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // Fetches data from  api server
  componentDidMount() {
    console.log('test action is: ', this.props.myAction);
  }

  handleClick() {
    console.log('HELLO');
  }


  render() {
    return (
      <div>
        <h1>{this.props.myState}</h1>
        <button onClick={() => this.props.myAction("Data payload")}>CHANGE STATE</button>
        <button onClick={() => this.props.getData()}>Load Data from API</button>
        <button onClick={() => console.log(this.props.data)}>CURRENT STATE</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myState: state.testReducer,
    newData: state.loadDataReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    myAction: testAction,
    getData: loadData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
