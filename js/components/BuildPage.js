import React from 'react';
import { Link } from 'rrtr';
import NavLink from '../modules/NavLink';
import Navbar from '../modules/Navbar';
import NewElement from '../modules/NewElement';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';


export default class BuildPage extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      title: '',
      description: '',
      paragraph: ''
    };
    this.newPageRef;
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.firebaseRef = new Firebase('https://blistering-torch-8436.firebaseio.com/');
    this.pagesRef = this.firebaseRef.child('pages');
  }

  render() {
    return(
      <main>
        <Navbar name="Build Page" />
        <div className="app-body build-page">
          <p>Create a new page</p>

          <input className="title" type="text" placeholder="Title" /><br/>
          <input className="description" type="text" placeholder="Description" />
          <textarea className="paragraph" type="text" placeholder="Paragraph" />

          <button className="submit" onClick={this.submit}>
            <i className="plus icon"></i>Add page
          </button>
        </div>
      </main>
    );
  }

  submit() {
    this.newPageRef = this.pagesRef.child('testpage').set({
      title: 'Testpage',
      description: 'test description',
      paragraph: 'motherfucker'
    });
  }
}
