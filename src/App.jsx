import React, {Component} from 'react';
import EarthSystem from './components/EarthSystem.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('this is:', this);
  }


  render() {
    return (
      <div>
        <h1>ASTRRISK</h1>
        <EarthSystem />
      </div>
    );
  }
}
export default App;
