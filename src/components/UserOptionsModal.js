import React ,{Component} from 'react';
import { bindActionCreators } from 'redux'

import DatePicker from "react-datepicker";
import moment from "moment"


 


 
import { connect } from "react-redux"; 
import {userEpochChanged} from '../actions'
import   { downloadUser } from '../actions/download_action'
import { MDBContainer, MDBBtn}  from 'mdbreact';
import '../component_styles/modal.css'
import "react-datepicker/dist/react-datepicker.css";

class UserOptionsModal extends Component {

  closeModal  ()   {
 		console.log('close');
 		let overlay = document.querySelector( '.md-overlay' );
 		let modal = document.getElementById('user-r-modal')
 	 
 		modal.classList.remove("md-show");
 	}
 	handleChange(date) {
 		 console.log(this.props.selected_user.name)
 	     this.props.userEpochChanged(this.props.selected_user.name,date)
 	 }




	render() {

			   
			 var date = new Date();
			 var todayDate = moment(date).toDate()	
			  console.log(todayDate)		  
			 let seldate;
			 if(this.props.selected_user !== undefined || this.props.selected_user.endEpoch !== "") {
			 	  seldate = moment(this.props.selected_user.endEpoch).toDate()
			 	   console.log({seldate})
			 	   
			 } 
			 
	  return (
	  	<div>
	  		    <div className="md-modal md-effect-9" id="user-r-modal">
	  				<div className="md-content">
	  					<h3> {this.props.selected_user.name}</h3>
	  					<div>
	  					<h6> Last Epoch</h6>
	  						 
	  						 <DatePicker
	  						         selected={seldate ? seldate: todayDate}
	  						         onChange={(date) => this.handleChange(date)}
	  						         dateFormat="MM-dd-yyyy"
	  						         onChangeRaw={(date) => {
	  						            if (moment(date.target.value).isValid())
	  						                 this.handleChange(data.target.value);
	  						         }}
	  						         maxDate={new Date()}

	  						         showMonthDropdown
	  						          useShortMonthInDropdown

	  						       />
	  						 
	  					</div>
	  					<div className="text-center">
			              <MDBBtn onClick={() => this.props.downloadUser(this.props.selected_user)}>Download</MDBBtn>
			            </div>
	  				</div>
	  			</div>
	  			<div className="md-overlay" onClick={() => this.closeModal() }></div> 
	  	  </div>
	    
	    );
	  } 


}
const mapStateToProps = state => {
  return {
    selected_user : state.useroptions.selected_user,
     
     
    
  }
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({ userEpochChanged,downloadUser }, dispatch);
}

 
export default connect(mapStateToProps,mapDispatchToProps)(UserOptionsModal);
 
// export default connect(null,actions)(SubredditOptionsModal);