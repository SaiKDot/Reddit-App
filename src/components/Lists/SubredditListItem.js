import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { MDBBtn,MDBListGroupItem,MDBIcon } from "mdbreact";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons' 
 
 import   {setSelectedSub,removeSubreddit} from '../../actions/reddit_action'

class SubredditListItem extends React.Component {
constructor(props)
{
	super(props)
	this.UserItemRef = React.createRef(); 
}
 openModal ()  {
	console.log('show');
	 
	let modal = document.getElementById('sub-r-modal')
	 
	modal.classList.add("md-show");
}

selectSub()
{
	this.props.setSelectedSub(this.props.dataval)
}
removeList(e,val) {
	 
   this.props.removeSubreddit(val)

 
	 

}
 
	render() {
		 
		return (
		<div className="list-row" id={this.props.sub}>
			<div >
				{ this.props.num  +1}
			</div>
			<div>
				{this.props.sub}
			</div>
			 
			<div className="list-btn rm-btn" onClick={(e)=>this.removeList(e,this.props.dataval)}>
				x
			</div>
			<div className="list-btn st-btn" >
				<FontAwesomeIcon icon={faCog}  onClick={() =>{ this.openModal() ; this.selectSub() } }/>
			</div>
		</div>
		);
	}   

}

function mapDispatchToProps(dispatch) {
   
  return bindActionCreators({ setSelectedSub,removeSubreddit }, dispatch);
}
 
export default connect(null, mapDispatchToProps)(SubredditListItem);