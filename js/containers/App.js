
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Home from '../components/Home';


export default class App extends React.Component{

  render() {
    return (
      <div>
        {this.props.children || <Home />}
      </div>
    );
  }
}
