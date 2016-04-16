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
      title: '',
      description: '',
      paragraph: '',
    };

    this.newPageRef;

    // Bind functions
    this.submit = this.submit.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.paragraphChange = this.paragraphChange.bind(this);
  }

  componentDidMount() {
    this.firebaseRef = new Firebase('https://blistering-torch-8436.firebaseio.com/');
    this.pagesRef = this.firebaseRef.child('pages');
  }

  render() {
    return(
      <main>
        <Navbar name="Build Page" />
        <div className="app-body build-page">
          <p>Create a new page</p>

          <form>
            <input onChange={this.titleChange} value={this.state.title} className="title" type="text" placeholder="Title" />
            <input onChange={this.descriptionChange} className="description" type="text" placeholder="Description" />
            <textarea onChange={this.paragraphChange} className="paragraph" type="text" placeholder="Paragraph" />
          </form>

          <button className="submit" onClick={this.submit}>
            <i className="plus icon"></i>Add page
          </button>
        </div>
      </main>
    );
  }

  titleChange(event) { this.setState({title: event.target.value}); }
  descriptionChange(event) { this.setState({description: event.target.value}); }
  paragraphChange(event) { this.setState({paragraph: event.target.value}); }

  submit() {
    this.newPageRef = this.pagesRef.child(this.state.title).set({
      title: this.state.title,
      description: this.state.description,
      paragraph: this.state.paragraph
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }
}
