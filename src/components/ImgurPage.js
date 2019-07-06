import React from "react";
import { MDBContainer, MDBCol, MDBBtn, Container,MDBRow } from 'mdbreact';
// import { onUserChange,getUser } from '../actions';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"; 
import {getclientid,getClientSecret,imgurFormSubmit} from '../actions/settings_actions';




class ImgurPage extends React.Component {

handleClIdChange(e) {
	
	this.props.getclientid(e.target.value)
}
handleClSecretChange(e) {
	this.props.getClientSecret(e.target.value)
}
onImgurFormSubmitHandler(e) {
	e.preventDefault();
	const { client_id, client_secret } = this.props;
	this.props.imgurFormSubmit({client_id, client_secret})
}
handleError() {

	if(this.props.imgur_save_error == true)
	 {
			return <small> {this.props.imgur_save_error_message} </small>
	} 
	else {
		return null
	}
}
render() {
		     
	 
	return (
	  

	     <MDBContainer >
				<h2>Imgur Client Info </h2>
		<form onSubmit={(e) => this.onImgurFormSubmitHandler(e)}>
		 
	        <TextField
	               id="outlined-name"
	               label="client id"
	               className="textField"        
	               margin="normal"
	               variant="outlined"
	               onChange={(e)=>this.handleClIdChange(e)}
	               value={this.props.client_id}
	             />
	          <TextField
                id="outlined-name"
                label="client secret"
                className="textField"        
                margin="normal"
                variant="outlined"
                onChange={(e)=>this.handleClSecretChange(e)}
                 value={this.props.client_secret}
                 style={{width:'100%'}}
	             />
	  
	             <MDBRow>
	                   <MDBCol size="6"> <MDBBtn type="submit" color="elegant">Save</MDBBtn></MDBCol>	                 
	         
	             </MDBRow>
	            
	             
	        </form>
	        {this.handleError()}
	        </MDBContainer>
	        
	     
	  
	);
}   

}

 const SStyle = {
        'backgroundColor': '#F5F5F5',
        'width' : '100%',
        'height' : '100%'
};


const mapStateToProps = state => {
  return {
    client_id: state.settings.imgur_client_id,
    client_secret:state.settings.imgur_client_secret,
    imgur_save_error:state.settings.imgur_save_error,
    imgur_save_error_message:state.settings.imgur_save_error_message
     
    
  }
}



export default connect(mapStateToProps,{getclientid,getClientSecret,imgurFormSubmit})(ImgurPage);


 