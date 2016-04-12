import React from 'react';
import { Link } from 'rrtr';

import NavLink from '../modules/NavLink';
import Navbar from '../modules/Navbar';

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pages: []
    }
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

    return(
      <main>
        <Navbar name="HOME" />

        <div className="app-body">
          <h3>Pages</h3>

            {this.state.pages.map((item) => {
            return (
              <div
                className="pages"
                id={item['.key']}
                value={item['.value']}
                update={this.update}
                remove={this.remove}
                key={item['.key']}
              >
              {item.title}
              </div>
            );
          })}

        </div>
      </main>
    );
  }
}
