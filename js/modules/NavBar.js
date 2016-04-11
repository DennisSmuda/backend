import React from 'react';
import NavLink from './NavLink';



export default class Navbar extends React.Component {
  render() {
    let navClass = 'nav nav--' + this.props.color;
    return(
      <nav className={navClass}>
        <h1>{this.props.name}</h1>
        <ul className="navigation-links">
          <li><NavLink className="link home-button" to="/">Home</NavLink></li>
          <li><NavLink className="link" to="/build-page">Build Page</NavLink></li>
        </ul>

      </nav>
    );
  }
}
