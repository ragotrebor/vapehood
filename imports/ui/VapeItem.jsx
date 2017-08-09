import React, { Component, PropTypes } from 'react';

import { VapeItems } from '../api/vapeItems.js'

 
// VapeItem component - represents a vaping item (like mod, ato, coil, liquid)
export default class VapeItem extends Component {
	toggleChecked() {
		VapeItems.update(this.props.vapeItem._id, {
			$set: { checked: !this.props.vapeItem.checked },
		});
	}

	deleteThisVapeItem() {
		VapeItems.remove(this.props.vapeItem._id);
	}
  render() {

  	const vapeItemClassName = this.props.vapeItem.checked ? 'checked' : '';

    return (
      <li className={vapeItemClassName}>
      	<button className="delete" onClick={this.deleteThisVapeItem.bind(this)}>
      		&times;
      	</button>

      	<input
      		type="checkbox"
      		readOnly
      		checked={this.props.vapeItem.checked}
      		onClick={this.toggleChecked.bind(this)}
      	/>

      	<span className="text">
          <strong>{this.props.vapeItem.username}</strong>: {this.props.vapeItem.text}
        </span>
      </li>
    );
  }
}
 
VapeItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  vapeItem: PropTypes.object.isRequired,
};