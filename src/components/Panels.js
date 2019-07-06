import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { connect } from "react-redux";

window.$ = window.jQuery = require('jquery')

const app = require('electron').remote.app
import { ipcRenderer } from 'electron';

import { saveUser,retriveUsers,saveSubreddit,retrieveSubreddits  } from '../actions';
import {openLeft,openRight} from '../actions/ui_actions';

import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";




import '../component_styles/panels.css';
import '../component_styles/styles.css';



import SubredditOptionsModal from './SubredditOptionsModal';
import UserOptionsModal from './UserOptionsModal'

class Panels extends React.Component {

constructor(props)
 {
 	super(props)
 	ipcRenderer.on('user:recieved', function (event, arg) {
 		 
 		 props.saveUser(arg)
 	    // dispatch({type:USER_INPUT_SUBMITTED,payload:arg})
 	})
 	ipcRenderer.on('subreddit:recieved', function (event, arg) {
 		 
 		 props.saveSubreddit(arg)
 	    
 	})
 	 
 	ipcRenderer.on('leftPanel:Open', function (event, arg) {
 		 
 		 props.openLeft()
 	   
 	});
 	ipcRenderer.on('rightPanel:Open', function (event, arg) {
 		 
 		 props.openRight()
 	    
 	});
 	

 }
 componentDidMount()
 {
	this.props.retriveUsers();
	this.props.retrieveSubreddits();
 }

 componentDidUpdate()
 {
 	const users = this.props.users
 	ipcRenderer.on('userList:request', function (e){
 		 ipcRenderer.send('userList:store',users);
 	})
 }

 

 
 
	  render()  {
	    
	        return (
	          <div>
	          <SubredditOptionsModal/>
	          <UserOptionsModal/>
	          <div className="overflow">
	            <section className="panels">
	              <LeftPanel/>
	              <RightPanel/>
	            </section>
	          </div>
	          
	          <a href="javascript:;" className="logo" target="_blank"  id="add-user" >
	           <img className="logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg" alt=""  /> 
	          </a>
	          <a href="javascript:;" className="logo" target="_blank"  id="add-subreddit">
	           <img className="logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg" alt=""  /> 
	          </a>
	          </div>
	          ) 
	         
	     
	      }
	 

}
const mapStateToProps = state => {
  return {
   
    
    users:state.users.users
    
  }
}

export default connect(mapStateToProps,{saveUser,saveSubreddit,openLeft,openRight,retriveUsers,retrieveSubreddits})(Panels);