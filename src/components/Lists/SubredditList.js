import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { MDBListGroup } from "mdbreact";

import { ipcRenderer } from 'electron';
import { connect } from "react-redux";
import { onUserChange } from '../../actions';
import  SubredditListItem  from './SubredditListItem';

 


class SubredditList extends Component {
	renderListItem()
	{
		  
		     let notes = this.props.subreddits.map((val,key) => {
				
				return <SubredditListItem num={key} dataval={val} epoch={val.endEpoch} date={val.dateAdded} sub={val.name} key={key} fu={key}/>

		     });
		     return notes;
	}

	componentDidUpdate(prevProps){
		 console.log('updated');
	    if(prevProps.value !== this.props.subreddits){ 
	    	ipcRenderer.send('subrList:store',this.props.subreddits);	
	    }
	 }
	
render() {
	return (
	   <div className="panels__side panels__side--inner-right">
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
   
    // user:state.users.reddit_user,
    subreddits:state.subreddits.subs
    
  }
}


export default connect(mapStateToProps,{})(SubredditList);