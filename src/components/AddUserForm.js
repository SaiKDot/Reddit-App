import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { onUserChange,submitUser } from '../actions';
import { connect } from "react-redux";
 


 
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


class AddUserForm extends React.Component {

handleUserChange(e) {
	
	this.props.onUserChange(e.target.value)
}
handUserformSubmit(e) {
	e.preventDefault();
	this.props.submitUser(this.props.user)
}
 
render() {
	 
	return (
	  
	     <MDBCol md="6" style={pStyle}>
	       <form id="add-user-form"  onSubmit={(e) => this.handUserformSubmit(e)}>
	         <br />
	         <input
	           type="text"
	           id="add-user"
	           className="form-control"
	           onChange={(e) => this.handleUserChange(e)}
	            
	          value={this.props.user}
                
	         />
	        
	          
	         <div className="text-center mt-4">
	           <MDBBtn color="grey" type="submit">ADD</MDBBtn>
	         </div>
	       </form>
	     </MDBCol>
	  
	);
}   

}

 const pStyle = {
       
};

const mapStateToProps = state => {
  return {
   
    user:state.users.reddit_user,
    users:state.users.users
    
  }
}


export default connect(mapStateToProps,{onUserChange,submitUser})(AddUserForm);

 