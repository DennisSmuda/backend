import React from 'react';
import { Link } from 'react-router';
import NavLink from '../modules/NavLink';
import Navbar from '../modules/Navbar';
import NewElement from '../modules/NewElement';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';


export default class BuildPage extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      items: [],
      text: ""
    };
  }

  componentWillMount() {
    this.firebaseRef = new Firebase('https://blistering-torch-8436.firebaseio.com/pages');
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
    console.log("submit");
  }
}
