import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { MDBListGroup } from "mdbreact";

import { ipcRenderer } from 'electron';
import { connect } from "react-redux";
import { onUserChange } from '../../actions';
import  UserListItem  from './UserListItem';


class UsersList extends Component {
renderListItem()
{
	     let notes = this.props.users.map((val,key) => {
			
			return <UserListItem num={key} dataval={val} date={val.dateAdded} user={val.name} key={key} fu={key}/>

	     });
	     return notes;
}
 
 
 componentDidUpdate(prevProps){
     if(prevProps.value !== this.props.users){ 
     	ipcRenderer.send('userList:store',this.props.users);	
     }
  }
 
 


		render() {
		 
			return (
			          <div className="panels__side panels__side--inner-left">
				 	   <Scrollbars				 	          
				 	          autoHideTimeout={1000}
				 	          autoHideDuration={200}
				 	          autoHeight
				 	          autoHeightMin={0}
				 	          autoHeightMax={600}
				 	          thumbMinSize={30}
				 	          universal={true}
				 	         >
				 	           
				 	        
				 	         	<div className="list">
				 	         		 {this.renderListItem()}
				 	         		
				 	         	</div>
				 	      

				 	        
				 	     
				 	     
				 	     </Scrollbars>
				 	  </div>
			);
		}   

}

 
const mapStateToProps = state => {
  return {
   
    user:state.users.reddit_user,
    users:state.users.users
    
  }
}


export default connect(mapStateToProps,{})(UsersList);

