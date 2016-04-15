
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import App from './containers/App';
// import ReduxApp from './containers/ReduxApp';

import Navbar from './modules/Navbar';
import NavLink from './modules/NavLink.js';

import Home from './components/Home';
import BuildPage from './components/buildpage';



class Index extends React.Component{

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/">

          <IndexRoute component={Home} />

          <Route path="/build-page" component={BuildPage} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
