import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { MDBBtn,MDBListGroupItem,MDBIcon } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
 import   {setSelectedUser,removeUser} from '../../actions/reddit_action'
 

 import '../../component_styles/list.css';

class UserListItem extends React.Component {
	constructor(props)
	{
		super(props)
		this.UserItemRef = React.createRef(); 
	}
	 openModal   ()  {
		console.log('show');
		 
		let modal = document.getElementById('user-r-modal')
		 
		modal.classList.add("md-show");
	}

	selectUser()
	{
		this.props.setSelectedUser(this.props.dataval)
	}

	removeList(e,val) {
	 
			  
			 
			 this.props.removeUser(val)

		 


	}
	render() {
		return (
		
		 		 
					<div className="list-row">
						<div >
							{ this.props.num  +1}
						</div>
						<div>
							{this.props.user}
						</div>
						 
						<div className="list-btn rm-btn"  onClick={(e)=>this.removeList(e,this.props.dataval)}>
							x
						</div>
						<div className="list-btn st-btn">
							<FontAwesomeIcon icon={faCog} onClick={() =>{ this.openModal() ; this.selectUser() } } />
						</div>
					</div>
				 
				 
		 		 
		 	
		);
	}   

}

 

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({setSelectedSub,modalActions}, dispatch),
    
//   }
// }
 
// export default connect(null, mapDispatchToProps)(SubredditListItem);


function mapDispatchToProps(dispatch) {
   
  return bindActionCreators({ setSelectedUser,removeUser }, dispatch);
}
 
export default connect(null, mapDispatchToProps)(UserListItem);