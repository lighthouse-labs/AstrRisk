import React, {Component} from 'react';
import EarthSystem from './components/EarthSystem.jsx';

class App extends Component {
  constructor(props) {
    super(props);


    // this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.state = {
      neoData: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // Fetches data from  api server
  componentDidMount() {
    // fetch("http://localhost:3001/api/1990-02-14")
    //   .then(res => res.json())
    //   .then(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    //   )
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
