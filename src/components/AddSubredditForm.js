import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { onSubchange,submitSubreddit } from '../actions';
import { connect } from "react-redux";
 


 
 

class AddUserForm extends React.Component {

handleSubChange(e) {
	
	this.props.onSubchange(e.target.value)
}
handleSubformSubmit(e) {
	e.preventDefault();
	this.props.submitSubreddit(this.props.subreddit)
}
 
render() {
	 
	return (
	  
	     <MDBCol md="6" style={pStyle}>
	       <form id="add-user-form"  onSubmit={(e) => this.handleSubformSubmit(e)}>
	         <br />
	         <input
	           type="text"
	           id="add-user"
	           className="form-control"
	           onChange={(e) => this.handleSubChange(e)}
	           value={this.props.subreddit} 
	          
                
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
   
     subreddit:state.subreddits.subreddit

    
  }
}


export default connect(mapStateToProps,{onSubchange,submitSubreddit})(AddUserForm);

 