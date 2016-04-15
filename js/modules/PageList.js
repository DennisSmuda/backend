import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

import NavLink from '../modules/NavLink';
import Navbar from '../modules/Navbar';

export default class PageList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let className = `page ${this.props.collapsed}`;
    console.log(className);
    var items = this.props.pages.map((item) => {
      return (
        <li
          className={className}
          id={item['.key']}
          value={item['.value']}
          update={this.update}
          remove={this.remove}
          key={item['.key']}
        >
        {item.title} <span className="description-text">{item.description}</span>
        </li>
      );
    });
    return(
        <ReactCSSTransitionGroup component="ul" className="page-list" transitionName="pagelist-transition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {items}
        </ReactCSSTransitionGroup>
    );
  }
}
