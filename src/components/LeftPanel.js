import React, { Component } from 'react';
import { connect } from "react-redux";
 
import UsersList from './Lists/UsersList';
import  {toggleLeft} from '../actions/ui_actions';


 class LeftPanel extends Component {

	//   OpenLeft(e)  {
	      
	//   let panelLeft = document.querySelector('.panels__side--left');
	//   let panelRight = document.querySelector('.panels__side--right');
	//   panelLeft.classList.toggle('panels__side--left-active');
	//   panelRight.classList.toggle('panels__side--right-hidden');
	// } 
	
handleLeftClick(e) {
	// console.log(e);
	this.props.toggleLeft(e)
}


render() {
	 
   
	return (
	 	<article className={'panels__side panels__side--left '  + (this.props.left_open && this.props.right_hide ? 'panels__side--left-active' : '') + (this.props.right_open ? ' panels__side--left-hidden' : '')} >
	 		<UsersList/>
	 	  <div className="panels__side panels__side--inner">
	 	    <h1 className="panels__headline" className="panels__headline" >Users</h1>      
	 	    <svg className="arrow arrow--left" width="40" height="40" viewBox="0 0 24 24" onClick={ (e) => this.handleLeftClick(e)}><path d="M0 0h24v24h-24z" fill="none"/><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"/></svg>
	 	  </div>
	 	</article>
	);
}   


}

const mapStateToProps = state => {
  return {
   
    left_open:state.uis.left_open,
    right_hide:state.uis.right_hide,
    right_open:state.uis.right_open,
    users:state.users.users
  }
}


export default connect(mapStateToProps,{toggleLeft})(LeftPanel);

 