import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Neo extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
  }


  render(){
    return(
      <Fragment>
          <img src='../../public/assets/images/neo.svg' className="neo"/>
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
