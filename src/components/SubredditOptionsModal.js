import React ,{Component} from 'react';
import { bindActionCreators } from 'redux'

import DatePicker from "react-datepicker";
import moment from "moment"
import { withRouter } from 'react-router-dom';

 


 
import { connect } from "react-redux"; 
import {subEpochChanged} from '../actions'
import   { downloadSub } from '../actions/download_action'
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBContainer, MDBBtn}  from 'mdbreact';

import '../component_styles/modal.css'
import "react-datepicker/dist/react-datepicker.css";

class SubredditOptionsModal extends Component {

  closeModal  ()   {
 		console.log('close');
 		let overlay = document.querySelector( '.md-overlay' );
 		let modal = document.getElementById('sub-r-modal')
 	 
 		modal.classList.remove("md-show");
 	}
 	handleChange(date) {
 		 console.log({date})
 		
 	     this.props.subEpochChanged(this.props.selected_sub.name,date)
 	 }

	handleDownload()
	{
		this.props.downloadSub(this.props.selected_sub)
		this.props.history.push('/download')
	}


	render() {

			   
			 var date = new Date();
			 var todayDate = moment(date).toDate()			  
			 let seldate;
			 if(this.props.selected_sub !== undefined || this.props.selected_sub.endEpoch !== "") {
			 	  seldate = moment(this.props.selected_sub.endEpoch).toDate()
			 	   
			 } 
			 
	  return (
	  	<div>
	  		    <div className="md-modal md-effect-9" id="sub-r-modal">
	  				<div className="md-content">
	  					<h3>{this.props.selected_sub.name}</h3>
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
			              <MDBBtn onClick={() => this.handleDownload()}>Download</MDBBtn>
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
    selected_sub : state.suboptions.selected_sub,    
    
  }
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({ subEpochChanged,downloadSub }, dispatch);
}

 
export default withRouter (connect(mapStateToProps,mapDispatchToProps)(SubredditOptionsModal));
 
// export default connect(null,actions)(SubredditOptionsModal);