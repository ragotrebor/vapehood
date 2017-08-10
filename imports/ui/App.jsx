import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { VapeItems } from '../api/vapeItems.js';

import VapeItem from './VapeItem.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    VapeItems.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderVapeItems() {
    let filteredVapeItems = this.props.vapeItems;
    if (this.state.hideCompleted) {
      filteredVapeItems = filteredVapeItems.filter(vapeItem => !vapeItem.checked);
    }
    return filteredVapeItems.map((vapeItem) => (
      <VapeItem key={vapeItem._id} vapeItem={vapeItem} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
          <Accounts.ui.LoginForm />
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
          <form className="new-vapeItem" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
          </form>
        </header>
 
        <ul>
          {this.renderVapeItems()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  vapeItems: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  return {
    vapeItems: VapeItems.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: VapeItems.find({ checked: { $ne: true } }).count(),
  };
}, App);