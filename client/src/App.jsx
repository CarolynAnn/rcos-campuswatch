import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  
  componentDidMount(){

    fetch('http://localhost:8080/api/test', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        val: "my value"
      })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
