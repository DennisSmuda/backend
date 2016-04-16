import React from 'react';
import { Link } from 'react-router';

import MotionTest from '../components/MotionTest';
import NavLink from '../modules/NavLink';
import Navbar from '../modules/Navbar';
import PageList from '../modules/PageList';

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      pagesCollapsed: 'false'
    }

    this.collapsePages = this.collapsePages.bind(this);

  }

  componentWillMount() {
    this.firebaseRef = new Firebase('https://blistering-torch-8436.firebaseio.com/pages');
    this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key();
        items.push(item);
      }.bind(this));

      this.setState({
        pages: items
      });
    }.bind(this));
  }

  render() {
    let numPages = this.state.pages.length;
    let collapsed = this.state.pagesCollapsed ? 'true' : 'false';
    return(
      <main>
        <Navbar name="HOME" />

        <div className="app-body">

          <div onClick={this.collapsePages} className="pages">
            <h3>Pages ({numPages})</h3>
            <PageList collapsed={collapsed} pages={this.state.pages} />
          </div>

          <div className="motion-test">
            <MotionTest />
          </div>

        </div>
      </main>
    );
  }

  collapsePages() {
    if (this.state.pagesCollapsed) {
      this.setState({pagesCollapsed: false});
    } else {
      this.setState({pagesCollapsed: true});
    }
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }
}
