import React from 'react';
import   SweetAlert  from 'react-bootstrap-sweetalert'

class AddSubredditModal extends Component {

render() {
	return (
			<SweetAlert
			input
			showCancel
			cancelBtnBsStyle="default"
			title="An input!"
			placeHolder="Write something"
			onConfirm={this.onRecieveInput}
			onCancel={this.onCancel}
			>
			Write something interesting:
			</SweetAlert>
	);
}   

}