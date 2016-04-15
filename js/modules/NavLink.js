import React from 'react';
import { Link } from 'react-router';


export default React.createClass({
  render() {
    return <Link {...this.props} className={this.props.className} activeClassName="active"/>
 }
});
