import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tutor finder</h1>
        </header>
        <p className="App-intro">
          To get started, enter your zip code in the field below.
        </p>
        <ZipForm />
      </div>
    );
  }
}

class ZipForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', res: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getNames = (resultList) => {
    var res = '';
    for (var x in resultList) {
      res = res + resultList[x] + ', ';
    }
    return res;
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({value: ''});
    fetch('<ipaddress>:portno/getZips?zip=' + this.state.value, {
      method: 'GET',
    }).then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({res: this.getNames(responseJson.result)});
      }
    );
    event.preventDefault();
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
      <div>
      <label>
        Zip code:
        <input type='text' value={this.state.value} onChange={this.handleChange}/>
      </label>
      <input type='submit' value='Submit' />
      </div>
      <div>
        <label>{this.state.res}</label>
      </div>
    </form>);
  }
}

export default App;
